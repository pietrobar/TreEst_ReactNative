import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaView,FlatList,StyleSheet, Text, View } from 'react-native';
import Row from './Row';
import SecondPage from './SecondPage';
import Post from './Post';
import CommunicationController from './CommunicationController'
import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageManager from './StorageManager';




class App extends React.Component{
  state = {
      jsonData : null ,
      page:"first",
      toShow: {},
      direction: {}
  }

  async checkFirstRun() {
    const secondRun = await AsyncStorage.getItem("second_run")
    console.log(secondRun)
    if (secondRun==="true") {
      console.log("Second run");
    } else {
      console.log("first run");
      await AsyncStorage.setItem("second_run", "true");
    }
    return secondRun==="true"
  }

  handleSelection = (line,direction) =>{
      this.state.toShow = line
      this.state.direction = direction
      if (this.state.page==="first")
          this.state.page="second"
      else
          this.state.page="first"
      this.setState(this.state)
  }

  

  

  componentDidMount() {
    this.checkFirstRun().then(result =>{
      //manage second access
      if (result==="true"){
        console.log("PRIMO ACCESSO")
      }else{
        console.log("SECONDO ACCESSO")
        let sm = new StorageManager();
        sm.initDB(
            result => console.log("risultato", result),
            error => console.log("error", error)
            );
      }
    });

    

    
    //retrieve lines
    CommunicationController.getLines("Cez4i87enqRWx32e")
      .then(unmarshalledObj =>{
        this.state.jsonData=unmarshalledObj
        this.setState(this.state)
      })
      .catch(error => console.log(error))
    
  }

  render() {
      if (this.state.page==="first" && this.state.jsonData!=null){
          return <SafeAreaView>
            <Text style={styles.title}>Tratte</Text>
            <SafeAreaView style={styles.container}>
              <FlatList
                data={this.state.jsonData.lines}
                renderItem={(item) => {return (<Row data={item} onSelection={this.handleSelection}/>)}}
                keyExtractor={item => item.terminus1.sname + " " + item.terminus2.sname}
              />
            </SafeAreaView> 
            <StatusBar styles="auto"/>
          </SafeAreaView>;
      }

      else if(this.state.page==="second"){
          console.log("rendering second page")
          let line = this.state.toShow
          let direction = this.state.direction
          return <SafeAreaView>
              {<SecondPage line={line} direction={direction} onBackPressed={this.handleSelection}/>}
              
            <StatusBar styles="auto"/>
          </SafeAreaView>;
      }else{
        return <View><Text>Aspetto i dati</Text></View>
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
