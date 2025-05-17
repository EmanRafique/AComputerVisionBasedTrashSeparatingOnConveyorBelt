import React, { useState, useCallback } from 'react';
import { ScrollView, Text, Image, Alert, View, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { MyBtn, MyTextInput } from './NavigationFile';
import Icon from 'react-native-vector-icons/FontAwesome';  
import { TextInput } from 'react-native-gesture-handler';

const Signup = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [isConfPasswordVisible, setIsConfPasswordVisible] = useState(false);
  const [isScreenActive, setIsScreenActive] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsScreenActive(true);
      return () => setIsScreenActive(false);
    }, [])
  );

  const toggleConfPasswordVisibility = () => setIsConfPasswordVisible(!isConfPasswordVisible);

  const handleSignup = async () => {
    if (!isScreenActive) return;

    const trimmedUserName = userName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedUserName || !trimmedEmail || !password || !confPassword) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    if (password !== confPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    const userData = { 
      name: trimmedUserName, 
      email: trimmedEmail.toLowerCase(), 
      password, 
      role: 'User' 
    };

    try {
      console.log("Sending Data:", userData);
      console.log("API URL:", global.ApiURL + "addUser");

      const response = await axios.post(`${global.ApiURL}addUser`, userData);

      if ((response.status === 200 || response.status === 201) && response.data.id) {  
        Alert.alert('Success', 'Account created successfully! Welcome to Cleany', [
          { text: 'OK', onPress: () => navigation.navigate('User', { screen: 'OrderNow', params: { id: response.data.id } }) }
        ]);        
      } else if (response.data.error?.includes('Email')) {
        Alert.alert('Error', 'Email already exists.');
        return;
      } else {
        console.log("Unexpected API Response:", response.data);
        Alert.alert('Error', response.data?.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error.response ? error.response.data : error.message);

      let errorMessage = "Signup failed. Please try again.";
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#069349', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
        <Image source={require('../assets/Images_GreenBelt/garbage-collector-with-garbage-bags-3316358-2784925.png')} style={{ width: 60, height: 100 }} />
        <Text style={{ fontSize: 60, fontWeight: '900', color: 'white', marginRight: 50 }}>Cleany</Text>
      </View>

      <View style={{ width: '100%', marginTop: 10, marginBottom: 50 }}>
        <MyTextInput iconName="user" placeholder="Enter Name" value={userName} onChangeText={setUserName} />
        <MyTextInput iconName="envelope" placeholder="Enter Email" value={email} autoCapitalize="none" 
        onChangeText={(text) => setEmail(text.toLowerCase())}/>
        <MyTextInput iconName="lock" placeholder="Enter Password" value={password} onChangeText={setPassword}/>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, borderWidth: 1, borderColor: 'black', borderRadius: 5, backgroundColor: '#f1f1e6' }}>
          <Icon name="check-circle" size={20} color="#4d4d4d" style={{ marginLeft: 15, marginRight: 10 }} />
          <TextInput
            placeholder="Confirm Password"
            value={confPassword}
            onChangeText={setConfPassword}
            secureTextEntry={!isConfPasswordVisible}
            style={{ flex: 1, height: 45, fontSize: 16, paddingHorizontal: 10, color: '#4d4d4d' }}
            placeholderTextColor="#4d4d4d"
          />
          <TouchableOpacity onPress={toggleConfPasswordVisibility} style={{ paddingRight: 10 }}>
            <Icon name={isConfPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="#4d4d4d" />
          </TouchableOpacity>
        </View>
      </View>

      <MyBtn title="Sign Up" onPress={handleSignup} style={{ marginBottom: 30 }} txtStyle={{ fontSize: 25 }} />
    </ScrollView>
  );
};

export default Signup;




















// import React, { useState, useCallback } from 'react';
// import { ScrollView, Text, Image, Alert, View, TouchableOpacity } from 'react-native';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import axios from 'axios';
// import { MyBtn, MyTextInput } from './NavigationFile';
// import Icon from 'react-native-vector-icons/FontAwesome';  
// import { TextInput } from 'react-native-gesture-handler';

// const Signup = () => {
//   const navigation = useNavigation();
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confPassword, setConfPassword] = useState('');
//   const [address, setAddress] = useState('');
//   const [phonenumber, setPhoneNumber] = useState('');
//   const [isConfPasswordVisible, setIsConfPasswordVisible] = useState(false);
//   const [isScreenActive, setIsScreenActive] = useState(false);

//   useFocusEffect(
//     useCallback(() => {
//       setIsScreenActive(true);
//       return () => setIsScreenActive(false);
//     }, [])
//   );

//   const toggleConfPasswordVisibility = () => setIsConfPasswordVisible(!isConfPasswordVisible);

//   const handleSignup = async () => {
//     if (!isScreenActive) return;
  
//     const trimmedUserName = userName.trim();
//     const trimmedEmail = email.trim().toLowerCase();
//     const trimmedPhone = phonenumber.trim();
//     const trimmedAddress = address.trim();
  
//     if (!trimmedUserName || !trimmedEmail || !password || !confPassword || !trimmedPhone || !trimmedAddress) {
//       Alert.alert('Error', 'All fields are required!');
//       return;
//     }
  
//     if (password !== confPassword) {
//       Alert.alert('Error', 'Passwords do not match!');
//       return;
//     }
  
//     if (!/^\d{11}$/.test(trimmedPhone)) {
//       Alert.alert('Error', 'Phone number must be exactly 11 digits long.');
//       return;
//     }
  
//     const userData = { 
//       name: trimmedUserName, 
//       email: trimmedEmail, 
//       password, 
//       role: 'User', 
//       phonenumber: trimmedPhone, 
//       address: trimmedAddress 
//     };
  
//     try {
//       console.log("Sending Data:", userData);
//       console.log("API URL:", global.ApiURL + "addUser");
  
//       const response = await axios.post(`${global.ApiURL}addUser`, userData);
  
//       if ((response.status === 200 || response.status === 201) && response.data.id) {  
//         Alert.alert('Success', 'Account created successfully! Welcome to Cleany', [
//           { text: 'OK', onPress: () => navigation.navigate('User', { screen: 'OrderNow', params: { id: response.data.id } }) }
//         ]);        
//       } else if (response.data.error?.includes('Email')) {
//         Alert.alert('Error', 'Email already exists.');
//         return;
//       } else {
//         console.log("Unexpected API Response:", response.data);
//         Alert.alert('Error', response.data?.error || 'Signup failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error during signup:', error.response ? error.response.data : error.message);
  
//       let errorMessage = "Signup failed. Please try again.";
//       if (error.response?.data?.error) {
//         if (error.response.data.error === "Invalid address or geocoding failed.") {
//           errorMessage = "Invalid address."; 
//         } else {
//           errorMessage = error.response.data.error;
//         }
//       }
  
//       Alert.alert("Error", errorMessage);
//     }
//   };
  

//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#069349', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 }}>
//       <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
//         <Image source={require('../assets/Images_GreenBelt/garbage-collector-with-garbage-bags-3316358-2784925.png')} style={{ width: 60, height: 100 }} />
//         <Text style={{ fontSize: 60, fontWeight: '900', color: 'white', marginRight: 50 }}>Cleany</Text>
//       </View>
    
//       <View style={{ width: '100%', marginTop: 10, marginBottom: 50 }}>
//         <MyTextInput iconName="user" placeholder="Enter Name" value={userName} onChangeText={setUserName} />
//         <MyTextInput iconName="envelope" placeholder="Enter Email" value={email} onChangeText={setEmail} />
//         {/* <MyTextInput iconName="phone" placeholder="Enter Phone Number" value={phonenumber} keyboardType="numeric" onChangeText={setPhoneNumber} />
//         <MyTextInput iconName="home" placeholder="Enter Address" value={address} onChangeText={setAddress} />
//         <Text style={{color:'white', fontWeight: '900', fontSize:13}}>e.g: House #5, Street #21, Chaklala Scheme 3, Rawalpindi</Text> */}
//         <MyTextInput iconName="lock" placeholder="Enter Password" value={password} onChangeText={setPassword} secureTextEntry={true} />

//         <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, borderWidth: 1, borderColor: 'black', borderRadius: 5, backgroundColor: '#f1f1e6' }}>
//           <Icon name="check-circle" size={20} color="#4d4d4d" style={{ marginLeft: 15, marginRight: 10 }} />
//           <TextInput
//             placeholder="Confirm Password"
//             value={confPassword}
//             onChangeText={setConfPassword}
//             secureTextEntry={!isConfPasswordVisible}
//             style={{ flex: 1, height: 45, fontSize: 16, paddingHorizontal: 10, color: '#4d4d4d' }}
//             placeholderTextColor="#4d4d4d"
//           />
//           <TouchableOpacity onPress={toggleConfPasswordVisibility} style={{ paddingRight: 10 }}>
//             <Icon name={isConfPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="#4d4d4d" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <MyBtn title="Sign Up" onPress={handleSignup} style={{ marginBottom: 30 }} txtStyle={{ fontSize: 25 }} />
//     </ScrollView>
//   );
// };

// export default Signup;