import React from 'react';
import { View, Text, Image } from 'react-native';
import { MyBtn } from './NavigationFile';  

const Getstarted = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#069349', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 50, fontWeight: '900', textShadowColor: 'black', color: 'white', marginBottom: 5 }}>
        Cleany
      </Text>
      <Text style={{ fontSize: 20, color: 'white', marginBottom: 20 }}>
        Where Clean Meets Green
      </Text>
      <Image source={require('../assets/Images_GreenBelt/garbage-collector-with-garbage-bags-3316358-2784925.png')}
        style={{ width: 250, height: 350, marginBottom: 20 }} />
      
      <MyBtn
        title="GET STARTED"
        onPress={() => navigation.navigate('Signup')}
        style={{
          marginBottom: 20,
          height: 55,
          width: 230,
          justifyContent: 'center',
          alignItems: 'center',  
        }}
        txtStyle={{
          fontSize: 22,
          fontWeight: '900',
          textAlign: 'center',
        }}
      />

      <Text style={{ marginTop: 20, fontSize: 16, color: 'white' }}>
        Already have an Account?
        <Text
          style={{ color: 'yellow', fontWeight: 'bold', textDecorationLine: 'underline' }}
          onPress={() => navigation.navigate('Login')}>
          Sign in
        </Text>
      </Text>
    </View>
  );
};

export default Getstarted;
