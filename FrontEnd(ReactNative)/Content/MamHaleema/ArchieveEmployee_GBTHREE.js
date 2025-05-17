import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SelectList } from 'react-native-dropdown-select-list';

const ArchieveEmployee_GBTHREE = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [roleName, setRoleName] = useState('');
    const roles = [
        { key: '1', value: 'Driver' },
        { key: '2', value: 'Collector' },
        { key: '3', value: 'Operator' },
    ];

    const handleSignup = () => {
        if (!userName || !email || !roleName) {
            alert('Please fill in all fields.');
            return;
        }
        console.log('User signed up:', { userName, email, roleName });
    };

    const containerStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '100%',
        backgroundColor: '#e7e7e7',
    };

    const inputStyle = {
        flex: 1,
        height: 40,
        fontSize: 16,
        paddingHorizontal: 10,
        color: '#4d4d4d',
    };

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#069349',
                padding: 20,
            }}
        >
            {/* Back Button */}
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    backgroundColor: 'black',
                    padding: 10,
                    borderRadius: 50,
                    elevation: 5,
                }}
                onPress={() => navigation.goBack()}
                accessibilityLabel="Go back"
                testID="back-button"
            >
                <Icon name="arrow-left" size={20} color="white" />
            </TouchableOpacity>

            {/* Logo and Title */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                <Image
                    source={require('../assets/Images_SirNoman/garbage-collector-with-garbage-bags-3316358-2784925.png')}
                    style={{ width: 60, height: 100 }}
                />
                <Text style={{ fontSize: 60, fontWeight: '900', color: 'white', marginLeft: 10 }}>Cleany</Text>
            </View>

            {/* Input Fields */}
            <View style={{ width: '90%', marginTop: 30 }}>
                {/* Name Input */}
                <View style={containerStyle}>
                    <Icon name="user" size={20} color="#4d4d4d" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Enter Name"
                        value={userName}
                        onChangeText={setUserName}
                        style={inputStyle}
                        placeholderTextColor="#4d4d4d"
                        accessibilityLabel="Enter Name"
                        testID="name-input"
                    />
                </View>

                {/* Email Input */}
                <View style={containerStyle}>
                    <Icon name="envelope" size={20} color="#4d4d4d" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={setEmail}
                        style={inputStyle}
                        placeholderTextColor="#4d4d4d"
                        keyboardType="email-address"
                        accessibilityLabel="Enter Email"
                        testID="email-input"
                    />
                </View>

                {/* Role Selector */}
                <View style={containerStyle}>
                    <Icon name="briefcase" size={20} color="#4d4d4d" style={{ marginRight: 10 }} />
                    <SelectList
                        setSelected={setRoleName}
                        data={roles}
                        placeholder="Select Role"
                        search={false}
                        boxStyles={{
                            flex: 1,
                            backgroundColor: '#e7e7e7',
                            borderWidth: 0,
                        }}
                        inputStyles={{
                            color: '#4d4d4d',
                            fontSize: 15,
                        }}
                        dropdownStyles={{
                            backgroundColor: '#e7e7e7',
                            borderColor: 'gray',
                        }}
                        accessibilityLabel="Select Role"
                        testID="role-selector"
                    />
                </View>
            </View>

            {/* Archived Button */}
            <TouchableOpacity
                style={{
                    marginTop: 30,
                    width: '70%',
                    backgroundColor: '#333',
                    alignItems: 'center',
                    paddingVertical: 15,
                    borderRadius: 30,
                    elevation: 5,
                }}
                onPress={handleSignup}
                accessibilityLabel="Archive Employee"
                testID="archive-button"
            >
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Archived</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ArchieveEmployee_GBTHREE;
