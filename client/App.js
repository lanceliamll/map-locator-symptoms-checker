import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./shared"; 
import { GlobalProvider } from "./store/context/GlobalContext";


const App = () => {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </GlobalProvider>
  )
}


export default App;