import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const ComplaintStatus = ({ route }) => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [complaints, setComplaints] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = route.params; 

  useEffect(() => {
    fetchComplaints();
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

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(global.ApiURL + `showComplaintStatus/${id}`);
      const data = await response.json();

      if (response.ok) {
        setComplaints(data);
      } else {
        setError(data.message || "Failed to fetch complaints.");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#069349" }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 15, paddingTop: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ flex: 1, textAlign: "center", fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Complaint Tracking
        </Text>
        <Image 
        source={profileImage ? { uri: profileImage } : require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
        style={{ width: 50, height: 50, borderRadius: 25 }} />
      </View>

      {/* Filters */}
      <View style={{ flexDirection: "row", justifyContent: "center", backgroundColor: "#fff", paddingVertical: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        {["All", "Closed", "Review"].map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            style={{
              backgroundColor: selectedFilter === filter ? "#069349" : "#eee",
              paddingVertical: 6,
              paddingHorizontal: 16,
              borderRadius: 20,
              marginHorizontal: 5,
            }}
          >
            <Text style={{ color: selectedFilter === filter ? "#fff" : "#000", fontWeight: "bold" }}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Complaint List */}
      <ScrollView style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 15, paddingTop: 10 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#069349" />
        ) : error ? (
          <Text style={{ textAlign: "center", color: "red", marginTop: 20 }}>{error}</Text>
        ) : (
          complaints
            .filter((item) => selectedFilter === "All" || item.status.toLowerCase() === selectedFilter.toLowerCase())
            .map((complaint, index) => (
              <View key={index} style={{ backgroundColor: "#f9f9f9", padding: 15, borderRadius: 8, marginVertical: 5, elevation: 2 }}>
                {/* Ticket Number and Status Row */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>
                    Ticket No. <Text style={{ fontWeight: "900" }}>{complaint.ticket_number}</Text>
                  </Text>
                  <Text
                    style={{
                      backgroundColor: complaint.status === "closed" ? "#069349" : "#E74C3C",
                      color: "#fff",
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 5,
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    {/* {complaint.status} */}
                    {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                  </Text>
                </View>

                {/* Complaint Reason */}
                <Text style={{ fontSize: 18, color: "#555", marginTop: 8 }}>{complaint.complaint_reason}</Text>

                {/* Date */}
                <Text style={{ fontSize: 14, color: "#888", marginTop: 5 }}>
                  Complaint Date: {complaint.complaint_date}
                </Text>

                {/* View Details Button */}
                <View style={{ alignItems: "flex-end" }}>
                <Button
                  mode="text"
                  onPress={() => {
                    console.log("Navigating with ticket_number:", complaint.ticket_number); // Debugging
                    if (complaint.ticket_number) {
                      navigation.navigate("ComplaintDetails", { ticket_number: complaint.ticket_number, id });
                    } else {
                      console.warn("Error: Ticket Number is missing!");
                    }
                  }}
                >
                  Details &gt;&gt;
                </Button>

                </View>
              </View>
            ))
        )}
      </ScrollView>
    </View>
  );
};

export default ComplaintStatus;