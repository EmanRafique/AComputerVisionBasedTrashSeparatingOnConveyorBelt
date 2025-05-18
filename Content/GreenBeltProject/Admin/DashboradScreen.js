import React from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { MyBtn } from '../NavigationFile'; 
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = ({navigation}) => {
    const navigate = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: '#069349' }}>
      <ImageBackground 
        source={require('../../assets/Images_GreenBelt/garbage-collector-with-garbage-bags-3316358-2784925.png')} 
        style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.1 }} 
        resizeMode="cover" 
      />
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        <Text style={{ fontSize: 60, fontWeight: '900', color: '#F8F8F2', marginBottom: 20,
           marginTop:30 }}>Cleany</Text>
        <View style={{ width: '90%', alignItems: 'center' }}>
          {/* <MyBtn title="Pickups Management" 
          onPress={() => navigation.navigate('PickupManagement')} 
          style={{ borderRadius:5, width: '280' }} /> */}
          <MyBtn title="Employee Management" 
          onPress={() => navigation.navigate("EmployeeManagement")}
           style={{ borderRadius:5, width: '280' }} />
          <MyBtn title="Allocations Management" onPress={() => navigation.navigate('AllocationManagement')} 
          style={{ borderRadius:5, width: '280' }} />
          <MyBtn title="Barcode Management" onPress={() => navigation.navigate('BarcodeManagement')}
           style={{ borderRadius:5, width: '280' }} />
          <MyBtn title="Complaint Management" onPress={() => navigation.navigate('ComplaintManagement')} 
          style={{ borderRadius:5, width: '280' }} />
          <MyBtn title="Truck Management" onPress={() => navigation.navigate('TruckManagement')}
           style={{ borderRadius:5, width: '280' }} />
          <MyBtn title="Zone Management" onPress={() => navigation.navigate('ZoneManagement')}
           style={{ borderRadius:5, width: '280' }} />
          {/* <MyBtn title="Truck Schedules" onPress={() => navigation.navigate('TruckScheduleManagement')}
           style={{ borderRadius:5, width: '280' }} /> */}
          <MyBtn title="View Ranking" onPress={() => navigation.navigate('RankingManagement')} 
          style={{ borderRadius:5, width: '280' }} />
          <MyBtn title="Reports" onPress={() => navigation.navigate('ReportManagement')} 
          style={{ borderRadius:5, width: '280' }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;
