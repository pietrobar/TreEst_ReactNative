import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { Button, Text, StyleSheet, SafeAreaView, TextInput, FlatList} from 'react-native';
import Post from './Post';
import CommunicationController from './CommunicationController';
import PostWriter from './PostWriter';


class SecondPage extends React.Component {

    state = {
      postWriterVisible : false,
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
    }

    retrievePosts = (did) => {
      CommunicationController.getPosts("Cez4i87enqRWx32e",did)
              .then(response=>{
                console.log("response "+response)
                this.state.jsonPost=response
                this.setState(this.state)})
              .catch(error => console.log("errore "+error))
    }

    render() {    

      let line = this.props.line
      let direction = this.props.direction
      if (!this.state.postWriterVisible && this.state.jsonPost!=null){
        return <SafeAreaView>
          <Text style={this.styles.title}>{line.terminus1.sname +"\n"+ line.terminus2.sname}</Text>
          <Text style={this.styles.subTitle}>Direzione {direction.sname}</Text>
          <Text style={this.styles.subTitle}>id bacheca = {direction.did}</Text>
          <Button title="indietro" onPress={() => this.props.onBackPressed()}></Button> 
          <Button title="Nuovo post" onPress={() => this.showPostWriter()}></Button>
          
          {<FlatList
            data={this.state.jsonPost.posts}
            renderItem={(item) => {return (<Post data={item}/>)}}
            keyExtractor={item => item.datetime}
          />}
            
        
          <StatusBar styles="auto"/>
        </SafeAreaView> 
      }
      else if(this.state.postWriterVisible){
        return <SafeAreaView>
          {<PostWriter did={direction.did}/>}
        </SafeAreaView>
      }else{
        return <SafeAreaView>
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
            justifyContent: "space-between",
            alignItems: "center",
            
        },
        
      });
}

export default SecondPage ;