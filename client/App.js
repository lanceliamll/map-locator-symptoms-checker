import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeStackScreen, AboutStackScreen, AddReportStackScreen, PrecautionStackScreen } from './stacks';

const DrawerStack = createDrawerNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <DrawerStack.Navigator initialRouteName="HomeStackScreen">
        <DrawerStack.Screen name="Home" component={HomeStackScreen} />
        <DrawerStack.Screen name="About" component={AboutStackScreen} />
        <DrawerStack.Screen name="AddReport" component={AddReportStackScreen} />
        <DrawerStack.Screen name="Precaution" component={PrecautionStackScreen} />
      </DrawerStack.Navigator>
    </NavigationContainer>
  )
}


export default App;