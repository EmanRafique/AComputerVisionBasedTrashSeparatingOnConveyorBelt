import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SelectList } from "react-native-dropdown-select-list";
import { MyBtn } from "../NavigationFile";
import axios from "axios";

const PickupDetails = ({route}) => {
  const navigation = useNavigation();
  const {id} = route.params;
  const [profileImage, setProfileImage] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zoneValue, setZoneValue] = useState("");
  const [zoneItems, setZoneItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [zoneId, setZoneId] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log("Fetching user details for ID:", id);
        const response = await fetch(`${global.ApiURL}getUserById/${id}`);
        const data = await response.json();
        console.log("API Response:", data);  
  
        if (data?.address && data?.phonenumber) {
          setAddress(data.address);
          setPhoneNumber(data.phonenumber);
        } else {
          console.error("User details not found in response.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUserDetails();
  }, []);
  

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch(`${global.ApiURL}allZones`);
        const data = await response.json();
        const zonesArray = Array.isArray(data) ? data[0] : [];
        setZoneItems(zonesArray.map(zone => ({
          label: `${zone["Start Point"]} to ${zone["End Point"]}`,
          value: `${zone["Start Point"]} to ${zone["End Point"]}`,
        })));
      } catch (error) {
        console.error("Error fetching zones:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchZones();
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

  const handleZoneSelection = async (selectedZone) => {
    setZoneValue(selectedZone);
    const [start, end] = selectedZone.split(" to ").map((item) => item.trim());
  
    try {
      const response = await fetch(`${global.ApiURL}getZoneDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ start, end }),
      });
  
      const data = await response.json();
  
      if (data?.["Zone ID"]) {  
        setZoneId(data["Zone ID"]); 
      } else {
        console.error("Zone ID not found for selected zone.");
      }
    } catch (error) {
      console.error("Error fetching zone ID:", error);
    }
  };
  
  const handleProceed = () => {
    if (!address.trim()) return Alert.alert("Error", "Address is required!");
    if (!phoneNumber.trim()) return Alert.alert("Error", "Phone number is required!");
    if (!zoneId) return Alert.alert("Error", "Please select a valid zone!");

    navigation.navigate("PickupDays", { address, phoneNumber, zoneId, id });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{ flex: 1, backgroundColor: "#F8F8F2", paddingBottom: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "#069349", alignItems: "center" }}>
          <Icon name="arrow-left" size={24} style={{ color: "#fff" }} onPress={() => navigation.goBack()} />
          <View style={{ borderRadius: 50, overflow: "hidden", marginRight: 15 }}>
            <Image 
            source={profileImage ? { uri: profileImage } : require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
            style={{ width: 50, height: 50 }} />
          </View>
        </View>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: "800", marginBottom: 20 }}>Select Pickup Location</Text>
          {userLoading ? (
            <ActivityIndicator size="large" color="#069349" />
          ) : (
            <>
              <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f9f9f9", borderRadius: 10, paddingHorizontal: 15, height: 50, elevation: 2, marginBottom: isDropdownOpen ? 160 : 15 }}>
                <Icon name="home" size={22} style={{ marginRight: 10, color: "#000" }} />
                <TextInput style={{ flex: 1, fontSize: 16, color: "#000" }} value={address} onChangeText={setAddress} placeholder="Enter your address" selectTextOnFocus />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f9f9f9", borderRadius: 10, paddingHorizontal: 15, height: 50, elevation: 2, marginBottom: 15 }}>
                <Icon name="phone" size={22} style={{ marginRight: 10, color: "#000" }} />
                <TextInput style={{ flex: 1, fontSize: 16, color: "#000" }} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Enter your phone number" keyboardType="phone-pad" selectTextOnFocus />
              </View>
              <ScrollView style={{ maxHeight: 250 }}>
                <SelectList 
                setSelected={handleZoneSelection}
                data={zoneItems} 
                placeholder="Select Zone" 
                boxStyles={{ backgroundColor: "#f9f9f9", borderRadius: 10, borderColor: "grey" }} 
                dropdownStyles={{ borderColor: "grey", width: "100%", backgroundColor: "#fff", elevation: 5,
                 maxHeight: 200 }} 
                defaultOption={zoneValue ? { label: zoneValue, value: zoneValue } : null} 
                onFocus={() => setIsDropdownOpen(true)} 
                onBlur={() => setIsDropdownOpen(false)} />
              </ScrollView>
              <MyBtn title="Proceed" style={{ marginLeft: 30, marginTop: 50 }} onPress={handleProceed} />
            </>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default PickupDetails;
