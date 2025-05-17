import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import axios from "axios";

const Notifications = ({route}) => {
  const {id} = route.params;
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([
    { id: "1", text: "your request #1234567 is placed successfully" },
    { id: "2", text: "Your Complaint 'Please pickup my trash as soon as possible' place sucessfully." },
    { id: "3", text: "Your Pickup Request is confirmed." },
    { id: "4", text: "your request #1234570 is placed successfully" },
  ]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${global.ApiURL}/getUserById/${id}`);
        if (response.data) {
          setProfileImage(response.data.profile ? `${global.ApiURL}/${response.data.profile}` : null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    
    if (id) {
      fetchUserProfile();
    }
  }, [id]);

  const handleDelete = (rowKey) => {
    const newList = notifications.filter((item) => item.id !== rowKey);
    setNotifications(newList);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#069349", paddingHorizontal: 20, paddingTop: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

        <TouchableOpacity
            onPress={() => navigation.navigate('OrderNow')}
            style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            }}
        >
            <Icon source="arrow-left" size={24} color="white"/>
        </TouchableOpacity>

        <Button
            mode="text"
            textColor="white"
            contentStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
            labelStyle={{ fontSize: 18, fontWeight:'900', }} 
            onPress={() => setNotifications([])} 
        >
            Clear All
        </Button>
    </View>

      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <Image
          source={profileImage ? { uri: profileImage } : require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      </View>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#fff",
          textAlign: "center",
          marginBottom: 15,
        }}
      >
        NOTIFICATIONS
      </Text>

      <SwipeListView
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#f1f1e6",
              paddingVertical: 12,
              paddingHorizontal: 15,
              borderRadius: 10,
              marginBottom: 10,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 2 },
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 14, textAlign: "center" }}>{item.text}</Text>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center", paddingRight: 20 }}>
            <Button 
                mode="text" 
                textColor="white"
                onPress={() => handleDelete(data.item.id)}
                >
                Delete
            </Button>

          </View>
        )}
        rightOpenValue={-100} 
      />
    </View>
  );
};

export default Notifications;
