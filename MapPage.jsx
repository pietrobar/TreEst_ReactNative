import React from 'react';

import * as Location from 'expo-location';
import { SafeAreaView, Text, StatusBar, Dimensions, StyleSheet, View, Button} from 'react-native';
import MapView from 'react-native-maps';

class MapPage extends React.Component {


    state={
        stations:{}
    }

    async locationPermissionAsync() {
        let canUseLocation = false;
        const grantedPermission = await Location.getForegroundPermissionsAsync()
        if (grantedPermission.status === "granted") {
            canUseLocation = true;
        } else {
            const permissionResponse = await Location.requestForegroundPermissionsAsync()
            if (permissionResponse.status === "granted") {
                canUseLocation = true;
            }
        }
        if (canUseLocation) {
            const location = await Location.getCurrentPositionAsync()
            console.log("received location:", location);
            return location
        }
        return null
    }
    componentDidMount(){
        this.locationPermissionAsync().then(res=>console.log("Location: "+ res)).catch(e=>console.log(e));
    }
    
    render() {
       return <SafeAreaView>
           
           <MapView style={this.styles.map} 
            initialRegion={{
                latitude: 49.5,
                longitude: 0,
                latitudeDelta: 1,
                longitudeDelta: 1,
                }}>
            <MapView.Marker
                coordinate={{latitude: 49.5, longitude: 0}}
                title="prova"
                description = "descrizione"
                /> 
            </MapView>
           
       
       
       
       
       <StatusBar styles="auto"/>
       <Button title="Indietro" onPress={() => this.props.onBackPressed()}></Button>


     </SafeAreaView>
                        
                  
    }

    styles = StyleSheet.create({
        
        map: {
            width: Dimensions.get('window').width,
            height: "96%",
        },
    });
    
}



export default MapPage;