import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { MyBtn } from "../NavigationFile"; 
import axios from "axios"

const ComplaintsScreen = ({ navigation, route }) => {
  const userId = route.params?.id;
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${global.ApiURL}/getUserById/${userId}`);
        if (response.data) {
          setProfileImage(response.data.profile ? `${global.ApiURL}/${response.data.profile}` : null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const buttonContainerStyle = {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    backgroundColor: "black",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <View style={{flex: 1, backgroundColor: "#069349", alignItems: "center", paddingTop: 30,}}>      
        <Icon name="arrow-left" style={{ right : 140, color: "#fff", fontSize:24 }} onPress={() => navigation.navigate("OrderNow",{id : userId})} />

      <Image
      style={{borderRadius:150, width:110, height:110, marginTop: '20%'}}
      source={profileImage ? { uri: profileImage } : require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
      />

      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginVertical: 20 }}>
        Complaints & Services
      </Text>

      <MyBtn title="New Complaint" 
      style={{borderRadius:12}}
      onPress={() => navigation.navigate('NewComplaint', {id: userId})} />
      <MyBtn title="Complaint Status"
      style={{borderRadius:12}}
      onPress={() => navigation.navigate('ComplaintStatus', {id : userId})} />

      <TouchableOpacity style={buttonContainerStyle}
      onPress={() => navigation.navigate('NewComplaint', {id: userId})} >
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ComplaintsScreen;