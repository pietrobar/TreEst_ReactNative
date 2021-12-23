import React, { Component } from 'react';
import { SafeAreaView , View, StyleSheet, Image, Button,TextInput, TouchableOpacity} from 'react-native';
import CommunicationController from './CommunicationController';
import * as ImagePicker from 'expo-image-picker';
import Dialog from "react-native-dialog";




class ProfileSettingScreen extends React.Component {

    
    state={
        name:"username",
        picturePrefix:"data:image/png;base64,",
        picture: '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',
        pictureHasChanged : false,
        nameHasChanged : false,
        wrongImageDialogVisible : false,
        wrongNameDialogVisible : false
    }

    componentDidMount(){
        //i have to get the profile info
        CommunicationController.getProfile(global.appState.sid).then(res => {
            console.log("userProfile: ", res)
            if(res.name!="unnamed")
                this.state.name=res.name
            
            if(res.pversion!=0){
                this.state.picture=res.picture
            }
            this.setState(this.state)
        }).catch(e=>console.log(e))
    }

    setUsername(val){
        if(val.length<21){
            this.state.name=val
            this.state.nameHasChanged=true
        }
        else{
            this.showHideNameDialog()
        }
        

    }
    saveProfile(){
        if(this.state.nameHasChanged||this.state.pictureHasChanged){
            this.setState(this.state)
            console.log("setting profile: ", this.state.name , this.state.picture)
            CommunicationController.setProfile(global.appState.sid,this.state.name, this.state.picture,this.state.nameHasChanged, this.state.pictureHasChanged).catch(e=>{console.log(e)})
        }
        this.props.onBackPressed()
    }
    openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Serve l'accesso alla galleria");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({"base64":true});
        //todo: controlla che l'immagine abbia formato e taglia corretti
        console.log("banana",pickerResult)
        if(pickerResult.base64){
            if(pickerResult.base64.length<137000 && pickerResult.height==pickerResult.width){
                this.state.picture=pickerResult.base64
                this.setState(this.state)
                this.state.pictureHasChanged=true
            }else{
                this.showHideDialog()
            }
            
        }
        
      }
    
    showHideDialog= ()=>{
        this.state.wrongImageDialogVisible = !this.state.wrongImageDialogVisible
        this.setState(this.state)
    }

    showHideNameDialog=()=>{
        this.state.wrongNameDialogVisible = !this.state.wrongNameDialogVisible
        this.setState(this.state)
    }
  
   
    render() {
        

        return(
            <SafeAreaView style={this.styles.container}>
                <TouchableOpacity onPress={this.openImagePickerAsync} style={this.styles.container}>
                    <Image style={{width: "100%", height: "50%"}} source={{uri: this.state.picturePrefix+this.state.picture}} />
                </TouchableOpacity>
                <TextInput
                        style={this.styles.input}
                        onChangeText={val => this.setUsername(val)}
                        placeholder={this.state.name}
                    />
                <Button title='Annulla' onPress={() => this.props.onBackPressed()}></Button>
                <Button title='Salva' onPress={()=>this.saveProfile()}></Button>

                <Dialog.Container visible={this.state.wrongImageDialogVisible}>
                <Dialog.Title>L'immagine è troppo grande o non è quadrata</Dialog.Title>
                <Dialog.Button label="OK  " onPress={this.showHideDialog}/>
                </Dialog.Container>

                <Dialog.Container visible={this.state.wrongNameDialogVisible}>
                <Dialog.Title>Il nome non deve superare 20 caratteri</Dialog.Title>
                <Dialog.Button label="OK  " onPress={this.showHideNameDialog}/>
                </Dialog.Container>

            </SafeAreaView>
        )
      
                
                  
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
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          },
      });
    
}

export default ProfileSettingScreen ;