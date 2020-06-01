import React, { useReducer, createContext } from "react";
import GlobalReducer from "../reducer/GlobalReducer";
import axios from "axios";

const initialState = {
  auth: null,
  markers: [],
  savedLocations: [],
  currentLocation: null,
  fetching: false,
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);


  const login = async (data) => {
    console.log("DATA", data);

    const body = JSON.stringify(data);

    try {
      const res = await axios.post("http://192.168.100.18:1337/auth/local", body, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      dispatch({
        type: "LOGIN",
        payload: res.data
      });

    } catch (error) {
      console.error("Login user", error);
    }
  }

  const getAllMarkers = async () => {
    dispatch({
      type: "FETCH",
      payload: true
    });
    try {
      const res = await axios.get("http://192.168.100.18:1337/markers", {
        headers: {
          "Content-Type": "application/json"
        }
      });
      dispatch({
        type: "GET_MARKERS",
        payload: res.data
      });

      dispatch({
        type: "FETCH",
        payload: false
      });

    } catch (error) {
      console.error("Get all markers error", error);
    }
  };

  const saveLocation = async (data) => {

    const body = JSON.stringify(data);

    try {
      const res = await axios.post('http://192.168.100.18:1337/saved-locations', body, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      dispatch({
        type: "SAVE_LOCATION",
        payload: res.data
      })

    } catch (error) {
      console.error("Post to location error", error);
    }
  }

  const getCurrentLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        position => {
          dispatch({
            type: "GET_CURRENT_LOCATION",
            payload: position
          })
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
      );
    } catch (error) {
      console.log("Error getting location", error)
    }
  }

  return (
    <GlobalContext.Provider value={{
      auth: state.auth,
      markers: state.markers,
      currentLocation: state.currentLocation,
      fetching: state.fetching,
      login,
      getAllMarkers,
      saveLocation,
      getCurrentLocation
    }}>
      {children}
    </GlobalContext.Provider>
  )
}