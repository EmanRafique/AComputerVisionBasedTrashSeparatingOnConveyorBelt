import axios from "axios";
import { MyHeader } from "../NavigationFile";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const ComplaintDetails = ({ route }) => {
  const { ticket_number, id } = route.params;
  console.log("Received ticket_number:", ticket_number);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [complaint, setComplaint] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, [ticket_number]);

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

      const response = await fetch(global.ApiURL + `ticketNumberDetails/${ticket_number}`);
      const data = await response.json();

      if (response.ok) {
        setComplaint(data);
      } else {
        setError(data.message || "Failed to fetch complaint details.");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#069349" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", fontSize: 18 }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FA", paddingBottom: 20 }}>
      <MyHeader userId={route.params?.id} />

      {/* Ticket Header */}
      <View style={{ backgroundColor: "#069349", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff", textAlign: "center" }}>
          Ticket# {complaint?.["Ticket Number"] || "N/A"}
        </Text>
      </View>

      {/* Ticket Details Section */}
      <View style={{ 
        backgroundColor: "#E0E0E0", 
        padding: 12, 
        marginTop: 10, 
        borderRadius: 8, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
          Ticket Details
        </Text>
        <Text style={{ fontSize: 16, color: "#555" }}>
          {complaint?.["Complaint Date"] || "N/A"} {complaint?.["Complaint Time"] || ""}
        </Text>
      </View>

      <View style={{ padding: 15 }}>
        <Text style={styles.sectionTitle}>Complaint Reason</Text>
        <Text style={styles.detailText}>{complaint?.["Complaint Reason"] || "N/A"}</Text>

        <Text style={styles.sectionTitle}>Resolution Date Time</Text>
        <Text style={styles.detailText}>{complaint?.["Estimated ResolutionDate"] || "Not yet estimated"}</Text>

        <Text style={styles.sectionTitle}>Resolution Comments</Text>
        <Text style={[styles.detailText, { fontWeight: "bold" }]}>{complaint?.["Admin Response"] || "No response yet"}</Text>

        {/* Status Row */}
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, backgroundColor: "#EAF7E9", padding: 10, borderRadius: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginRight: 10 }}>Status:</Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: complaint?.Status?.toLowerCase() === "closed" ? "#069349" : "#E74C3C",
            }}
          >
            {complaint?.Status ? complaint.Status.charAt(0).toUpperCase() + complaint.Status.slice(1) : "N/A"}
          </Text>
        </View>

        {/* <Text style={styles.sectionTitle}>Zone</Text>
        <Text style={styles.detailText}>{complaint?.Zone || "N/A"}</Text> */}
      </View>
    </View>
  );
};

const styles = {
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    color: "#333",
    borderBottomWidth: 2,
    borderBottomColor: "#069349",
    paddingBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
};

export default ComplaintDetails;
