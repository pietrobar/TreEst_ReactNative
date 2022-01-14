import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaView,Text,StyleSheet, ActivityIndicator } from 'react-native';
import BoardScreen from './BoardScreen';
import CommunicationController from './CommunicationController'
import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageManager from './StorageManager';
import LinesScreen from './LinesScreen';


global.appState ={
  sid:"",
  uid:""
}

class App extends React.Component{
  state = {
      page:"",
      selectedLine: {},
      selectedDirection: {}
  }

  savePreferredLineDirection(line, direction){
    this.state.selectedLine=line
    this.state.selectedDirection = direction
    const lineInfo = {line:line, direction:direction}
    console.log("saving in asyncStorage: ", JSON.stringify(lineInfo))
    AsyncStorage.setItem("lineInfo", JSON.stringify(lineInfo)).then(res=>console.log("saved lineInfo in AsyncStorage"));
  }
  

  changePage = (line,direction) =>{
    //when I select a line direction I want to save it in the AsyncStorage 
    if(line)
      this.savePreferredLineDirection(line, direction)
    if (this.state.page==="LinesScreen")
        this.state.page="BoardScreen"
    else
        this.state.page="LinesScreen"
    this.setState(this.state)
  }

  
  async checkFirstRun() {
    const sid = await AsyncStorage.getItem("sid")
    console.log("sid:"+sid)
    return sid==null//=>first run
  }
  

  componentDidMount() {
    this.checkFirstRun().then(firstRun =>{
      if (firstRun){
        console.log("FIRST ACCESS")
        CommunicationController.register().then(result=>{
          console.log("Just Received Sid from server: ", result)
          global.appState.sid=result.sid
          AsyncStorage.setItem("sid", result.sid).catch(error=>console.log("error: ",error));
          this.state.page="LinesScreen"
          this.setState(this.state)

          CommunicationController.getProfile(result.sid).then(
            res=>{
              global.appState.uid=res.uid
              AsyncStorage.setItem("uid", res.uid).catch(error=>console.log("error: ",error));
            }
          ).catch(error=>console.log(error))
        }).catch(error => console.log("Register error: ",error))
        let sm = new StorageManager();
        sm.initDB(
            result => console.log("risultato", result),
            error => console.log("error", error)
            );        
      }else{
        console.log("SECOND ACCESS")
        

        //in second access I have to get the sid from the asyncStorage
        AsyncStorage.getItem("sid").then(res=>{
          global.appState.sid=res
          this.forceUpdate()
        }).catch(e=>console.log(e))
        //in second access the lineInfo COULD be saved in asyncStorage
        AsyncStorage.getItem("lineInfo").then(response=>{
          if (response && Object.keys(response).length != 0 && Object.getPrototypeOf(response) != Object.prototype){
            response = JSON.parse(response)
            this.state.selectedLine = response.line
            this.state.selectedDirection = response.direction
            this.state.page="BoardScreen" 
          }
          this.setState(this.state)
          
        }).catch(error=>console.log(error))
      }
    });
  }

  swapDirection=()=>{
    let otherDirection = this.state.selectedDirection.did == this.state.selectedLine.terminus1.did ? this.state.selectedLine.terminus2:this.state.selectedLine.terminus1
    this.savePreferredLineDirection(this.state.selectedLine,otherDirection)
    this.setState(this.state)
  }

  render() {
      if (this.state.page==="LinesScreen" &&global.appState.sid!=""){
          return <SafeAreaView style={this.styles.container}>
            {<LinesScreen onLineSelected={this.changePage}></LinesScreen>}
            <StatusBar styles="auto"/>
          </SafeAreaView>;
      }else if(this.state.page==="BoardScreen"&&global.appState.sid!=""){
          console.log("rendering second page")
          return <SafeAreaView style={this.styles.container}>
              {<BoardScreen line={this.state.selectedLine} direction={this.state.selectedDirection} onSwappedDirection={this.swapDirection} onBackPressed={this.changePage}/>}
              
            <StatusBar styles="auto"/>
          </SafeAreaView>;
      }else{
        return <SafeAreaView style={{flex: 1,justifyContent:"center",flexDirection:"row",justifyContent:"space-around",padding: 10}}>
          <ActivityIndicator size="large" color="#27873e" />
        </SafeAreaView>
      }
      
  }
  styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });
}



export default App
