import React, { useReducer, createContext } from "react";
import GlobalReducer from "../reducer/GlobalReducer";
import axios from "axios";

const initialState = {
  auth: null,
  markers: [
    {
      latlng: {
        longitude: 0,
        latitude: 0
      },
      title: "Sample",
      description: "Sample Description"
    }
  ],
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
      // api call
      dispatch({
        type: "LOGIN",
        payload: res.data
      });

    } catch (error) {
      console.error("FUCKING ERROR", error);
    }
  }

  return (
    <GlobalContext.Provider value={{ auth: state.auth, login }}>
      {children}
    </GlobalContext.Provider>
  )
}