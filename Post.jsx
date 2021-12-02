import React, { Component } from 'react';
import { View ,Text,StyleSheet} from 'react-native';
class Post extends React.Component {
    
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