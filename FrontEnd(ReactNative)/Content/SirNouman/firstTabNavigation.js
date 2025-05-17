// import React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// // Sample Screens (using inline styles)
// const HomeScreen = () => (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text style={{ fontSize: 20 }}>Home Screen</Text>
//     </View>
// );

// const SettingsScreen = () => (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text style={{ fontSize: 20 }}>Settings Screen</Text>
//     </View>
// );

// const ProfileScreen = () => (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text style={{ fontSize: 20 }}>Profile Screen</Text>
//     </View>
// );

// const Tab = createBottomTabNavigator();

// function MyTabs() {
//     return (
//         <NavigationContainer>
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 tabBarIcon: ({ focused, color, size }) => {
//                     let iconName;

//                     if (route.name === 'Home') {
//                         iconName = focused ? '🏠' : '🏡'; // Example using emojis
//                     } else if (route.name === 'Settings') {
//                         iconName = focused ? '⚙️' : '⚙';
//                     } else if (route.name === 'Profile') {
//                         iconName = focused ? '👤' : '👤';
//                     }

//                     return <Text style={{ fontSize: size, color: color }}>{iconName}</Text>;
//                 },
//                 tabBarActiveTintColor: 'blue', // Active tab color
//                 tabBarInactiveTintColor: 'gray', // Inactive tab color
//                 tabBarStyle: { // Style the tab bar itself
//                     backgroundColor: '#f0f0f0', // Light gray background
//                     borderTopWidth: 1,
//                     borderTopColor: '#ddd',
//                 },
//                 tabBarLabelStyle: { // Style the tab labels
//                     fontSize: 14,
//                     fontWeight: 'bold',
//                 },
//             })}
//         >
//             <Tab.Screen name="Home" component={HomeScreen} />
//             <Tab.Screen name="Settings" component={SettingsScreen} />
//             <Tab.Screen name="Profile" component={ProfileScreen} />
//         </Tab.Navigator>
//         </NavigationContainer>
//     );
// }
// export default MyTabs;









import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Search!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon;

            if (route.name === 'Home') {
              icon = focused ? '🏠' : '🏡'; // Using emojis
            } else if (route.name === 'Search') {
              icon = focused ? '🔍' : '🔎';
            } else if (route.name === 'Profile') {
              icon = focused ? '👤' : '👥';
            }

            return <Text style={{ fontSize: size, color: color }}>{icon}</Text>;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;

