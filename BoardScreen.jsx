import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { Dimensions, Text, StyleSheet, SafeAreaView, FlatList, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import Post from './Post';
import CommunicationController from './CommunicationController';
import PostWriter from './PostWriter';
import MapPage from './MapPage';
import { IconButton, Colors } from 'react-native-paper';

const SCREEN_WIDTH = Dimensions.get('window').width; // get current width
const SCALE = 375; 

const scaleFontSize = (fontSize) => {
    const ratio = fontSize / SCALE; // get ratio based on your standard scale 
    const newSize = Math.round(ratio * SCREEN_WIDTH);
    return newSize; 
}

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
      //fare retriece posts solo se !this.state.postWriterVisible => quando torniamo dall'altra schermata per aggiornare
      if(!this.state.postWriterVisible)
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
                console.log("response ",response)
                //response.posts.sort((p1,p2)=>p2.followingAuthor-p1.followingAuthor)//true=1, false=0
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
          <View style={this.styles.directionContainer}>
            <View style={{flexDirection:'column', flex:1}}>
              <Text>Partenza</Text>
              <Text style={this.styles.title}>{start}</Text>
            </View>
            
            <IconButton
                              icon={"swap-horizontal-bold"}
                              color={Colors.green500}
                              size={50}
                              onPress={this.swapDirection}
                          /> 
            <View style={{flexDirection:'column', flex:1}}>
              <Text>Arrivo</Text>
              <Text style={this.styles.title}>{ end}</Text>
            </View>
          </View>
          
          
          
          

          <View style={this.styles.list}>
            {<FlatList
              data={this.state.jsonPost.posts}
              renderItem={(item) => {return (<Post data={item} refreshPosts={this.retrievePosts} did={this.props.direction.did}/>)}}
              keyExtractor={item => item.datetime}
            />}
          </View>
          
          <View style={this.styles.buttonMenu}>


            <TouchableOpacity style={this.styles.button} onPress={() => this.props.onBackPressed()}><Text>Home</Text></TouchableOpacity>
            <TouchableOpacity style={this.styles.button} onPress={() => this.showPostWriter()}><Text>Nuovo Post</Text></TouchableOpacity>
            <TouchableOpacity style={this.styles.button} onPress={() => this.showMap()}><Text>Mappa</Text></TouchableOpacity>
            
        
          </View>
          
        </SafeAreaView> 
      }
      else if(this.state.postWriterVisible){
        return <SafeAreaView style={this.styles.container}>
          {<PostWriter did={direction.did} onBackPressed={this.showPostWriter}/>}
        </SafeAreaView>
      }else if(this.state.mapVisible){
        return <SafeAreaView style={this.styles.container}>{<MapPage did={this.props.direction.did} onBackPressed={this.showMap}></MapPage>}</SafeAreaView>
      }else{
        return <SafeAreaView style={{flex: 1,justifyContent:"center",flexDirection:"row",justifyContent:"space-around",padding: 10}}>
          <ActivityIndicator size="large" color="#27873e" />
        </SafeAreaView>
      }
      



  

         
    }

    styles = StyleSheet.create({
        title: {
            fontSize: scaleFontSize(30),
          },
        container:{
            flex:1,
            paddingTop:20,
            flexDirection: "column"
        },
        directionContainer:{
          flex:2.5,
          flexDirection: "row",
          justifyContent: "space-evenly",
          flexWrap: "wrap"
        },
        buttonMenu:{
          flex:1,
          flexDirection: "row",
          alignItems: "flex-end",
        },
        list:{
          flex:15
        },
        button: {
          alignItems: "center",
          backgroundColor: Colors.green100,
          padding:10,
          flex: 1,
          margin:2,
          borderRadius:10
        },
        
      });
}

export default BoardScreen ;