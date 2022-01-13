import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaView,FlatList,StyleSheet, Text, View , ActivityIndicator} from 'react-native';
import Row from './Row';
import CommunicationController from './CommunicationController'
import { IconButton, Colors } from 'react-native-paper';
import ProfileSettingScreen from './ProfileSettingScreen';




class LinesScreen extends React.Component{
  state = {
      lines : [],
      isSettingProfile: false
  }



  componentDidMount() {
    //retrieve lines
    CommunicationController.getLines(global.appState.sid)
      .then(unmarshalledObj =>{
        this.state.lines=unmarshalledObj.lines
        this.setState(this.state)
      })
      .catch(error => console.log(error))
    
  }
  openProfileSetting = () =>{
    this.state.isSettingProfile=!this.state.isSettingProfile
    this.setState(this.state)
  }

  render() {
      if (this.state.lines.length!=0 && !this.state.isSettingProfile){
          return <SafeAreaView style={this.styles.container}>
            <View style={this.styles.row}>
              <View style={{flex:1}}></View>
              <Text style={this.styles.title}>Tratte</Text>
              <IconButton
                style={{flex:1, marginTop:19}}
                icon="account-circle"
                color={Colors.red500}
                size={50}
                onPress={() => this.openProfileSetting()}
              />
            </View>
            
            <SafeAreaView style={this.styles.container}>
              <FlatList
                data={this.state.lines}
                renderItem={(item) => {return (<Row data={item} onLineSelected={this.props.onLineSelected}/>)}}
                keyExtractor={item => item.terminus1.sname + " " + item.terminus2.sname}
              />
            </SafeAreaView> 
            <StatusBar styles="auto"/>
          </SafeAreaView>;
      }else if(this.state.isSettingProfile){
        return <SafeAreaView style={this.styles.container}>
          <ProfileSettingScreen onBackPressed={this.openProfileSetting}></ProfileSettingScreen>
        </SafeAreaView>
      }else{
        return <SafeAreaView style={{flex: 1,justifyContent:"center",flexDirection:"row",justifyContent:"space-around",padding: 10}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </SafeAreaView>
      }
      
  }
  styles = StyleSheet.create({
    title: {
      fontSize: 48,
      paddingTop: 20,
      flex:1
    },
    row:{
      flexDirection:"row"
    },
    container:{
      flex:1
    }
    
    
  });
}



export default LinesScreen
