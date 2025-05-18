import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EmployeeManagement_GBONE = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#069349', alignItems: 'center', justifyContent: 'center' }}>
            <ImageBackground 
                source={require('../assets/Images_SirNoman/garbage-collector-with-garbage-bags-3316358-2784925.png')} 
                style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.05 }} 
                resizeMode="cover" 
            />

            <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%', gap: 15 }}>

                <TouchableOpacity
                    style={{
                        backgroundColor: 'black',
                        paddingVertical: 15,
                        width: '70%',
                        borderRadius: 20,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: 10,
                    }}
                    onPress={() => navigation.navigate('AddEmployee')} 
                >
                    <Icon name="person" size={20} color="white" /> 
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Add Employee</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: 'black',
                        paddingVertical: 15,
                        width: '70%',
                        borderRadius: 20,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: 10,
                    }}
                    onPress={() => navigation.navigate('DeleteEmployee')} 
                >
                    <Icon name="delete" size={20} color="white" /> 
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Delete Account</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: 'black',
                        paddingVertical: 15,
                        width: '70%',
                        borderRadius: 20,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: 10,
                    }}
                    onPress={() => navigation.navigate('UpdateInfo')}
                >
                    <Icon name="edit" size={20} color="white" />
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Update Info</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EmployeeManagement_GBONE;
