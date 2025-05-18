import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SelectList } from 'react-native-dropdown-select-list';

const DeleteEmployee_GBSEVEN = ({ navigation }) => {
    const [roles, setRoles] = useState(['Driver', 'Collector', 'Operator']);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [roleName, setRoleName] = useState('');

    const handleDeleteEmployee = async () => {
        if (!userName || !email || !roleName) {
            Alert.alert('Error', 'Please fill all fields before proceeding.');
            return;
        }

        try {
            const response = await fetch(url + 'Employee/deleteEmployee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userName,
                    email: email,
                    role: roleName,
                }),
            });

            const responseJson = await response.json();

            if (response.status === 200) {
                Alert.alert('Success', responseJson.message || 'Employee deleted successfully');
                navigation.navigate('EmployeeManagement');
            } else {
                Alert.alert('Error', responseJson.message || 'Failed to delete employee');
            }
        } catch (error) {
            Alert.alert('Error', 'Error removing employee: ' + error.message);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#00A651', paddingHorizontal: 20, paddingTop: 40 }}>
            <TouchableOpacity
                style={{
                    position: 'absolute', top: 30, left: 20, backgroundColor: 'black', padding: 10, 
                    borderRadius: 50, elevation: 5, zIndex: 10,
                }}
                onPress={() => navigation.navigate('EmployeeManagement')}
            >
                <Icon name="arrow-left" size={20} color="white" />
            </TouchableOpacity>

            <View style={{ alignItems: 'center', marginBottom: 20, flexDirection: 'row', marginTop: 50 }}>
                <Image
                    source={require('../assets/Images_SirNoman/garbage-collector-with-garbage-bags-3316358-2784925.png')}
                    style={{ width: 60, height: 100, marginLeft: 40 }}
                />
                <Text style={{ color: 'white', fontSize: 50, fontWeight: '900', marginTop: 10 }}>
                    Cleany</Text>
            </View>

            <View style={{ width: '100%', marginBottom: 20 }}>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f1e6', 
                    paddingHorizontal: 10, borderRadius: 8, marginVertical: 10, height: 50,
                }}>
                    <Icon name="user" size={24} color="#4d4d4d" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Enter Name"
                        value={userName}
                        onChangeText={setUserName}
                        style={{ flex: 1, color: '#000', fontSize: 16 }}
                        placeholderTextColor="#4d4d4d"
                    />
                </View>

                <View style={{
                    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f1e6',
                     paddingHorizontal: 10, borderRadius: 8, marginVertical: 10, height: 50,
                }}>
                    <Icon name="envelope" size={24} color="#4d4d4d" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={setEmail}
                        style={{ flex: 1, color: '#000', fontSize: 16 }}
                        placeholderTextColor="#4d4d4d"
                        keyboardType="email-address"
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 30,
                    marginTop: 8,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 12,
                    width: '100%',
                    backgroundColor: '#f1f1e6',
                }}>
                    <Icon name="briefcase" size={20} color="#4d4d4d" style={{ marginLeft: 2, 
                        marginRight: 10 }} />
                    <SelectList
                        setSelected={setRoleName}
                        data={roles}
                        placeholder="Select Role"
                        placeholderTextColor="#4d4d4d"
                        search={false}
                        boxStyles={{ backgroundColor: '#f1f1e6', borderWidth: 0, paddingVertical: 0}}
                        inputStyles={{ color: 'black', fontSize: 16, padding: 0 }}
                        dropdownStyles={{ backgroundColor: '#f1f1e6', borderColor: 'black' }}
                        dropdownItemStyles={{ marginVertical: 4 }}
                        dropdownTextStyles={{ color: 'black' }}
                    />
                </View>
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: '#000', paddingVertical: 15, borderRadius: 8, alignItems: 'center',
                     marginBottom: 20,
                }}
                onPress={handleDeleteEmployee}
            >
                <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DeleteEmployee_GBSEVEN;