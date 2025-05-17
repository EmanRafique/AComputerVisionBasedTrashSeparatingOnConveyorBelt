import React from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { User, Admin, Collector, Driver, Main, Operator } from './Content/GreenBeltProject/NavigationFile';

const Stack = createStackNavigator();  

const App = () => {
  const ipApi = "192.168.100.215:5000";
  global.ApiURL = `http://${ipApi}/`;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={Main} /> 
            <Stack.Screen name="User" component={User} /> 
            <Stack.Screen name="Admin" component={Admin} />
            <Stack.Screen name="Collector" component={Collector} />
            <Stack.Screen name="Driver" component={Driver} />
            <Stack.Screen name="Operator" component={Operator} />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </GestureHandlerRootView>
  );
};

export default App;
