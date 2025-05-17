import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Sample Screens (using inline styles)
const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0f2f7' }}>
    <Text style={{ fontSize: 20, marginBottom: 20 }}>Home Screen</Text>
    <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#dcedc8' }}>
    <Text style={{ fontSize: 20 }}>Profile Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff3e0' }}>
    <Text style={{ fontSize: 20 }}>Settings Screen</Text>
  </View>
);

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#bbdefb',
            width: 240,
          },
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
          drawerActiveBackgroundColor: '#90caf9',
          drawerActiveTintColor: 'black',
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MyDrawer;
