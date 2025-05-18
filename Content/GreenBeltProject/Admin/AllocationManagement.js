import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AdminHeader, MyBtn } from '../NavigationFile';

const AllocationManagement = () => {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchTruckSchedules();
  }, []);

  const fetchTruckSchedules = async () => {
    console.log('🚀 Fetching truck schedules...');
    setLoading(true);
    
    try {
      const response = await fetch(ApiURL+'showTruckAssigments');
      console.log('📥 Response received:', response.status);
  
      // Attempt to read response body even on failure
      const responseText = await response.text();
      console.log('📜 Response Text:', responseText);
  
      if (!response.ok) throw new Error('Failed to fetch truck assignments');
  
      const data = JSON.parse(responseText);
      console.log('📊 Parsed Response Data:', data);
  
      if (data.error) throw new Error(data.error);
  
      setAllocations(data.Active_Truck_Assignments || []);
      if (data.Active_Truck_Assignments.length === 0) {
        setError('No active truck assignments found.');
        console.log('⚠️ No active truck assignments found.');
      }
    } catch (err) {
      console.log('❌ Error:', err.message);
      setError(err.message);
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
      console.log('🏁 Fetching process completed.');
    }
  };  

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <AdminHeader />

      <Text
        style={{
          fontSize: 30,
          fontWeight: '900',
          textAlign: 'center',
          marginTop: 20,
          marginBottom: 20,
          color: '#069349',
        }}
      >
        Current Allocations
      </Text>

      {/* Table Header */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#f2f2f2',
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'black',
        }}
      >
        <Text style={{ flex: 1, fontWeight: '900', textAlign: 'center', fontSize: 18 }}>
          Truck
        </Text>
        <Text style={{ flex: 1, fontWeight: '900', textAlign: 'center', fontSize: 18 }}>
          Collector
        </Text>
        <Text style={{ flex: 1, fontWeight: '900', textAlign: 'center', fontSize: 18 }}>
          Driver
        </Text>
        <Text style={{ flex: 2, fontWeight: '900', textAlign: 'center', fontSize: 18 }}>
          Zone
        </Text>
      </View>

      {/* Scrollable Table Data */}
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#069349" style={{ marginTop: 20 }} />
        ) : error ? (
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</Text>
        ) : (
          <FlatList
            data={allocations}
            keyExtractor={(item, index) => `${item.ID}-${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              console.log('📝 Rendering Item:', item);
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 12,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#ccc',
                    backgroundColor: '#fff',
                  }}
                >
                  <Text style={{ flex: 1, textAlign: 'center', fontSize: 16 }}>
                    {item.Truck}
                  </Text>
                  <Text style={{ flex: 1, textAlign: 'center', fontSize: 16 }}>
                    {item.Collector_name}
                  </Text>
                  <Text style={{ flex: 1, textAlign: 'center', fontSize: 16 }}>
                    {item.Driver_name}
                  </Text>
                  <Text style={{ flex: 2, textAlign: 'center', fontSize: 16 }}>
                    {item.Zone_name}
                  </Text>
                </View>
              );
            }}
          />
        )}
      </View>

      {/* Buttons */}
      <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
        <MyBtn
          title="Allocate Staff to Truck"
          onPress={() => {
            console.log('🔀 Navigating to AllocateStaffToTruck');
            navigation.navigate('AllocateStaffToTruck');
          }}
          style={{marginLeft:20}}
        />
        <MyBtn
          title="Change Truck Staff"
          onPress={() => {
            console.log('🔄 Navigating to ChangeTruckStaff');
            navigation.navigate('ChangeTruckStaff');
          }}
          style={{ marginLeft:20, marginBottom:"20%" }}
        />
      </View>
    </View>
  );
};

export default AllocationManagement;