import React, { useState, useCallback } from 'react';
import { View, Text, Image, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import { AdminHeader, MyBtn } from '../NavigationFile';

const AllocateStaffToTruck = () => {
  const navigation = useNavigation();
  const [trucks, setTrucks] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [collectors, setCollectors] = useState([]);
  const [zoneId, setZoneId] = useState(null);
  const [zoneItems, setZoneItems] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedCollector, setSelectedCollector] = useState(null);

  useFocusEffect(
    useCallback(() => {
      console.log("🟢 AllocateStaffToTruck screen focused");
      fetchTrucks();
      fetchDrivers();
      fetchCollectors();
      fetchZones();
    }, [])
  );

  const fetchTrucks = async () => {
    console.log("🛻 fetchTrucks called");
    try {
      const response = await axios.get(`${global.ApiURL}fetchAvaliableTrucks`);
      const truckData = response.data.map(item => ({
        key: item.id.toString(),
        value: item.licensenumber,
      }));
      console.log("🚛 Fetched Trucks: ", truckData);
      setTrucks(truckData);
    } catch (error) {
      console.log("❌ Error fetching trucks: ", error);
    }
  };

  const fetchDrivers = async () => {
    console.log("🧑‍✈️ fetchDrivers called");
    try {
      const response = await axios.get(`${global.ApiURL}fetchAvaliableDrivers`);
      const driverData = response.data.map(item => ({
        key: item.id.toString(),
        value: item.name,
      }));
      console.log("🛞 Fetched Drivers: ", driverData);
      setDrivers(driverData);
    } catch (error) {
      console.log("❌ Error fetching drivers: ", error);
    }
  };

  const fetchCollectors = async () => {
    console.log("👷 fetchCollectors called");
    try {
      const response = await axios.get(`${global.ApiURL}fetchAvaliableCollectors`);
      const collectorData = response.data
        .filter(item => item?.id && item?.name)
        .map(item => ({
          key: item.id.toString(),
          value: item.name,
        }));
      console.log("📦 Fetched Collectors: ", collectorData);
      setCollectors(collectorData);
    } catch (error) {
      console.log("❌ Error fetching collectors: ", error);
    }
  };

  const fetchZones = async () => {
    console.log("🌐 fetchZones called");
    try {
      const response = await fetch(`${global.ApiURL}fetchAvaliableZones`);
      const data = await response.json();
      const zonesArray = Array.isArray(data) ? data[0] : [];
      const formattedZones = zonesArray.map(zone => ({
        label: `${zone["Start Point"]} to ${zone["End Point"]}`,
        value: `${zone["Start Point"]} to ${zone["End Point"]}`,
      }));
      console.log("🌍 Fetched Zones: ", formattedZones);
      setZoneItems(formattedZones);
    } catch (error) {
      console.error("❌ Error fetching zones:", error);
    }
  };

  const handleZoneSelection = async (selectedZone) => {
    console.log("📍 Selected Zone:", selectedZone);
    setSelectedZone(selectedZone);
    const [start, end] = selectedZone.split(" to ").map(item => item.trim());

    try {
      const response = await fetch(`${global.ApiURL}getZoneDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start, end }),
      });

      const data = await response.json();
      console.log("🆔 Zone ID Response:", data);

      if (data?.["Zone ID"]) {
        setZoneId(data["Zone ID"]);
        console.log("✅ Zone ID Set:", data["Zone ID"]);
      } else {
        console.error("❌ Zone ID not found for selected zone.");
      }
    } catch (error) {
      console.error("❌ Error fetching zone ID:", error);
    }
  };

  const handleAddAllocation = async () => {
    console.log("🚀 handleAddAllocation triggered");
  
    if (!selectedTruck || !selectedDriver || !selectedCollector || !selectedZone) {
      Alert.alert("Error", "Please select all fields before submitting.");
      return;
    }
  
    const allocationData = {
      truckid: selectedTruck,
      driverid: selectedDriver,
      collectorid: selectedCollector,
      zoneid: zoneId,
    };
  
    try {
      console.log("🚀 Allocation Data:", allocationData);
      const response = await axios.post(`${global.ApiURL}addTruckAssigment`, allocationData);
  
      console.log("📦 Response from API: ", response);
  
      if (response.data && response.data.Message) {
        const message = response.data.Message;

        if (response.status === 201 && message === "Truck assignment added successfully.") {
          Alert.alert("Success", message);
          setTimeout(() => {
            console.log("✅ Navigating to AllocationManagement...");
            Alert.alert("Navigating", "We are now navigating to Allocation Management.");
            navigation.navigate("AllocationManagement");
          }, 1000);
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.Message || "An unexpected error occurred.";
      console.log("❌ Error allocating staff:", error.response || error.message);
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <AdminHeader />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <Image
          source={require('../../assets/Images_GreenBelt/TrashTruck.png')}
          style={{
            width: '100%',
            height: 120,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginVertical: 10,
          }}
        />

        <Text style={{ fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 }}>
          Add Allocations
        </Text>

        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Truck Number</Text>
        <SelectList setSelected={setSelectedTruck} data={trucks} placeholder="Select Truck" />

        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Driver Name</Text>
        <SelectList setSelected={setSelectedDriver} data={drivers} placeholder="Select Driver" />

        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Collector Name</Text>
        <SelectList setSelected={setSelectedCollector} data={collectors} placeholder="Select Collector" />

        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Zone Name</Text>
        <SelectList setSelected={handleZoneSelection} data={zoneItems} placeholder="Select Zone" />

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <MyBtn title="Add" onPress={handleAddAllocation} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AllocateStaffToTruck;

























// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, ScrollView, Alert } from 'react-native';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';
// import { SelectList } from 'react-native-dropdown-select-list';
// import { AdminHeader, MyBtn } from '../NavigationFile';

// const AllocateStaffToTruck = () => {
//   const navigation = useNavigation();
//   const [trucks, setTrucks] = useState([]);
//   const [drivers, setDrivers] = useState([]);
//   const [collectors, setCollectors] = useState([]);
//   const [zoneId, setZoneId] = useState(null);
//   const [zoneItems, setZoneItems] = useState([]);
//   const [selectedZone, setSelectedZone] = useState(null);
//   const [selectedTruck, setSelectedTruck] = useState(null);
//   const [selectedDriver, setSelectedDriver] = useState(null);
//   const [selectedCollector, setSelectedCollector] = useState(null);

//   useEffect(() => {
//     fetchTrucks();
//     fetchDrivers();
//     fetchCollectors();
//     fetchZones();
//   }, []);

//   const fetchTrucks = async () => {
//     try {
//       const response = await axios.get(`${global.ApiURL}fetchAvaliableTrucks`);
      
//       // Here we remove the filter, so it includes all trucks
//       const truckData = response.data.map(item => ({
//         key: item.id.toString(),
//         value: item.licensenumber,
//       }));
      
//       console.log("🚛 Fetched Trucks: ", truckData);
//       setTrucks(truckData);
//     } catch (error) {
//       console.log("❌ Error fetching trucks: ", error);
//     }
//   };
  
//   const fetchDrivers = async () => {
//     try {
//       const response = await axios.get(`${global.ApiURL}fetchAvaliableDrivers`);
//       const driverData = response.data.map(item => ({
//         key: item.id.toString(),
//         value: item.name,
//       }));
//       console.log("🛞 Fetched Drivers: ", driverData);
//       setDrivers(driverData);
//     } catch (error) {
//       console.log("❌ Error fetching drivers: ", error);
//     }
//   };

//   // Fetch Collectors
//   const fetchCollectors = async () => {
//     try {
//       const response = await axios.get(`${global.ApiURL}fetchAvaliableCollectors`);
//       const collectorData = response.data
//         .filter(item => item?.id && item?.name)
//         .map(item => ({
//           key: item.id.toString(),
//           value: item.name,
//         }));
//       console.log("📦 Fetched Collectors: ", collectorData);
//       setCollectors(collectorData);
//     } catch (error) {
//       console.log("❌ Error fetching collectors: ", error);
//     }
//   };

//   // Fetch Zones
//   const fetchZones = async () => {
//     try {
//       const response = await fetch(`${global.ApiURL}fetchAvaliableZones`);
//       const data = await response.json();
//       const zonesArray = Array.isArray(data) ? data[0] : [];
//       const formattedZones = zonesArray.map(zone => ({
//         label: `${zone["Start Point"]} to ${zone["End Point"]}`,
//         value: `${zone["Start Point"]} to ${zone["End Point"]}`,
//       }));
//       console.log("🌍 Fetched Zones: ", formattedZones);
//       setZoneItems(formattedZones);
//     } catch (error) {
//       console.error("❌ Error fetching zones:", error);
//     }
//   };

//   const handleZoneSelection = async (selectedZone) => {
//     console.log("📍 Selected Zone:", selectedZone);
//     setSelectedZone(selectedZone);
//     const [start, end] = selectedZone.split(" to ").map((item) => item.trim());
//     console.log("🌍 Start:", start, "End:", end);

//     try {
//       const response = await fetch(`${global.ApiURL}getZoneDetails`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ start, end }),
//       });

//       const data = await response.json();
//       console.log("🆔 Zone ID Response:", data);

//       if (data?.["Zone ID"]) {
//         setZoneId(data["Zone ID"]);
//         console.log("✅ Zone ID Set:", data["Zone ID"]);
//       } else {
//         console.error("❌ Zone ID not found for selected zone.");
//       }
//     } catch (error) {
//       console.error("❌ Error fetching zone ID:", error);
//     }
//   };

//   const handleAddAllocation = async () => {
//     console.log("🚀 handleAddAllocation triggered");
//     if (!selectedTruck || !selectedDriver || !selectedCollector || !selectedZone) {
//       Alert.alert("Error", "Please select all fields before submitting.");
//       return;
//     }
  
//     const allocationData = {
//       truckid: selectedTruck,
//       driverid: selectedDriver,
//       collectorid: selectedCollector,
//       zoneid: zoneId,
//     };
  
//     try {
//       console.log("🚀 Allocation Data:", allocationData);
//       const response = await axios.post(`${global.ApiURL}addTruckAssigment`, allocationData);
  
//       console.log("📦 Response from API: ", response);
  
//       // Check if the response contains the "Message" key and handle the different scenarios
//       if (response.data && response.data.Message) {
//         const message = response.data.Message;
  
//         // Handle specific API responses with appropriate alerts
//         if (message.includes("already assigned and active")) {
//           if (message.includes("Truck ID")) {
//             Alert.alert("Error", message); // "Truck ID is already assigned and active."
//           } else if (message.includes("Driver ID")) {
//             Alert.alert("Error", message); // "Driver ID is already assigned and active."
//           } else if (message.includes("Collector ID")) {
//             Alert.alert("Error", message); // "Collector ID is already assigned and active."
//           } else if (message.includes("Zone ID")) {
//             Alert.alert("Error", message); // "Zone ID is already assigned and active."
//           }
//         } else if (message === "Truck assignment added successfully.") {
//           Alert.alert("Success", message); // Success case: "Truck assignment added successfully."
//           setTimeout(() => {
//             console.log("Navigating to AllocationManagement...");
//             navigation.navigate("AllocationManagement"); // Navigating to the AllocationManagement screen
//           }, 1000); // Delay for 1 second
//         }        
//       }
  
//     } catch (error) {
//       const errorMessage = error.response?.data?.Message || "An unexpected error occurred.";
//       console.log("❌ Error allocating staff:", error.response || error.message);
//       Alert.alert("Error", errorMessage); // Fallback error message
//     }
//   };  
  
//   return (
//     <View style={{ flex: 1, backgroundColor: 'white' }}>
//       <AdminHeader />
//       <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
//         <Image
//           source={require('../../assets/Images_GreenBelt/TrashTruck.png')}
//           style={{
//             width: '100%',
//             height: 120,
//             resizeMode: 'contain',
//             alignSelf: 'center',
//             marginVertical: 10,
//           }}
//         />

//         <Text style={{ fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 }}>
//           Add Allocations
//         </Text>

//         <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Truck Number</Text>
//         <SelectList setSelected={setSelectedTruck} data={trucks} placeholder="Select Truck" />

//         <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Driver Name</Text>
//         <SelectList setSelected={setSelectedDriver} data={drivers} placeholder="Select Driver" />

//         <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Collector Name</Text>
//         <SelectList setSelected={setSelectedCollector} data={collectors} placeholder="Select Collector" />

//         <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Zone Name</Text>
//         <SelectList setSelected={handleZoneSelection} data={zoneItems} placeholder="Select Zone" />

//         <View style={{ marginTop: 20, alignItems: 'center' }}>
//           <MyBtn title="Add" onPress={handleAddAllocation} />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default AllocateStaffToTruck;