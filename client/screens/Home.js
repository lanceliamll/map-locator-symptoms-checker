import React, { useEffect, useState, useContext } from "react";
import { GlobalContext, GlobalProvider } from "../store/context/GlobalContext";
import { Text, Button, View, StyleSheet, Dimensions, Alert } from "react-native";
import MapView, { Marker } from 'react-native-maps';

const Home = ({ navigation }) => {

  // get globalstate
  const { auth, getAllMarkers, markers } = useContext(GlobalContext);

  // current location
  const [currentCoords, setCurrentCoords] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({
    coords: {
      "accuracy": 20,
      "altitude": 0,
      "heading": 0,
      "latitude": 14.581537,
      "longitude": 121.007102,
      "speed": 0
    }
  });

  // markers 
  const [currentMarks, setCurrentMarks] = useState([
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

    if (result > 0.2) return;

    // get markers and post ?

    console.log("Result1", result, "Coords1", coords, "CurrentPos", pos);
    // radius logic
  };

  const transformMarkersData = (data) => {
    return !data.length ? [] : data.map(d => {
      const transformedData = {
        id: d.id,
        coords: {
          latitude: d.latitude,
          longitude: d.longitude,
        },
        title: d.title,
        description: d.description,
        created_at: d.created_at
      }
      return transformedData;
    });
  };


  useEffect(() => {

    // transform markers and set to state
    getAllMarkers();

    // get radius and coords
    getCoords();
    identifyRadius();
    
    // get every 30 minutes
    setTimeout(() => {
      getCurrentPosition();
      identifyRadius();
    }, 1800000);


    // get markers
    const transformed = transformMarkersData(markers);
    setCurrentMarks(transformed);

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

          {/* render markers */}
          {currentMarks.length ? currentMarks.map((mark, idx) => {
            return (
              <View key={idx}>
                <Marker
                  coordinate={mark.coords}
                  title={mark.title}
                  description={mark.description}
                />
              </View>
            )
            // console.log(currentMarks);
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
