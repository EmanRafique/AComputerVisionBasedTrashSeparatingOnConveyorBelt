import React, { useState, useEffect } from "react";
import { 
  View, 
  Image, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MyBtn } from "../NavigationFile";
import axios from "axios";

const PickupDays = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [profileImage, setProfileImage] = useState(null);
  const { address, phoneNumber, zoneId, id } = route.params || {};

  const [selectedDays, setSelectedDays] = useState({
    Monday: true,
    Tuesday: false,
    Wednesday: true,
    Thursday: false,
    Friday: true,
    Saturday: false,
    Sunday: false,
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        setUserId(id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    };

    fetchUserId();
  }, []);

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

  const toggleDay = (day) => {
    setSelectedDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const handleSubmit = async () => {
    const selectedDaysArray = Object.keys(selectedDays).filter((day) => selectedDays[day]);
    if (selectedDaysArray.length === 0) {
      Alert.alert("Error", "Please select at least one pickup day!");
      return;
    }

    if (!userId) {
      Alert.alert("Error", "User information missing. Please log in again.");
      return;
    }

    try {
      const requestBody = {
        address: address.trim(),
        phonenumber: phoneNumber.trim(),
        id: userId,
        zoneId: zoneId,
        pickupdays: selectedDaysArray,
      };

      const response = await fetch(global.ApiURL + "addPickup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Pickup scheduled successfully!");
        navigation.navigate("DonePurchase");
      } else {
        Alert.alert("Error", result.Message || "Failed to schedule pickup.");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: "#F2F2F2" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 15,
          backgroundColor: "#069349",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>
          Schedule Pickup Days
        </Text>

        <View style={{ borderRadius: 50, overflow: "hidden" }}>
          <Image
            source={profileImage ? { uri: profileImage } : require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
            style={{ width: 50, height: 50 }}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 16,
              backgroundColor: "#E0E0E0",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Days</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Select</Text>
          </View>

          {Object.keys(selectedDays).map((day) => (
            <View
              key={day}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#4A4A4A",
                  fontWeight: selectedDays[day] ? "bold" : "normal",
                }}
              >
                {day}
              </Text>

              <TouchableOpacity
                style={{
                  width: 28,
                  height: 28,
                  borderWidth: 2,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: selectedDays[day] ? "#069349" : "transparent",
                }}
                onPress={() => toggleDay(day)}
              >
                {selectedDays[day] && <Ionicons name="checkmark" size={22} color="white" />}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={{ marginBottom: 50, margin: 20, marginLeft: 35 }}>
        <MyBtn title="Proceed" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default PickupDays;
