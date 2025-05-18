import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import MapView, { Marker, Polyline, Polygon } from "react-native-maps";
import axios from "axios";

const WelcomeDriver = ({ navigation, route }) => {
  const driverid = route.params?.id;
  const [locations, setLocations] = useState([]);
  const [zoneCoordinates, setZoneCoordinates] = useState([]);
  const [driverLocation, setDriverLocation] = useState(null);
  const [driverName, setDriverName] = useState("");
  const [truckNumber, setTruckNumber] = useState("");
  const [zoneName, setZoneName] = useState("");

  // 📡 Fetch driver info
  const fetchDriverInfo = async () => {
    try {
      const res = await axios.get(`${ApiURL}/getDriverInfo/${driverid}`);
      setDriverName(res.data.driver_name);
      setTruckNumber(res.data.truck_number);
      setZoneName(res.data.zone_name);
    } catch (error) {
      console.error("❌ Error fetching driver info:", error);
    }
  };

  const fetchDriverLocation = async () => {
    try {
      const res = await axios.post(`${ApiURL}/updateDriverLatLong`, {
        driver_Id: driverid,
        lat: 33.646, // Replace with real coordinates
        lng: 73.080, // Replace with real coordinates
      });
      
      if (res.data.status === "success") {
        setDriverLocation({ latitude: 33.646, longitude: 73.080 }); // Same coordinates
        console.log("🚚 Driver location updated:", 33.646, 73.080);
      }
    } catch (error) {
      console.error("❌ Error fetching driver location:", error);
    }
  };  

  // 📍 Fetch pickup requests
  const fetchDriverRequests = async () => {
    try {
      const response = await axios.get(`${ApiURL}/fetchRequests/${driverid}`);
      const fetchedLocations = response.data.map((user, index) => ({
        id: index + 1,
        latitude: parseFloat(user.latitude),
        longitude: parseFloat(user.longitude),
        title: user.name,
        description: user.address ?? "No address",
      }));
      setLocations(fetchedLocations);
    } catch (error) {
      console.error("❌ Error fetching pickup requests:", error);
    }
  };

  // 🗺️ Fetch zone polygon
  const fetchZone = async () => {
    try {
      const res = await axios.get(`${ApiURL}/fetchZone/${driverid}`);
      const coords = res.data.zone_coordinates.map((coord) => ({
        latitude: parseFloat(coord.latitude),
        longitude: parseFloat(coord.longitude),
      }));
      setZoneCoordinates(coords);
    } catch (error) {
      console.error("❌ Error fetching zone:", error);
    }
  };

  useEffect(() => {
    fetchDriverInfo();
    fetchDriverRequests();
    fetchZone();
    fetchDriverLocation(); // get driver location on mount

    // 🔁 Update truck position every 10s
    const interval = setInterval(fetchDriverLocation, 10000);
    return () => clearInterval(interval);
  }, [driverid]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F2" }}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            backgroundColor: "#069349",
            padding: 10,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 25, color: "#F8F8F2", fontWeight: "900" }}>
              Welcome <Text style={{ fontWeight: "900" }}>{driverName}</Text>
            </Text>
            <Text style={{ color: "#F8F8F2", fontSize: 18 }}>Truck#  {truckNumber}</Text>
            <Text style={{ color: "#F8F8F2", fontSize: 18, fontWeight: 'bold' }}>{zoneName}</Text>
          </View>
          <Image
            source={require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
            style={{ width: 80, height: 80, borderRadius: 50 }}
          />
        </View>

        {/* Map View */}
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 33.646,
            longitude: 73.080,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {/* 🚚 Truck Marker */}
          {/* {driverLocation && (
            <Marker
              coordinate={driverLocation}
              title="Truck Location"
              description="Live truck location"
              // icon={require("../../assets/Images_GreenBelt/TrashTruck.png")} size={10} // 📦 your truck image here
            />
        //     <Marker coordinate={driverLocation}>
        //   <Image
        //     source={require("../../assets/Images_GreenBelt/TrashTruck.png")}
        //     style={{ width: 30, height: 30 }} // 🎯 Adjust size here
        //     resizeMode="contain"
        //   />
        // </Marker>
          )} */}

          {/* 📍 Pickup Markers */}
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
              title={loc.title}
              description={loc.description}
              pinColor="red"
            />
          ))}

          {/* 🔵 Route Line */}
          {locations.length >= 2 && (
            <Polyline
              coordinates={locations.map((loc) => ({
                latitude: loc.latitude,
                longitude: loc.longitude,
              }))}
              strokeWidth={4}
              strokeColor="blue"
            />
          )}

          {/* 🟠 Zone Polygon */}
          {zoneCoordinates.length > 0 && (
            <Polygon
              coordinates={zoneCoordinates}
              strokeColor="orange"
              fillColor="rgba(255,165,0,0.3)"
              strokeWidth={2}
            />
          )}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeDriver;