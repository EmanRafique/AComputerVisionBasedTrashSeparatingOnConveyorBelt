import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { useFocusEffect } from "@react-navigation/native";

const OrderNowScreen = ({ navigation, route}) => {
  const [userId, setUserId] = useState(route.params?.id || null);
  const [profileImage, setProfileImage] = useState(null);
  const [userRank, setUserRank] = useState("80%"); 
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (route.params?.id) {
      setUserId(route.params.id);
    }

    const backAction = () => true;
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [route.params?.id]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserProfile = async () => {
        if (!userId) return;
        console.log(`Fetching user details for ID: ${userId}`);
        try {
          const response = await axios.get(`${global.ApiURL}/getUserById/${userId}`);
          if (response.data) {
            setProfileImage(response.data.profile ? `${global.ApiURL}/${response.data.profile}` : null);
            setUserRank(response.data.rank || "N/A");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      fetchUserProfile();
    }, [userId, route.params?.refresh]) // Re-run when refreshed
  );

  const handleLogoutAccount = async () => {
    Alert.alert("Logout", "Do you want to Logout Account", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => navigation.navigate('Main', { screen: 'Getstarted' }) 
      },
    ]);
  };  
  
  const handleDeleteAccount = async () => {
    Alert.alert("Delete Account", "Do you want to delete your account permanently?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          try {
            const response = await axios.post(`${global.ApiURL}deleteAccount`, { id: userId });
  
            if (response.status === 200) {
              await AsyncStorage.clear();
              Alert.alert("Success", response.data.message, [
                { text: "OK", onPress: () => navigation.navigate('Main', { screen: 'Getstarted' })},
              ]);
            } else {
              Alert.alert("Error", "Account deletion failed.");
            }
          } catch (error) {
            console.error("Delete account error:", error);
            Alert.alert("Error", "Could not connect to the server.");
          }
        },
      },
    ]);
  };  

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F2', paddingBottom: 80 }}>
      <View style={{ backgroundColor: '#069349', flexDirection: 'row', justifyContent: 'space-between',
         padding: 20, alignItems: 'center' }}>
        <View style={{ position: 'absolute', left: '55%', top: 25, transform: [{ translateX: -50 }] }}>
          <Image
            source={profileImage ? { uri: profileImage } : require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
            style={{ borderRadius: 50, width: 100, height: 100, resizeMode: 'cover' }}
          />
        </View>

        <View style={{justifyContent:'flex-start'}}>
          <TouchableOpacity onPress={() => {}} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontWeight: '900', fontSize: 18 }}>Rank: {userRank}%</Text> 
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '40%' }}>
          <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('Notification', { id : userId })}>
            <Icon name="bell" size={22} color="#fff" />
          </TouchableOpacity>

          <Menu>
            <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }}>
              <Icon name="ellipsis-v" size={28} color="white" />
            </MenuTrigger>
            <MenuOptions customStyles={{
              optionsContainer: {
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 8,
                width: 150,
                elevation: 5
              }
            }}>
              <MenuOption onSelect={(ctx) => {
                ctx?.menuActions.closeMenu(); 
                navigation.navigate("UpdateUserInfo", { id : userId })
              }}>
                <Text 
                  style={{ fontSize: 16, paddingVertical: 10, fontWeight: 'bold' }}>
                  Update Profile
                </Text>
              </MenuOption>
              <View style={{ height: 1, backgroundColor: 'gray', marginVertical: 5 }} />
              <MenuOption onSelect={() => handleLogoutAccount()}>
                <Text style={{ fontSize: 16, paddingVertical: 10, fontWeight: 'bold' }}>
                  Logout
                </Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginHorizontal: 35, marginTop: 60, marginBottom: 15 }}>
        <Text style={{ fontSize: 32, fontWeight: '700', marginRight: 20 }}>Welcome!</Text>
        <Text style={{ fontSize: 32, fontWeight: '900', fontFamily: 'Poppins-ExtraBold' }}>Order Now</Text>
      </View>

      <View style={{ marginHorizontal: 25, backgroundColor: '#f9f9f9', borderRadius: 12, padding: 16, elevation: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: '800' }}>Barcode</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={{ fontSize: 15, color: '#666' }}>RS. 100 /Per Strip</Text>
          <TouchableOpacity
            style={{ backgroundColor: '#FFD700', paddingVertical: 12, borderRadius: 8, width: 80, alignItems: 'center',
             elevation: 5 }}
            onPress={() => navigation.navigate("BarcodePurchase", { id : userId })}
          >
            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Text style={{ fontSize: 20, fontWeight: '900', marginLeft: 15, marginTop: 20 }}>Please place trash outside before 6:00AM</Text> */}
      {visible && (
        <View style={{
          backgroundColor: '#D3D3D3',
          marginHorizontal: 20,
          marginTop: 40,
          padding: 15,
          borderRadius: 10,
          elevation: 10,
          position: 'relative'
        }}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{ position: 'absolute', top: 5, right: 5, zIndex: 10 }}
          >
            <Icon name="times" size={15} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '900', color: '#333' }}>
            Please place trash outside before</Text>
            <Text style={{fontWeight:'900', fontSize:25, textAlign:'center'}}>6:00 AM</Text>
        </View>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 25 }}>
        <TouchableOpacity
          style={{ backgroundColor: '#069349', width: '42%', padding: 22, borderRadius: 10, alignItems: 'center',
             elevation: 10 }}
          // onPress={() => navigation.navigate('Feedback')}
          onPress={() => navigation.navigate('Complaint', { id : userId})}
        >
          <Icon name="exclamation-circle" size={22} color="#fff" />
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginTop: 7 }}>Complaint</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ backgroundColor: '#069349', width: '42%', padding: 22, borderRadius: 10, alignItems: 'center',
             elevation: 10 }}  
          onPress = {()=>{navigation.navigate("RequestVideo", { id:userId })}}
        >
          <Icon name="video-camera" size={22} color="#fff" />
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginTop: 7 }}>Request Video</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#069349', height: 65, position: 'absolute', bottom: 0, width: '100%', elevation: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('OrderNow', { id : userId})}>
          <Icon name="home" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Support', { id : userId })}>
          <Icon name="headphones" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteAccount}>
          <Icon name="trash" size={26} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderNowScreen;



















// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, TouchableOpacity, Alert, BackHandler } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

// const OrderNowScreen = ({ navigation, route}) => {
//   const [userId, setUserId] = useState(route.params?.id || null);
//   const [profileImage, setProfileImage] = useState(null);
//   const [userRank, setUserRank] = useState("80%"); 
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     if (route.params?.id) {
//       setUserId(route.params.id);
//     }

//     const backAction = () => true;
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
//     return () => backHandler.remove();
//   }, [route.params?.id]);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (!userId) return;  

//       console.log(`Fetching user details for ID: ${userId}`);
//       try {
//         const response = await axios.get(`${global.ApiURL}/getUserById/${userId}`);
//         if (response.data) {
//           setProfileImage(response.data.profile ? `${global.ApiURL}/${response.data.profile}` : null);
//           setUserRank(response.data.rank || "N/A"); // Set rank from response
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };
    
//     if (userId) {
//       fetchUserProfile();
//     }
//   }, [userId]);

//   const handleLogoutAccount = async () => {
//     Alert.alert("Logout", "Do you want to Logout Account", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "OK",
//         onPress: () => navigation.navigate('Main', { screen: 'Getstarted' }) 
//       },
//     ]);
//   };  
  
//   const handleDeleteAccount = async () => {
//     Alert.alert("Delete Account", "Do you want to delete your account permanently?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "OK",
//         onPress: async () => {
//           try {
//             const response = await axios.post(`${global.ApiURL}deleteAccount`, { id: userId });
  
//             if (response.status === 200) {
//               await AsyncStorage.clear();
//               Alert.alert("Success", response.data.message, [
//                 { text: "OK", onPress: () => navigation.navigate('Main', { screen: 'Getstarted' })},
//               ]);
//             } else {
//               Alert.alert("Error", "Account deletion failed.");
//             }
//           } catch (error) {
//             console.error("Delete account error:", error);
//             Alert.alert("Error", "Could not connect to the server.");
//           }
//         },
//       },
//     ]);
//   };  

//   return (
//     <View style={{ flex: 1, backgroundColor: '#F8F8F2', paddingBottom: 80 }}>
//       <View style={{ backgroundColor: '#069349', flexDirection: 'row', justifyContent: 'space-between',
//          padding: 20, alignItems: 'center' }}>
//         <View style={{ position: 'absolute', left: '55%', top: 25, transform: [{ translateX: -50 }] }}>
//           <Image
//             source={profileImage ? { uri: profileImage } : require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
//             style={{ borderRadius: 50, width: 100, height: 100, resizeMode: 'cover' }}
//           />
//         </View>

//         <View style={{justifyContent:'flex-start'}}>
//           <TouchableOpacity onPress={() => {}} style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text style={{ color: '#fff', fontWeight: '900', fontSize: 18 }}>Rank: {userRank}%</Text> 
//           </TouchableOpacity>
//         </View>

//         <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '40%' }}>
//           <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('Notification', { id : userId })}>
//             <Icon name="bell" size={22} color="#fff" />
//           </TouchableOpacity>

//           <Menu>
//             <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }}>
//               <Icon name="ellipsis-v" size={28} color="white" />
//             </MenuTrigger>
//             <MenuOptions customStyles={{
//               optionsContainer: {
//                 backgroundColor: '#fff',
//                 padding: 10,
//                 borderRadius: 8,
//                 width: 150,
//                 elevation: 5
//               }
//             }}>
//               <MenuOption onSelect={(ctx) => {
//                 ctx?.menuActions.closeMenu(); 
//                 navigation.navigate("UpdateUserInfo", { id : userId })
//               }}>
//                 <Text 
//                   style={{ fontSize: 16, paddingVertical: 10, fontWeight: 'bold' }}>
//                   Update Profile
//                 </Text>
//               </MenuOption>
//               <View style={{ height: 1, backgroundColor: 'gray', marginVertical: 5 }} />
//               <MenuOption onSelect={() => handleLogoutAccount()}>
//                 <Text style={{ fontSize: 16, paddingVertical: 10, fontWeight: 'bold' }}>
//                   Logout
//                 </Text>
//               </MenuOption>
//             </MenuOptions>
//           </Menu>
//         </View>
//       </View>

//       <View style={{ flexDirection: 'row', marginHorizontal: 35, marginTop: 60, marginBottom: 15 }}>
//         <Text style={{ fontSize: 32, fontWeight: '700', marginRight: 20 }}>Welcome!</Text>
//         <Text style={{ fontSize: 32, fontWeight: '900', fontFamily: 'Poppins-ExtraBold' }}>Order Now</Text>
//       </View>

//       <View style={{ marginHorizontal: 25, backgroundColor: '#f9f9f9', borderRadius: 12, padding: 16, elevation: 10 }}>
//         <Text style={{ fontSize: 20, fontWeight: '800' }}>Barcode</Text>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
//           <Text style={{ fontSize: 15, color: '#666' }}>RS. 100 /Per Strip</Text>
//           <TouchableOpacity
//             style={{ backgroundColor: '#FFD700', paddingVertical: 12, borderRadius: 8, width: 80, alignItems: 'center',
//              elevation: 5 }}
//             onPress={() => navigation.navigate("BarcodePurchase", { id : userId })}
//           >
//             <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>Buy</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* <Text style={{ fontSize: 20, fontWeight: '900', marginLeft: 15, marginTop: 20 }}>Please place trash outside before 6:00AM</Text> */}
//       {visible && (
//         <View style={{
//           backgroundColor: '#D3D3D3',
//           marginHorizontal: 20,
//           marginTop: 40,
//           padding: 15,
//           borderRadius: 10,
//           elevation: 10,
//           position: 'relative'
//         }}>
//           <TouchableOpacity
//             onPress={() => setVisible(false)}
//             style={{ position: 'absolute', top: 5, right: 5, zIndex: 10 }}
//           >
//             <Icon name="times" size={15} color="black" />
//           </TouchableOpacity>
//           <Text style={{ fontSize: 20, fontWeight: '900', color: '#333' }}>
//             Please place trash outside before</Text>
//             <Text style={{fontWeight:'900', fontSize:25, textAlign:'center'}}>6:00 AM</Text>
//         </View>
//       )}

//       <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 25 }}>
//         <TouchableOpacity
//           style={{ backgroundColor: '#069349', width: '42%', padding: 22, borderRadius: 10, alignItems: 'center',
//              elevation: 10 }}
//           // onPress={() => navigation.navigate('Feedback')}
//           onPress={() => navigation.navigate('Complaint', { id : userId})}
//         >
//           <Icon name="exclamation-circle" size={22} color="#fff" />
//           <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginTop: 7 }}>Complaint</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={{ backgroundColor: '#069349', width: '42%', padding: 22, borderRadius: 10, alignItems: 'center',
//              elevation: 10 }}  
//           onPress = {()=>{navigation.navigate("RequestVideo", { id:userId })}}
//         >
//           <Icon name="video-camera" size={22} color="#fff" />
//           <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginTop: 7 }}>Request Video</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#069349', height: 65, position: 'absolute', bottom: 0, width: '100%', elevation: 10 }}>
//         <TouchableOpacity onPress={() => navigation.navigate('OrderNow', { id : userId})}>
//           <Icon name="home" size={26} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('Support', { id : userId })}>
//           <Icon name="headphones" size={26} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleDeleteAccount}>
//           <Icon name="trash" size={26} color="white" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default OrderNowScreen;