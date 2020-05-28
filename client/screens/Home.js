import React, { useEffect, useState, useContext } from "react";
import { GlobalContext, GlobalProvider } from "../store/context/GlobalContext";
import { Text, Button, View, StyleSheet, Dimensions, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker } from 'react-native-maps';

const Home = ({ navigation }) => {

  // get globalstate
  const { fetching, auth, getAllMarkers, markers, saveLocation } = useContext(GlobalContext);

  // current location
  const [currentCoords, setCurrentCoords] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  // markers 
  const [currentMarks, setCurrentMarks] = useState([]);

  const getCurrentPosition = () => {
    // get current location 
    navigator.geolocation.getCurrentPosition(
      position => {

        const locationWithId = Object.assign({ data: position }, { user: auth.user.id });

        const location = JSON.stringify(position);
        setCurrentPosition(JSON.parse(location));

        // post to saved location
        console.log(1123, locationWithId);
        saveLocation(locationWithId);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
    );
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
    getCurrentPosition();

    // get every 30 minutes
    setTimeout(() => {
      getCurrentPosition();
    }, 1800000);


    // get markers
    const transformed = transformMarkersData(markers);
    setCurrentMarks(transformed);

    //real time 1800000
  }, []);

  if (fetching) return <ActivityIndicator size="large" color="#0000ff" />;
  if (currentPosition === null) return null;

  return (
    <View>
      <MapView
        initialRegion={{
          latitude: currentPosition && currentPosition.coords.latitude,
          longitude: currentPosition && currentPosition.coords.longitude,
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
