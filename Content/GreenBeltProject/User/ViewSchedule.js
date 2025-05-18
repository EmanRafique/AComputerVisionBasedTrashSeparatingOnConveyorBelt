import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ViewSchedule = ({ navigation, route }) => {
  const [pendingPickups, setPendingPickups] = useState([]);
  const [completedPickups, setCompletedPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);

  const userId = route.params?.id;

  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing in ViewSchedule.");
      setLoading(false);
      return;
    }

    const fetchSchedules = async () => {
      try {
        const pendingResponse = await fetch(`${global.ApiURL}/viewPendingSchedule/${userId}`);
        const pendingData = await pendingResponse.json();
        setPendingPickups(pendingData.schedule || []);

        const completedResponse = await fetch(`${global.ApiURL}/viewCompletedSchedule/${userId}`);
        const completedData = await completedResponse.json();
        setCompletedPickups(completedData.schedule || []);
      } catch (error) {
        console.error("Error fetching schedules:", error);
        setPendingPickups([]);
        setCompletedPickups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [userId]);

  const renderItem = ({ item }) => {
    const status = item.status?.trim().toLowerCase(); 
    console.log("Rendering Item Status:", status); 
    return(
    <View style={{ flexDirection: "row", padding: 10, alignItems: "center", borderBottomWidth: 1, borderColor: "#ddd" }}>
      <View style={{ flex: 2 }}>
        <Text style={{ fontSize: 16 }}>{item.pickup_address}</Text>
        <Text style={{ fontSize: 14, color: "#555", marginTop: 3 }}>{item.pickup_day}</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{
          backgroundColor: item.status === "completed" ? "#069349" : "#E74C3C",
          paddingVertical: 6,
          paddingHorizontal: 15,
          borderRadius: 10
        }}>
          <Text style={{ color: "white", fontWeight: "900", fontSize:15 }}>{item.status}</Text>
        </View>
      </View>
    </View>
  )
}

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F2" }}>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 18,
        backgroundColor: "#069349",
        alignItems: "center"
      }}>
        <Icon name="arrow-left" style={{ color: "#fff", fontSize: 24 }} onPress={() => navigation.goBack()} />

        <TouchableOpacity
          style={{ backgroundColor: "#EAEAEA", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20 }}
          onPress={() => setShowCompleted(!showCompleted)}
        >
          <Text style={{ color: "#000" }}>{showCompleted ? "Pending" : "Completed"}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", padding: 10, borderBottomWidth: 1, borderColor: "#ddd" }}>
        <Text style={{ flex: 2, fontWeight: "900", fontSize: 18 }}>Location</Text>
        <Text style={{ flex: 1, fontWeight: "900", fontSize: 18, textAlign: "center" }}>Status</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#069349" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={showCompleted ? completedPickups : pendingPickups}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default ViewSchedule;