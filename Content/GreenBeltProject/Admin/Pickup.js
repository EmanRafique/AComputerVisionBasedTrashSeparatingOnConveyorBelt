import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const dummyData = [
  { id: 1, username: "Ali", location: "House no 147, Street no 7, Defence Colony, Rawalpindi", day: "Monday", status: "Pending" },
  { id: 2, username: "Ahmad", location: "House no 197, A street no 9, Dhok Babu", day: "Tuesday", status: "Pending" },
  { id: 3, username: "Usman", location: "House no 28C, Street no 6D, Kalli Tarik", day: "Wednesday", status: "Pending" },
  { id: 4, username: "Zeeshan", location: "House no 78C, Street no 4A, G10", day: "Thursday", status: "Pending" },
  { id: 5, username: "Zahid", location: "House no 68D, Street no 7A, I10-4", day: "Wednesday", status: "Completed" },
];

const getDayName = (date) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()];
};

const PickupManagement = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showDatePicker = () => {
    setShow(true);
  };

  const selectedDay = getDayName(date);

  const filteredData = dummyData.filter(
    (item) => (selectedFilter === "All" || item.status === selectedFilter) && item.day === selectedDay
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#069349" }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 15, paddingTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ flex: 1, textAlign: "center", fontSize: 25, fontWeight: "900", color: "#fff" }}>
          Pickup Management
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center", backgroundColor: "#fff", paddingVertical: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        {["All", "Completed", "Pending"].map((filter) => (
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
        <Icon name="calendar" size={24} color="gray" onPress={showDatePicker} />
      </View>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShow(Platform.OS === "ios"); // Show picker only on iOS until confirmed
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <ScrollView style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 15, paddingTop: 10 }}>
        {filteredData.map((pickup) => (
          <View key={pickup.id} style={{ backgroundColor: "#f9f9f9", padding: 15, borderRadius: 8, marginVertical: 5, elevation: 2 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>User: {pickup.username}</Text>
              <Text
                style={{
                  backgroundColor: pickup.status === "Completed" ? "#069349" : "#E74C3C",
                  color: "#fff",
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 5,
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {pickup.status}
              </Text>
            </View>
            <Text style={{ fontSize: 16, color: "#555", marginTop: 5 }}>Location: {pickup.location}</Text>
            <Text style={{ fontSize: 14, color: "#777", marginTop: 2 }}>Day: {pickup.day}</Text>
            <View style={{ marginTop: 5, alignItems: "flex-end" }}>
              <Button mode="text" onPress={() => navigation.navigate("PickupDetails", { pickup })}>
                Details &gt;&gt;
              </Button>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PickupManagement;
