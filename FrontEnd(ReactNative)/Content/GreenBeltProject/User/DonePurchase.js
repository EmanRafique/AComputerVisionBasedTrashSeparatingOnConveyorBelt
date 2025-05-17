import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DonePurchase = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ backgroundColor: '#069349', width: '100%', height: 70, justifyContent: 'center', alignItems: 'center' }}></View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Image source={require('../../assets/Images_GreenBelt/checkMark.png')} style={{ width: 300, height: 300 }} />
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 20, fontWeight:'800' }}>
          Pickup Request is confirmed
        </Text>
        <TouchableOpacity 
          style={{ backgroundColor: '#000', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}
          onPress={() => navigation.navigate("OrderNow")}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DonePurchase;
