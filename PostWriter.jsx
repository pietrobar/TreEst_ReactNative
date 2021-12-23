import React from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, Button, StatusBar} from 'react-native';
import CommunicationController from './CommunicationController';
import Dialog from "react-native-dialog";

class PostWriter extends React.Component {
    state = {
        delay : "",
        status : "",
        comment : "",
        commentDialogVisible : false
    }

    setDelay = (value) =>{
        this.state.delay = value
        
    }
    setStatus = (value) =>{
        this.state.status = value
    }
    setComment = (value) =>{
        if(value.length<101){
            this.state.comment = value
        }else
            this.showHideDialog()

            
    }

    publishPost = () =>{
        this.setState(this.state)
        console.log("pubblica post")
        CommunicationController.addPost(global.appState.sid, this.props.did, this.state.delay,this.state.status,this.state.comment)
        this.props.onBackPressed()
    }

    showHideDialog = () =>{
        this.state.commentDialogVisible = !this.state.commentDialogVisible
        this.setState(this.state)
    }
    

    render() {
        return(
                <SafeAreaView> 
                    <TextInput
                        style={this.styles.input}
                        onChangeText={val => this.setDelay(val)}
                        placeholder="Ritardo"
                        keyboardType="numeric"

                    />
                    <TextInput
                        style={this.styles.input}
                        onChangeText={val => this.setStatus(val)}
                        placeholder="Stato"
                        keyboardType="numeric"

                    />
                    <TextInput
                        style={this.styles.input}
                        onChangeText={val => this.setComment(val)}
                        placeholder="Commento"
                    />
                    <Button title="Pubblica" onPress={()=>this.publishPost()}></Button>
                <StatusBar style="auto"></StatusBar>    

                <Button title="Indietro" onPress={()=>this.props.onBackPressed()}></Button>   





                <Dialog.Container visible={this.state.commentDialogVisible}>
                <Dialog.Title>I commenti non possono superare 100 caratteri</Dialog.Title>
                <Dialog.Button label="OK  " onPress={this.showHideDialog}/>
                </Dialog.Container>         
            </SafeAreaView>
            
            
        )
                
                  
    }
    styles = StyleSheet.create({
        subTitle: {
          fontSize: 20,
          paddingTop: 10,
        },
        button: {
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            padding: 10,
            width: 400
          },
        container:{
            flex:1,
            justifyContent: "space-between",
            alignItems: "center",
            
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          },
      });
}



export default PostWriter ;