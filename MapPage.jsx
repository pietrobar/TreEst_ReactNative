import React from 'react';

import * as Location from 'expo-location';
import { SafeAreaView, Text, StatusBar, Dimensions, StyleSheet, View, Button} from 'react-native';
import MapView from 'react-native-maps';
import CommunicationController from './CommunicationController';

class MapPage extends React.Component {


    state={
        stations:[],
        nearesStation: null,
        defaultCoord: {"latitude": 45.464211,"longitude": 9.191383}//Duomo
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

    getStationsFromServer(){
        CommunicationController.getStations(global.appState.sid,this.props.did).then(
            res=>{
                console.log("Received stations")
                this.state.stations=res.stations;
                this.setState(this.state)
            }
        ).catch(e=>console.log(e))
    }

    componentDidMount(){
        this.locationPermissionAsync().then(res=>{
            if (res!=null){
                this.state.defaultCoord.latitude=res.coords.latitude
                this.state.defaultCoord.longitude=res.coords.longitude
                console.log("setting coordinates based on location of user: ", this.state.defaultCoord)
                this.setState(this.state)
            }
        }).catch(e=>console.log(e));

        this.getStationsFromServer()

    }

    // getNearestStation = () =>{
    //     if (this.state.nearesStation!=null) return this.state.nearesStation
    //     let minDistanceYet=Number.MAX_SAFE_INTEGER
    //     let nearestStation = null
    //     this.state.stations.forEach(station => {
    //         const start = {"latitude": parseFloat(station.lat),"longitude": parseFloat(station.lon)}
    //         const end = this.state.defaultCoord;
    //         let dist = this.getDistanceFromLatLonInKm(start.latitude, start.longitude, end.latitude, end.longitude)
    //         if(dist<minDistanceYet){
    //             minDistanceYet = dist
    //             nearestStation = station
    //         }
            
    //     });
    //     console.log("nearest station: ", nearestStation)
    //     return nearestStation

    // }

    // getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    //     var R = 6371; // Radius of the earth in km
    //     var dLat = this.deg2rad(lat2-lat1);  // this.deg2rad below
    //     var dLon = this.deg2rad(lon2-lon1); 
    //     var a = 
    //       Math.sin(dLat/2) * Math.sin(dLat/2) +
    //       Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
    //       Math.sin(dLon/2) * Math.sin(dLon/2)
    //       ; 
    //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    //     var d = R * c; // Distance in km
    //     return d;
    //   }
      
    //   deg2rad(deg) {
    //     return deg * (Math.PI/180)
    //   }


    
    render() {
       return <SafeAreaView style={this.styles.container}>
           
           <MapView style={this.styles.map} 
            initialRegion={{
                latitude: this.state.defaultCoord.latitude,
                longitude: this.state.defaultCoord.longitude,
                latitudeDelta: 1,
                longitudeDelta: 1,
                }}
                showsUserLocation={true}
                >
            {this.state.stations.map((station) => (
                <MapView.Marker
                key={station.sname}
                coordinate={{latitude: parseFloat(station.lat), longitude: parseFloat(station.lon)}}
                title={station.sname}
                //pinColor={this.getNearestStation()==station?"blue":this.state.stations.indexOf(station)==0 || this.state.stations.indexOf(station)==this.state.stations.length-1?"green":"red"}//override nearest station color
                />
                ))}
            
            <MapView.Polyline
                coordinates={this.state.stations.map(station => ({latitude: parseFloat(station.lat), longitude: parseFloat(station.lon)}))}
                strokeColor="#000"
                strokeWidth={6}
                lineDashPattern={[0]}>
            </MapView.Polyline>
            
            </MapView>
           
       
       
       
       
       <StatusBar styles="auto"/>
       <Button title="Indietro" onPress={() => this.props.onBackPressed()}></Button>


     </SafeAreaView>
                        
                  
    }

    styles = StyleSheet.create({
        
        map: {
            flex:1
        },
        container:{
            flex:1
        }
    });
    
}



export default MapPage;