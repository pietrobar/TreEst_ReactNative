import React from 'react';
import { StyleSheet, Button, Text, View , TouchableOpacity} from 'react-native';
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
            backgroundColor: "#DDDDDD",
            padding: 10,
            width: "90%"
          },
        container:{
            flex:1,
            justifyContent: "space-between",
            alignItems: "center",
            
        }
      });
}



export default Row ;