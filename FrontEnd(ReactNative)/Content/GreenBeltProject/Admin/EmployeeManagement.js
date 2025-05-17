import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const EmployeeManagement = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#069349', alignItems: 'center', justifyContent: 'center' }}>
            <ImageBackground 
                source={require('../../assets/Images_GreenBelt/garbage-collector-with-garbage-bags-3316358-2784925.png')} 
                style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.05 }} 
                resizeMode="cover" 
            />
            <TouchableOpacity
                style={{ position: 'absolute', top: 30, left: 20, padding: 10,
                    borderRadius: 50, zIndex: 10,}}
                onPress={() => navigation.navigate('Dashboard')}
                >
                <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>

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
                    <Icon name="user-plus" size={20} color="white" /> 
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
                    onPress={() => navigation.navigate('ArchiveEmployee')} 
                >
                    <Icon name="archive" size={20} color="white" /> 
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Archive Employee</Text>
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
                    <Icon name="pencil" size={20} color="white" />
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Update Info</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EmployeeManagement;
