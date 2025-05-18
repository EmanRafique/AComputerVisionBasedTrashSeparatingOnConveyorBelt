// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, Alert } from "react-native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import { Button, Checkbox } from "react-native-paper";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import MapView, { Marker, Polygon } from "react-native-maps";

// // 1️⃣ **User Signup Screen**
// const UserSignUp = ({ navigation }) => {
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confPassword, setConfPassword] = useState("");
//   const [markers, setMarkers] = useState([]);

//   const handleMapPress = (event) => {
//     const coordinate = event.nativeEvent.coordinate;
//     setMarkers([...markers, coordinate]);
//   };

//   const handleSignUp = async () => {
//     if (!name || !password || !confPassword) {
//       Alert.alert("Error", "All fields are required.");
//       return;
//     }
//     if (password !== confPassword) {
//       Alert.alert("Error", "Passwords do not match!");
//       return;
//     }

//     await AsyncStorage.setItem(name, password);
//     await AsyncStorage.setItem("userMarkers", JSON.stringify(markers)); // Save markers
//     navigation.navigate("UserLogin");
//   };

//   return (
//     <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
//       <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginBottom: 20, color: "#4A90E2" }}>
//         SIGNUP
//       </Text>

//       <TextInput
//         style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10, borderColor: "#4A90E2" }}
//         placeholder="User Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10, borderColor: "#4A90E2" }}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <TextInput
//         style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10, borderColor: "#4A90E2" }}
//         placeholder="Confirm Password"
//         secureTextEntry
//         value={confPassword}
//         onChangeText={setConfPassword}
//       />

//       <MapView
//         style={{ flex: 1, height: 300, marginBottom: 10 }}
//         initialRegion={{
//           latitude: 33.6425,
//           longitude: 73.0783,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421
//         }}
//         onPress={handleMapPress}
//       >
//         {markers.map((marker, index) => (
//           <Marker key={index} coordinate={marker} />
//         ))}

//         {markers.length > 2 && (
//           <Polygon coordinates={markers} fillColor='rgba(28,110,168,0.3)' strokeColor="blue" strokeWidth={3} />
//         )}
//       </MapView>

//       <Button mode="contained" style={{ backgroundColor: "#4A90E2", borderRadius: 5, marginTop: 10 }} onPress={handleSignUp}>
//         Sign Up
//       </Button>
//     </View>
//   );
// };

// // 2️⃣ **User Login Screen**
// const UserLogin = ({ navigation }) => {
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);

//   useEffect(() => {
//     const loadCredentials = async () => {
//       const savedPassword = await AsyncStorage.getItem(name);
//       if (savedPassword) setPassword(savedPassword);
//     };
//     loadCredentials();
//   }, [name]);

//   const handleLogin = async () => {
//     const savedPassword = await AsyncStorage.getItem(name);
//     if (!savedPassword) {
//       Alert.alert("Error", "User not found. Please sign up.");
//       return;
//     }
//     if (!name || !password) {
//       Alert.alert("Error", "All fields are required.");
//       return;
//     }
//     if (password !== savedPassword) {
//       Alert.alert("Error", "Incorrect password!");
//       return;
//     }
//     if (rememberMe) await AsyncStorage.setItem("rememberedUser", name);
//     navigation.navigate("UserHome", { name });
//   };

//   return (
//     <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
//       <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginBottom: 20, color: "#4A90E2" }}>
//         LOGIN
//       </Text>

//       <TextInput
//         style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10, borderColor: "#4A90E2" }}
//         placeholder="User Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10, borderColor: "#4A90E2" }}
//         placeholder="Password"
//         secureTextEntry={!rememberMe}
//         value={password}
//         onChangeText={setPassword}
//       />

//       <Button mode="contained" style={{ backgroundColor: "#4A90E2", borderRadius: 5, marginTop: 10 }} onPress={handleLogin}>
//         Login
//       </Button>
//     </View>
//   );
// };

// // 3️⃣ **User Home Screen**
// const UserHome = ({ navigation, route }) => {
//   const { name } = route.params;
//   const [markers, setMarkers] = useState([]);

//   useEffect(() => {
//     const loadMarkers = async () => {
//       const savedMarkers = await AsyncStorage.getItem("userMarkers");
//       if (savedMarkers) {
//         setMarkers(JSON.parse(savedMarkers));
//       }
//     };
//     loadMarkers();
//   }, []);

//   const handleLogout = () => {
//     Alert.alert("Logout", "You have been logged out.");
//     navigation.navigate("UserLogin");
//   };

//   return (
//     <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
//       <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginBottom: 20, color: "#4A90E2" }}>
//         HOME
//       </Text>
//       <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 20 }}>
//         Welcome {name}
//       </Text>

//       <MapView
//         style={{ flex: 1, height: 300, marginBottom: 10 }}
//         initialRegion={{
//           latitude: 33.6425,
//           longitude: 73.0783,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421
//         }}
//       >
//         {markers.map((marker, index) => (
//           <Marker key={index} coordinate={marker} />
//         ))}

//         {markers.length > 2 && (
//           <Polygon coordinates={markers} fillColor='rgba(28,110,168,0.3)' strokeColor="blue" strokeWidth={3} />
//         )}
//       </MapView>

//       <Button mode="contained" style={{ backgroundColor: "#4A90E2", borderRadius: 5, marginTop: 10 }} onPress={handleLogout}>
//         Logout
//       </Button>
//     </View>
//   );
// };

// // 📌 Navigation Setup
// const Stack = createStackNavigator();
// export default function AppNavigation() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="UserLogin" component={UserLogin} />
//         <Stack.Screen name="UserSignIn" component={UserSignUp} />
//         <Stack.Screen name="UserHome" component={UserHome} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
