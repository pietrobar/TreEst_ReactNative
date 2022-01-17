import React from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, Button, StatusBar, View, TouchableOpacity} from 'react-native';
import CommunicationController from './CommunicationController';
import Dialog from "react-native-dialog";
import SelectDropdown from 'react-native-select-dropdown'
import { Colors } from 'react-native-paper';



class PostWriter extends React.Component {
    state = {
        delay : "",
        status : "",
        comment : "",
        tryingTopPublishEmptyPost:false
    }

    setDelay = (value) =>{
        this.state.delay = value
        this.setState(this.state)
    }
    setStatus = (value) =>{
        this.state.status = value
        this.setState(this.state)
    }
    setComment = (value) =>{
        
        this.state.comment = value
        this.setState(this.state)
        

            
    }

    publishPost = () =>{
        
        if(this.state.delay==""&&this.state.status==""&&this.state.comment==""){
            this.showHideEmptyPostDialog()
        }else{
            console.log("pubblica post")
            CommunicationController.addPost(global.appState.sid, this.props.did, this.state.delay,this.state.status,this.state.comment)
                .then(response => this.props.onBackPressed())
                .catch(response => this.props.onBackPressed())
            //todo:prendere ispirazione da android
        }
        
    }


    showHideEmptyPostDialog = () =>{
        this.state.tryingTopPublishEmptyPost = !this.state.tryingTopPublishEmptyPost
        this.setState(this.state)
    }

    delayValues =["in orario","ritardo lieve","ritardo grave","treno soppresso"]
    

    statusValues = ["situazione ideale","accettabile","gravi problemi"]
        
    

    
    

    render() {
        return(
                <SafeAreaView style={{marginTop:"30%", alignItems:"center"}}> 
                    <View style={{flexDirection:"row", width:"90%"}}>
                        <SelectDropdown
                            buttonStyle={{flex:1, marginLeft:5,backgroundColor:Colors.green100,borderRadius:10, elevation:10}}
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
                            buttonStyle={{flex:1, marginRight:5, backgroundColor:Colors.green100, borderRadius:10, elevation:10}}
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
                    </View>
                   
                    
                    <TextInput
                        style={this.styles.commentInput}
                        onChangeText={val => this.setComment(val)}
                        placeholder="Commento"
                        multiline={true}
                        maxLength={100}
                    />
                    <Text style={{
                    fontSize:10,
                    color:'grey',
                    
                    }}> 
                    
                    {this.state.comment.length}/100 
                </Text>
                <TouchableOpacity style={this.styles.button} onPress={()=>this.publishPost()}><Text>Pubblica</Text></TouchableOpacity>

                <TouchableOpacity style={this.styles.button} onPress={()=>this.props.onBackPressed()}><Text>Indietro</Text></TouchableOpacity>   





                
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
            backgroundColor: Colors.green100,
            padding: 10,
            marginTop: 10,
            width: "90%",
            borderRadius:10,
            elevation:10

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
            width: "90%"
        }
      });
}



export default PostWriter ;