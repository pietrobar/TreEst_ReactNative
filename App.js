import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaView,FlatList,StyleSheet, Text, View } from 'react-native';
import BoardScreen from './BoardScreen';
import CommunicationController from './CommunicationController'
import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageManager from './StorageManager';
import LinesScreen from './LinesScreen';




class App extends React.Component{
  state = {
      page:"LinesScreen",
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
          AsyncStorage.setItem("sid", result.sid).catch(error=>console.log("error: ",error));
        }).catch(error => console.log("Register error: ",error))
        
      }else{
        console.log("SECOND ACCESS")
        let sm = new StorageManager();
        sm.initDB(
            result => console.log("risultato", result),
            error => console.log("error", error)
            );
        //in second access the lineInfo COULD be saved in asyncStorage
        AsyncStorage.getItem("lineInfo").then(response=>{
          if (response && Object.keys(response).length != 0 && Object.getPrototypeOf(response) != Object.prototype){
            response = JSON.parse(response)
            this.state.selectedLine = response.line
            this.state.selectedDirection = response.direction
            this.state.page="BoardScreen"
            this.setState(this.state)
          }
          
        }).catch(error=>console.log(error))
      }
    });
  }

  render() {
      if (this.state.page==="LinesScreen"){
          return <SafeAreaView>
            {<LinesScreen onLineSelected={this.changePage}></LinesScreen>}
            <StatusBar styles="auto"/>
          </SafeAreaView>;
      }else if(this.state.page==="BoardScreen"){
          console.log("rendering second page")
          return <SafeAreaView>
              {<BoardScreen line={this.state.selectedLine} direction={this.state.selectedDirection} onBackPressed={this.changePage}/>}
              
            <StatusBar styles="auto"/>
          </SafeAreaView>;
      }
      
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    paddingTop: 20 
  }
});

export default App
