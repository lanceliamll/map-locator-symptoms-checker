import React, { useEffect, useState, useContext } from "react";
import { GlobalContext, GlobalProvider } from "../store/context/GlobalContext";
import { Text, Button, View, StyleSheet, Dimensions, Alert } from "react-native";
import MapView, { Marker } from 'react-native-maps';

const Home = ({ navigation }) => {

  // get globalstate
  const { auth } = useContext(GlobalContext);

  // current location
  const [currentCoords, setCurrentCoords] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  // markers 
  const [currentMarks, setCurrentMarks] = useState([
    {
      coords: {
        latitude: 14.5791282,
        longitude: 121.0067217
      },
      title: 'Foo Pl111ace',
      subtitle: '1234 Foo Drive'
    },
    {
      coords: {
        latitude: 14.5792572,
        longitude: 121.0067200
      },
      title: 'Foo Place',
      subtitle: '1234 Foo Drive'
    },
  ]);

  //Convert degree to rad
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  }

  //Lat1, Lon1 = (Current Location) Lat2, Lon2 = (Constant Location)
  const validateCurrentLocation = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  const getCoords = () => {
    // get user location 
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        setCurrentCoords(JSON.parse(location));
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
    );
  };

  const getCurrentPosition = () => {
    // get current location 
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        setCurrentPosition(JSON.parse(location));
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
    );
  };

  const identifyRadius = () => {
    const coords = currentCoords;
    const pos = currentPosition;

    if (coords === null || pos === null) return;

    const result = validateCurrentLocation(pos.coords.latitude, pos.coords.longitude, coords.coords.latitude, coords.coords.longitude);

    if (result > 0.3) return;

    // get markers and post ?

    console.log("Result", result, "Coords1", coords);
    // radius logic
  }

  useEffect(() => {
    getCoords();
    identifyRadius();
    setTimeout(() => {
      getCurrentPosition();
      identifyRadius();
    }, 10000)
    //real time 1800000
  }, []);


  return (
    <View>
      {currentCoords !== null ? (
        <MapView
          initialRegion={{
            latitude: currentCoords.coords.latitude,
            longitude: currentCoords.coords.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
          }}
          style={styles.mapStyle}
        >

          {currentMarks.length ? currentMarks.map((mark, idx) => {
            return (
              <View key={idx}>
                <Marker
                  coordinate={mark.coords}
                  title={mark.title}
                  description={"2 people reported that they went in this area."}
                />
              </View>
            )
          }) : null}

        </MapView>
      ) : null}
    </View>
  )
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
