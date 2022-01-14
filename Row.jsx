import React from 'react';
import { StyleSheet, Button, Text, View , TouchableOpacity} from 'react-native';
import { Colors } from 'react-native-paper';

class Row extends React.Component {
    
    render() {
        let l =this.props.data.item;
        return(
            <View style={this.styles.container}> 
                <Text style={this.styles.subTitle}>{l.terminus1.sname + " - " + l.terminus2.sname}</Text>
                <TouchableOpacity style={this.styles.button}  onPress={() => this.props.onLineSelected(l,l.terminus1)}><Text>{l.terminus1.sname}</Text></TouchableOpacity>
                <TouchableOpacity style={this.styles.button}  onPress={() => this.props.onLineSelected(l,l.terminus2)}><Text>{l.terminus2.sname}</Text></TouchableOpacity>
            </View>
            
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
            width: "90%",
            borderRadius:10,
            marginTop:5,
            elevation:10
          },
        container:{
            flex:1,
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom:20
            
        }
      });
}



export default Row ;