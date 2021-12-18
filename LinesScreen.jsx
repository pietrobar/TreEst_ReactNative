import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaView,FlatList,StyleSheet, Text, View } from 'react-native';
import Row from './Row';
import CommunicationController from './CommunicationController'




class LinesScreen extends React.Component{
  state = {
      lines : []
  }



  componentDidMount() {
    //retrieve lines
    CommunicationController.getLines("Cez4i87enqRWx32e")
      .then(unmarshalledObj =>{
        this.state.lines=unmarshalledObj.lines
        this.setState(this.state)
      })
      .catch(error => console.log(error))
    
  }

  render() {
      if (this.state.lines.length!=0){
          return <SafeAreaView>
            <Text style={styles.title}>Tratte</Text>
            <SafeAreaView style={styles.container}>
              <FlatList
                data={this.state.lines}
                renderItem={(item) => {return (<Row data={item} onLineSelected={this.props.onLineSelected}/>)}}
                keyExtractor={item => item.terminus1.sname + " " + item.terminus2.sname}
              />
            </SafeAreaView> 
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

export default LinesScreen
