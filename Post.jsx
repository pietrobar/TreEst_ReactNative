import React, { Component } from 'react';
import { View ,Text,StyleSheet, Image} from 'react-native';
import CommunicationController from './CommunicationController';
import StorageManager from './StorageManager';
class Post extends React.Component {

    state={
        base64Icon: 'data:image/png;base64,' 
    }

    componentDidMount(){
        const sm = new StorageManager();
        let d = this.props.data.item
        
        if (d.pversion!=0){
            sm.getUserPicture(d.author,d.pversion,
                result => {
                    
                    if (result==null){//image not in db or not most recent
                        CommunicationController.getUserPicture("Cez4i87enqRWx32e", d.author)
                        .then(res => {
                            this.state.base64Icon+=res.picture
                            this.setState(this.state)
                            //save into db
                            sm.storeUserPicture(res.uid, res.pversion, res.picture, res=>{}, error=>console.log(error))
                        })
                        .catch(error => console.log(error))
                    }else{//image in db is the most recent
                        console.log("setting image from db")
                        this.state.base64Icon+=result
                        this.setState(this.state)
                    }
                    
                },
                error => console.log("error", error))
        }
    }

   
    render() {
        let d = this.props.data.item

        return(
            <View>
                {
                    <View>
                        <Text>Delay: { d.delay}</Text>
                        <Text>Status: {d.status}</Text>
                        <Text>Comments: {d.comment}</Text>
                        <Text>followingAuthor: {d.followingAuthor ? "true" : "false"}</Text>
                        <Text>datetime: {d.datetime}</Text>
                        <Text>authorName: {d.authorName}</Text>
                        <Text>pversion: {d.pversion}</Text>
                        <Text>author: {d.author}</Text>
                        <Image style={{width: 50, height: 50}} source={{uri: this.state.base64Icon}}/>
                        <Text>-------------------------------------------</Text>
                    </View>
                    
                }
            </View>
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
            justifyContent: "space-between",
            alignItems: "center",
            
        }
      });
}

export default Post ;