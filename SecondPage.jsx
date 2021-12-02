import React, { Component } from 'react';
import { Button, Text, StyleSheet, SafeAreaView } from 'react-native';
class SecondPage extends React.Component {
    
   

    render() {    
        let line = this.props.line
        let direction = this.props.direction
        return <SafeAreaView>
            <Text style={this.styles.title}>{line.terminus1.sname +"\n"+ line.terminus2.sname}</Text>
            <Text style={this.styles.subTitle}>Direzione {direction.sname}</Text>
            <Text style={this.styles.subTitle}>id bacheca = {direction.did}</Text>
            <Button title="indietro" onPress={() => this.props.onBackPressed()}></Button> 
        </SafeAreaView> 
         
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

export default SecondPage ;