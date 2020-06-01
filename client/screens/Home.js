import React, { useEffect, useState, useContext } from "react";
import { GlobalContext, GlobalProvider } from "../store/context/GlobalContext";
import { Text, Button, View, StyleSheet, Dimensions, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { divide } from "react-native-reanimated";

const Home = ({ navigation }) => {

  // get globalstate
  const { fetching, auth, getAllMarkers, markers, saveLocation } = useContext(GlobalContext);

  // current location
  const [currentPosition, setCurrentPosition] = useState(null);
  // markers 
  const [currentMarks, setCurrentMarks] = useState([
    {
      id: 1,
      "user": {
        "id": 1,
        "username": "admin",
        "email": "adminuser@gmail.com",
        "provider": "local",
        "confirmed": true,
        "blocked": false,
        "role": 1,
        "created_at": "2020-05-16T06:07:55.661Z",
        "updated_at": "2020-05-17T01:35:55.472Z"
      },
      "longitude": 121.0085408,
      "latitude": 14.5818966,
      "title": "Near Yang",
      "description": "Test Marker",
      "data": [
        {
          "id": 48,
          "data": {
            "timestamp": 1590678850219,
            "mocked": false,
            "coords": {
              "altitude": 70.69999694824219,
              "heading": 0,
              "longitude": 121.0084791,
              "speed": 0,
              "latitude": 14.5819453,
              "accuracy": 83.00800323486328
            }
          },
          "user": {
            "created_at": "2020-05-16T06:07:55.661Z",
            "blocked": false,
            "provider": "local",
            "role": 1,
            "username": "admin",
            "updated_at": "2020-05-17T01:35:55.472Z",
            "id": 1,
            "email": "adminuser@gmail.com",
            "confirmed": true
          },
          "created_at": "2020-05-28T15:14:10.233Z",
          "updated_at": "2020-05-28T15:14:10.236Z"
        },
        {
          "id": 49,
          "data": {
            "timestamp": 1590678874129,
            "mocked": false,
            "coords": {
              "altitude": 66.19999694824219,
              "heading": 11.099784851074219,
              "longitude": 121.0085694,
              "speed": 0.04129723086953163,
              "latitude": 14.5818898,
              "accuracy": 54.86399841308594
            }
          },
          "user": {
            "created_at": "2020-05-16T06:07:55.661Z",
            "blocked": false,
            "provider": "local",
            "role": 1,
            "username": "admin",
            "updated_at": "2020-05-17T01:35:55.472Z",
            "id": 1,
            "email": "adminuser@gmail.com",
            "confirmed": true
          },
          "created_at": "2020-05-28T15:14:34.349Z",
          "updated_at": "2020-05-28T15:14:34.357Z"
        },
        {
          "id": 50,
          "data": {
            "timestamp": 1590678889099,
            "mocked": false,
            "coords": {
              "altitude": 53.19999694824219,
              "heading": 9.2875394821167,
              "longitude": 121.0086616,
              "speed": 3.8923439979553223,
              "latitude": 14.5824361,
              "accuracy": 27.881000518798828
            }
          },
          "user": {
            "created_at": "2020-05-16T06:07:55.661Z",
            "blocked": false,
            "provider": "local",
            "role": 1,
            "username": "admin",
            "updated_at": "2020-05-17T01:35:55.472Z",
            "id": 1,
            "email": "adminuser@gmail.com",
            "confirmed": true
          },
          "created_at": "2020-05-28T15:14:49.055Z",
          "updated_at": "2020-05-28T15:14:49.062Z"
        }
      ],
    },
    {
      id: 1,
      "user": {
        "id": 1,
        "username": "admin",
        "email": "adminuser@gmail.com",
        "provider": "local",
        "confirmed": true,
        "blocked": false,
        "role": 1,
        "created_at": "2020-05-16T06:07:55.661Z",
        "updated_at": "2020-05-17T01:35:55.472Z"
      },
      "longitude": 121.0085408,
      "latitude": 14.5818966,
      "title": "Near Yang",
      "description": "Test Marker",
      "data": [
        {
          "id": 48,
          "data": {
            "timestamp": 1590678850219,
            "mocked": false,
            "coords": {
              "altitude": 70.69999694824219,
              "heading": 0,
              "longitude": 121.0084791,
              "speed": 0,
              "latitude": 14.5819453,
              "accuracy": 83.00800323486328
            }
          },
          "user": {
            "created_at": "2020-05-16T06:07:55.661Z",
            "blocked": false,
            "provider": "local",
            "role": 1,
            "username": "admin",
            "updated_at": "2020-05-17T01:35:55.472Z",
            "id": 1,
            "email": "adminuser@gmail.com",
            "confirmed": true
          },
          "created_at": "2020-05-28T15:14:10.233Z",
          "updated_at": "2020-05-28T15:14:10.236Z"
        },
        {
          "id": 49,
          "data": {
            "timestamp": 1590678874129,
            "mocked": false,
            "coords": {
              "altitude": 66.19999694824219,
              "heading": 11.099784851074219,
              "longitude": 121.0085694,
              "speed": 0.04129723086953163,
              "latitude": 14.5818898,
              "accuracy": 54.86399841308594
            }
          },
          "user": {
            "created_at": "2020-05-16T06:07:55.661Z",
            "blocked": false,
            "provider": "local",
            "role": 1,
            "username": "admin",
            "updated_at": "2020-05-17T01:35:55.472Z",
            "id": 1,
            "email": "adminuser@gmail.com",
            "confirmed": true
          },
          "created_at": "2020-05-28T15:14:34.349Z",
          "updated_at": "2020-05-28T15:14:34.357Z"
        },
        {
          "id": 50,
          "data": {
            "timestamp": 1590678889099,
            "mocked": false,
            "coords": {
              "altitude": 53.19999694824219,
              "heading": 9.2875394821167,
              "longitude": 121.0086616,
              "speed": 3.8923439979553223,
              "latitude": 14.5824361,
              "accuracy": 27.881000518798828
            }
          },
          "user": {
            "created_at": "2020-05-16T06:07:55.661Z",
            "blocked": false,
            "provider": "local",
            "role": 1,
            "username": "admin",
            "updated_at": "2020-05-17T01:35:55.472Z",
            "id": 1,
            "email": "adminuser@gmail.com",
            "confirmed": true
          },
          "created_at": "2020-05-28T15:14:49.055Z",
          "updated_at": "2020-05-28T15:14:49.062Z"
        }
      ],
    }
  ]);

  const getCurrentPosition = () => {
    // get current location 
    navigator.geolocation.getCurrentPosition(
      position => {
        const locationWithId = Object.assign({ data: position }, { user: auth.user.id });
        const location = JSON.stringify(position);
        setCurrentPosition(JSON.parse(location));

        // post to saved location
        // saveLocation(locationWithId);

        console.log("USER CURRENT POSITIOn", currentPosition)
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
    );
  };

  const transformMarkersData = data => {
    if (data === undefined || data === null) return [];
    return !data.length ? [] : data.map(d => {
      return !data.length || data === null ? [] : d.data.map(location => {
        return {
          coords: {
            latitude: location.data.coords.latitude,
            longitude: location.data.coords.longitude
          }
        }
      })
    });
  }

  useEffect(() => {
    getAllMarkers();
    getCurrentPosition();
    // get every 30 minutes
    // setTimeout(() => {
    //   getCurrentPosition();
    // }, 1800000);

    // get markers

    // setCurrentMarks(transformed);

    // console.log("TRANS", transformMarkersData(currentMarks))
    //real time 1800000
  }, []);

  if (fetching) return <ActivityIndicator size="large" color="#0000ff" />;
  try {
    return (
      <View>
        {currentPosition !== null ? (
          <MapView
            initialRegion={{
              latitude: currentPosition.coords.latitude,
              longitude: currentPosition.coords.longitude,
              latitudeDelta: 0,
              longitudeDelta: 0,
            }}
            style={styles.mapStyle}
          >

            {/* render markers */}
            {currentMarks.length ? transformMarkersData(currentMarks).map(mark => {
              return (
                <>
                  {mark.length < 0 ? null : mark.map((m, idx) => {
                    return (
                      <View key={idx}>
                        <Marker
                          coordinate={m.coords}
                        />
                      </View>
                    )
                  })}

                </>
              )
            }) : null}

          </MapView>
        ) : null}
      </View>
    )
  } catch (error) {
    console.log("ERR", error)
  }
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
