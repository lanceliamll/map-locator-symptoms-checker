import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeStackScreen, AboutStackScreen, AddReportStackScreen, PrecautionStackScreen, LoginStackScreen, RegisterStackScreen } from './stacks';
import { GlobalProvider } from "./store/context/GlobalContext";

const DrawerStack = createDrawerNavigator();

const App = () => {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <DrawerStack.Navigator initialRouteName="HomeStackScreen">
          <DrawerStack.Screen name="Login" component={LoginStackScreen} />
          <DrawerStack.Screen name="Register" component={RegisterStackScreen} />
          <DrawerStack.Screen name="Home" component={HomeStackScreen} />
          <DrawerStack.Screen name="About" component={AboutStackScreen} />
          <DrawerStack.Screen name="AddReport" component={AddReportStackScreen} />
          <DrawerStack.Screen name="Precaution" component={PrecautionStackScreen} />
        </DrawerStack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  )
}


export default App;