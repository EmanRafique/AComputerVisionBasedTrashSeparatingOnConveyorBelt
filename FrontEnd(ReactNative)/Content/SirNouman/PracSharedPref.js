// import React, { useState } from 'react';
// import { Alert, View, Text } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
// import { MyBtn } from './allControllers';
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Checkbox } from 'react-native-paper';

// const SignUp = ({ navigation }) => {
//   const [name, setName] = useState('');
//   const [pass, setPass] = useState('');
//   const [conf, setConf] = useState('');

//   const handleSignIn = async () => {
//     try {
//       if (!name || !pass || !conf) {
//         Alert.alert("All fields are required!");
//         return;
//       }
//       if (pass !== conf) {
//         Alert.alert("The Passwords are not the same");
//         return;
//       }
//       await AsyncStorage.setItem(name, pass);
//       navigation.navigate("Login");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder='Name'
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         placeholder='Password'
//         value={pass}
//         secureTextEntry
//         onChangeText={setPass}
//       />
//       <TextInput
//         placeholder='Confirm Password'
//         value={conf}
//         secureTextEntry
//         onChangeText={setConf}
//       />
//       <MyBtn
//         title="Sign Up"
//         onPress={handleSignIn}
//       />
//     </View>
//   );
// };

// const Login = ({ navigation }) => {
//     const [LogName, setLogName] = useState('');
//     const [LogPass, setLogPass] = useState('');
//     const [remember, setRemember] = useState(false);
  
//     const handleLogIn = async () => {
//       const savedPass = await AsyncStorage.getItem(LogName);
//       if (savedPass === LogPass) {
//         if (remember) {
//           await AsyncStorage.setItem(LogName, LogPass);
//         }
//         navigation.navigate("Home", { name: LogName });
//       } else {
//         Alert.alert("Invalid credentials");
//       }
//     };
  
//     const handleUserNameChange = async (name) => {
//       setLogName(name);
//       // When the username is entered, fetch the stored password and show it if available.
//       const savedPass = await AsyncStorage.getItem(name);
//       if (savedPass) {
//         setLogPass(savedPass);
//       } else {
//         setLogPass('');
//       }
//     };
  
//     return (
//       <View>
//         <TextInput
//           placeholder='Name'
//           value={LogName}
//           onChangeText={handleUserNameChange}
//         />
//         <TextInput
//           placeholder='Password'
//           value={LogPass}
//           onChangeText={setLogPass}
//         />
//         <Checkbox
//           status={remember ? 'checked' : 'unchecked'}
//           onPress={() => setRemember(!remember)}
//         />
//         <MyBtn
//           title="Login"
//           onPress={handleLogIn}
//         />
//         <Text onPress={() => navigation.navigate('SignUp')}>New User? SignUp</Text>
//       </View>
//     );
//   };
  
// const Home = ({ route, navigation }) => {
//   const { name } = route.params;
//   return (
//     <View>
//       <Text>Welcome {name}</Text>
//       <MyBtn
//         title="LogOut"
//         onPress={() => navigation.navigate("Login")}
//       />
//     </View>
//   );
// };

// export function StackPrac() {
//   const Stack = createStackNavigator();
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="SignUp" component={SignUp} />
//         <Stack.Screen name="Home" component={Home} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
