import React, { useEffect, useState } from "react";
import { Text, Button, View, StyleSheet, Dimensions } from "react-native";
// import MapView, { Marker } from 'react-native-maps';

const Home = ({ navigation }) => {

  // const [currentCoords, setCurrentCoords] = useState(null);

  // // markers
  // const [currentMarks, setCurrentMarks] = useState([
  //   {
  //     coords: {
  //       latitude: 14.5791282,
  //       longitude: 121.0067217
  //     },
  //     title: 'Foo Place',
  //     subtitle: '1234 Foo Drive'
  //   },
  //   {
  //     coords: {
  //       latitude: 14.5792572,
  //       longitude: 121.0067200
  //     },
  //     title: 'Foo Place',
  //     subtitle: '1234 Foo Drive'
  //   },
  // ])

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     async position => {
  //       const location = await JSON.stringify(position);
  //       await setCurrentCoords(JSON.parse(location));
  //     },
  //     error => Alert.alert(error.message),
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //   );
  // }, []);


  // return (
  //   <View>
  //     {currentCoords !== null ? (
  //       <MapView
  //         initialRegion={{
  //           latitude: currentCoords.coords.latitude,
  //           longitude: currentCoords.coords.longitude,
  //           latitudeDelta: 0,
  //           longitudeDelta: 0,
  //         }}
  //         style={styles.mapStyle}
  //       >

  //         {currentMarks.length ? currentMarks.map((mark, idx) => {
  //           return (
  //           <View key={idx}>
  //              <Marker
  //               coordinate={mark.coords}
  //               title={mark.title}
  //               description={"2 people reported that they went in this area."}
  //             />
  //           </View>
  //           )
  //         }) : null}

  //       </MapView>
  //     ) : null}
  //   </View>
  // )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Home;
