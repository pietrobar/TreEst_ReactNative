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
        
        sm.getUserPicture(d.author,d.pversion,
            result => {console.log("risultato", result)
                if (result.rows.length>0){//se ho una picture aggiornata
                    console.log("picture: "+queryResult.rows._array[0].value)
                }else{
                    CommunicationController.getUserPicture("Cez4i87enqRWx32e", d.author)
                    .then(result => {
                        this.state.base64Icon+=result.picture
                        this.setState(this.state)
                    })
                    .catch(error => console.log(error))
                    
                }
            },
            error => console.log("error", error))
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