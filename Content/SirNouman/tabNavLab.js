import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-paper';

// Home Screen
const navHome = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>This is my Home Screen</Text>
    </View>
  );
};

// Settings Screen
const navSetting = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>This is my Settings Screen</Text>
    </View>
  );
};

// Login Screen
const navLogin = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Login Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate('MyTabNavigation')}>
        Login
      </Button>
    </View>
  );
};

// Tab Navigation
const MyTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={navHome} />
      <Tab.Screen name="Settings" component={navSetting} />
    </Tab.Navigator>
  );
};

// Stack Navigation
const StackNavScreen = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginNav" component={navLogin} />
        <Stack.Screen name="MyTabNavigation" component={MyTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavScreen;
