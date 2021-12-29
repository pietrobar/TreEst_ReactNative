import React from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, Button, StatusBar} from 'react-native';
import CommunicationController from './CommunicationController';
import Dialog from "react-native-dialog";
import SelectDropdown from 'react-native-select-dropdown'


class PostWriter extends React.Component {
    state = {
        delay : "",
        status : "",
        comment : "",
        commentDialogVisible : false,
        tryingTopPublishEmptyPost:false
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
        if(this.state.delay==""&&this.state.status==""&&this.state.comment==""){
            this.showHideEmptyPostDialog()
        }else{
            console.log("pubblica post")
            CommunicationController.addPost(global.appState.sid, this.props.did, this.state.delay,this.state.status,this.state.comment)
            this.props.onBackPressed()
        }
        
    }

    showHideLongCommentDialog = () =>{
        this.state.commentDialogVisible = !this.state.commentDialogVisible
        this.setState(this.state)
    }

    showHideEmptyPostDialog = () =>{
        this.state.tryingTopPublishEmptyPost = !this.state.tryingTopPublishEmptyPost
        this.setState(this.state)
    }

    delayValues =["in orario","ritardo lieve","ritardo grave","treno soppresso"]
    

    statusValues = ["situazione ideale","situazione accettabile","gravi problemi per i passeggeri"]
        
    

    
    

    render() {
        return(
                <SafeAreaView style={{marginTop:40}}> 
                    <SelectDropdown
                        defaultButtonText="Ritardo"
                        data={Object.values(this.delayValues)}
                        onSelect={(selectedItem, index) => {
                            this.setDelay(index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item

                        }}
                    />
                    <SelectDropdown
                        defaultButtonText="Stato"
                        data={Object.values(this.statusValues)}
                        onSelect={(selectedItem, index) => {
                            this.setStatus(index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item

                        }}
                    />
                    
                    <TextInput
                        style={this.styles.commentInput}
                        onChangeText={val => this.setComment(val)}
                        placeholder="Commento"
                    />
                    <Button title="Pubblica" onPress={()=>this.publishPost()}></Button>
                <StatusBar style="auto"></StatusBar>    

                <Button title="Indietro" onPress={()=>this.props.onBackPressed()}></Button>   





                <Dialog.Container visible={this.state.commentDialogVisible}>
                    <Dialog.Title>I commenti non possono superare 100 caratteri</Dialog.Title>
                    <Dialog.Button label="OK  " onPress={this.showHideLongCommentDialog}/>
                </Dialog.Container> 
                <Dialog.Container visible={this.state.tryingTopPublishEmptyPost}>
                    <Dialog.Title>I post non possono essere vuoti</Dialog.Title>
                    <Dialog.Button label="OK  " onPress={this.showHideEmptyPostDialog}/>
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
        commentInput:{
            height: 200,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        }
      });
}



export default PostWriter ;