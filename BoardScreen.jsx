import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { Button, Text, StyleSheet, SafeAreaView, TextInput, FlatList} from 'react-native';
import Post from './Post';
import CommunicationController from './CommunicationController';
import PostWriter from './PostWriter';
import MapPage from './MapPage';
import { IconButton, Colors } from 'react-native-paper';



class BoardScreen extends React.Component {

    state = {
      postWriterVisible : false,
      mapVisible: false,
      jsonPost: null
    }
    componentDidMount(){
      console.log("retrieve posts")
      this.retrievePosts(this.props.direction.did)
    }

    showPostWriter = () =>{
      this.state.postWriterVisible = !this.state.postWriterVisible
      this.setState(this.state)
      console.log("showPostWriter: "+this.state.postWriterVisible)

        this.retrievePosts(this.props.direction.did)
      
    }

    showMap = () => {
      this.state.mapVisible = !this.state.mapVisible
      this.setState(this.state)
      console.log("mapVisible: "+ this.state.mapVisible)
    }

    retrievePosts = (did) => {
      CommunicationController.getPosts(global.appState.sid,did)
              .then(response=>{
                console.log("response "+response)
                this.state.jsonPost=response
                this.setState(this.state)})
              .catch(error => console.log("errore "+error))
    }

    swapDirection=()=>{
      this.props.onSwappedDirection()
      let otherDid = this.props.direction.did == this.props.line.terminus1.did ? this.props.line.terminus2.did:this.props.line.terminus1.did
      this.retrievePosts(otherDid)
    }

    render() {    

      let line = this.props.line
      let direction = this.props.direction
      let start = direction.did == line.terminus1.did ? line.terminus2.sname : line.terminus1.sname
      let end = direction.did == line.terminus2.did ? line.terminus2.sname : line.terminus1.sname
      if (!this.state.postWriterVisible && this.state.jsonPost!=null &&!this.state.mapVisible){
        return <SafeAreaView style={this.styles.container}>
          <Text style={this.styles.title}>{start }<IconButton
                            icon={"swap-horizontal-bold"}
                            color={Colors.red500}
                            size={50}
                            onPress={this.swapDirection}
                        /> { end}</Text>
          
          <Text style={this.styles.subTitle}>Direzione {direction.sname}</Text>
          <Text style={this.styles.subTitle}>id bacheca = {direction.did}</Text>
          <Button title="indietro" onPress={() => this.props.onBackPressed()}></Button> 
          <Button title="Nuovo post" onPress={() => this.showPostWriter()}></Button>
          <Button title="Dettagli tratta" onPress={() => this.showMap()}></Button>

          
          {<FlatList
            data={this.state.jsonPost.posts}
            renderItem={(item) => {return (<Post data={item} refreshPosts={this.retrievePosts} did={this.props.direction.did}/>)}}
            keyExtractor={item => item.datetime}
          />}
            
        
          <StatusBar styles="auto"/>
        </SafeAreaView> 
      }
      else if(this.state.postWriterVisible){
        return <SafeAreaView style={this.styles.container}>
          {<PostWriter did={direction.did} onBackPressed={this.showPostWriter}/>}
        </SafeAreaView>
      }else if(this.state.mapVisible){
        return <SafeAreaView style={this.styles.container}>{<MapPage did={this.props.direction.did} onBackPressed={this.showMap}></MapPage>}</SafeAreaView>
      }else{
        return <SafeAreaView style={this.styles.container}>
          <Text>Aspetto i dati</Text>
        </SafeAreaView>
      }
      



  

         
    }

    styles = StyleSheet.create({
        title: {
            fontSize: 48,
            paddingTop: 20,
          },
        subTitle: {
          fontSize: 20,
          paddingTop: 10,
        },
        button: {
            backgroundColor: "#DDDDDD",
            padding: 10,
            width: 400
          },
        container:{
            flex:1,
        },
        
      });
}

export default BoardScreen ;