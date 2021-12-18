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

  

  changePage = (line,direction) =>{
      this.state.selectedLine = line
      this.state.selectedDirection = direction
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
          let line = this.state.selectedLine
          let selectedDirection = this.state.selectedDirection
          return <SafeAreaView>
              {<BoardScreen line={line} direction={selectedDirection} onBackPressed={this.changePage}/>}
              
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
