import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaView,FlatList,StyleSheet, Text, View } from 'react-native';
import Row from './Row';
import SecondPage from './SecondPage';
import Post from './Post';
import CommunicationController from './CommunicationController'



class App extends React.Component{
  state = {
      jsonData : null ,
      page:"first",
      toShow: {},
      direction: {}
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
