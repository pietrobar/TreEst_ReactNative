import React, { Component } from 'react';
import { View ,Text,StyleSheet, ImageBackground, Touchable, TouchableHighlight} from 'react-native';
import CommunicationController from './CommunicationController';
import StorageManager from './StorageManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IconButton, Colors } from 'react-native-paper';

class Post extends React.Component {

    state={
        base64Primer : 'data:image/png;base64,',
        base64Icon: 'data:image/png;base64,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',
        followIcon : {plus: "account-plus", minus:"account-minus"}
    }

    componentDidMount(){
        if(global.appState.uid===""){
            AsyncStorage.getItem("uid").then(res=>{
                global.appState.uid=res
                this.forceUpdate()
              }).catch(e=>console.log(e))
        }
        const sm = new StorageManager();
        let d = this.props.data.item
        
        if (d.pversion!=0){
            sm.getUserPicture(d.author,d.pversion,
                result => {
                    
                    if (result==null){//image not in db or not most recent
                        CommunicationController.getUserPicture(global.appState.sid, d.author)
                        .then(res => {
                            this.state.base64Icon=this.state.base64Primer+res.picture
                            this.setState(this.state)
                            //save into db
                            sm.storeUserPicture(res.uid, res.pversion, res.picture, res=>{}, error=>console.log(error))
                        })
                        .catch(error => console.log(error))
                    }else{//image in db is the most recent
                        console.log("setting image from db")
                        this.state.base64Icon=this.state.base64Primer+result
                        this.setState(this.state)
                    }
                    
                },
                error => console.log("error", error))
        }
    }

    followUnfollow =(followingAuthor, uid)=>{
        if(followingAuthor){
            //UNFOLLOW
            CommunicationController.unfollow(global.appState.sid, uid).then(()=>this.props.refreshPosts(this.props.did)).catch(e=>console.log(e))
        }else{
            //FOLLOW
            CommunicationController.follow(global.appState.sid, uid).then(()=>this.props.refreshPosts(this.props.did)).catch(e=>console.log(e))
        }

        
        
        

    }

    delayTranslator = {
        0:"Ritardo: in orario",
        1:"Ritardo: ritardo lieve",
        2:"Ritardo: ritardo grave",
        3:"Ritardo: treno soppresso"
    }

    statusTranslator = {
        0:"Stato: situazione ideale",
        1:"Stato: situazione accettabile",
        2:"Stato: gravi problemi per i passeggeri"
    }
   
    render() {
        let d = this.props.data.item
        return(
            <View>
                {
                    <View style={this.styles.post}>
                        <View style={this.styles.postHeader}>
                            <View style={this.styles.authorInfo}>
                                
                                <TouchableHighlight disabled={global.appState.uid===d.author} onPress={() => this.followUnfollow(d.followingAuthor, d.author)}>
                                <ImageBackground style={{width: 80, height: 80}} source={{uri: this.state.base64Icon}}>
                                    <IconButton style={{position:"absolute", left:-20, top:-20, opacity:global.appState.uid===d.author?0:1}}
                                    icon={d.followingAuthor?this.state.followIcon.minus:this.state.followIcon.plus}
                                    color={Colors.red500}
                                    size={30}
                                    />
                                </ImageBackground>
                                </TouchableHighlight>
                                
                                <Text style={this.styles.importantText}>{d.authorName}</Text>
                            </View>
                            <View style={this.styles.postContent}>
                                <Text>{this.delayTranslator[d.delay]}</Text>
                                <Text>{this.statusTranslator[d.status]}</Text>
                                <Text>{d.comment}</Text>
                            </View>
                        
                            
                        </View>
                        
                        
                        
                        
                        
                        <Text>{d.datetime.substr(0, d.datetime.indexOf('.')) }</Text>
                        
                        
                    </View>
                    
                }
            </View>
        )
      
                
                  
    }
    styles = StyleSheet.create({
        
        post: {
            margin: 12,
            padding: 12,
            borderRadius: 8,
            backgroundColor: "#eeeeee",
            flex:1
        },
        postHeader:{
            flexDirection:"row",
            flex:1
        },
        authorInfo:{
            alignItems:"center",
            flex:1
        },
        importantText:{
            fontSize: 24
        },
        postContent:{
            flex:2,
            flexDirection:'column',
            paddingLeft:30
        }

      });
}

export default Post ;