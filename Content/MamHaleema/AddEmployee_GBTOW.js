import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SelectList } from 'react-native-dropdown-select-list';

const AddEmployee_GBTOW = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [roleName, setRoleName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [roles, setRoles] = useState(['Driver', 'Collector', 'Operator']); 

    const setData = async () => {
        if (!userName || !email || !password || !confPassword || !roleName || !phonenumber) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }
        if (password !== confPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }
    
        try {
            const response = await fetch(url+ 'Employee/addEmployee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userName,
                    email: email,
                    password: password,
                    role: roleName,
                    phoneNo: phonenumber,
                    city: 'Unknown', 
                    imagePath: null, 
                }),
            });

            const result = await response.json();
            console.log('Response:', result); 

            if (response.ok) {
                const employeeId = result.id;
    
                Alert.alert(
                    'Success',
                    'Employee added successfully, upload Image',
                    [
                        {
                            text: 'Skip', 
                            onPress: () => navigation.navigate('EmployeeManagement'),
                        },
                        {
                            text: 'Proceed', 
                            onPress: () => navigation.navigate('UploadImage', { employeeId }), 
                        },
                    ]
                );
            } else {
                Alert.alert('Error', result.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Something went wrong');
        }
    };    

    const containerStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 2,
        paddingVertical: 3,
        marginLeft: '10%',
        width: '100%',
        backgroundColor: '#f1f1e6',
    };

    const inputStyle = {
        flex: 1,
        height: 40,
        fontSize: 16,
        paddingHorizontal: 10,
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#069349' }}>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 30,
                    left: 20,
                    backgroundColor: 'black',
                    padding: 10,
                    borderRadius: 50,
                    elevation: 5, 
                    zIndex: 10, 
                }}
                onPress={() => navigation.navigate('EmployeeManagement')} 
            >
                <Icon name="arrow-left" size={20} color="white" />
            </TouchableOpacity>

            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
                }}
            >
                <Image
                    source={require('../assets/Images_SirNoman/garbage-collector-with-garbage-bags-3316358-2784925.png')}
                    style={{ width: 60, height: 100 }}
                />
                <Text
                    style={{
                        fontSize: 60,
                        fontWeight: '900',
                        color: 'white',
                        marginRight: 50,
                    }}
                >Cleany</Text>
            </View>

            <View style={{ width: '80%', marginTop: 10, marginBottom: 50 }}>
                <View style={containerStyle}>
                    <Icon name="home" size={20} color="#4d4d4d" style={{ marginLeft: 15, marginRight: 10 }} />
                    <TextInput
                        placeholder="Enter Name"
                        value={userName}
                        onChangeText={setUserName}
                        style={inputStyle}
                        placeholderTextColor="#4d4d4d"
                    />
                </View>

                <View style={containerStyle}>
                    <Icon name="envelope" size={20} color="#4d4d4d" style={{marginLeft:15,marginRight:10}}/>
                    <TextInput
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={setEmail}
                        style={inputStyle}
                        placeholderTextColor="#4d4d4d"
                    />
                </View>

                <View style={containerStyle}>
                    <Icon name="lock" size={20} color="#4d4d4d" style={{ marginLeft:15,marginRight:10}}/>
                    <TextInput
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={setPassword}
                        style={inputStyle}
                        placeholderTextColor="#4d4d4d"
                    />
                </View>


                <View style={containerStyle}>
                    <Icon name="check-circle" size={20} color="#4d4d4d" style={{ marginLeft: 15,
                         marginRight: 10 }} />
                    <TextInput
                        placeholder="Confirm Password"
                        value={confPassword}
                        onChangeText={setConfPassword}
                        style={inputStyle}
                        placeholderTextColor="#4d4d4d"
                    />
                </View>

                <View style={{flexDirection: 'row',alignItems: 'center', marginBottom: 20, borderWidth: 1,
                borderColor: 'black', borderRadius: 5, paddingHorizontal: 2, paddingVertical: 3, 
                marginLeft: '10%', width: '100%', backgroundColor: '#f1f1e6',}}>
                    <Icon name="briefcase" size={20} color="#4d4d4d" style={{ marginLeft: 20,
                         marginRight: 10 }} />
                    <SelectList
                        setSelected={setRoleName}
                        data={roles} 
                        placeholder="Select Role"
                        search={false}
                        boxStyles={{ flex: 1, backgroundColor: '#f1f1e6', borderWidth: 0 }}
                        inputStyles={{ color: 'black', fontSize: 15 }}
                        dropdownStyles={{ backgroundColor: '#f1f1e6', borderColor: 'black' }}
                    />
                </View>

                <View style={containerStyle}>
                    <Icon name="phone" size={20} color="#4d4d4d" style={{ marginLeft: 15, marginRight: 10 }} />
                    <TextInput
                        placeholder="Enter Phone Number"
                        value={phonenumber}
                        keyboardType="numeric"
                        onChangeText={setPhoneNumber}
                        style={inputStyle}
                        placeholderTextColor="#4d4d4d"
                    />
                </View>
            </View>

            <Text
                style={{
                    color: 'white',
                    textDecorationLine: 'underline',
                    marginLeft: '10%',
                    fontSize: 18,
                    marginBottom: 10,
                    marginLeft: 80,
                }}
                onPress={() => navigation.navigate('UploadImage')}
            >Click here to upload Image</Text>

            <TouchableOpacity
                style={{
                    marginBottom: 50,
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    borderRadius: 20,
                    alignItems: 'center',
                    width: '60%',
                    backgroundColor: 'black',
                    alignSelf: 'center',
                }}
                onPress={setData} 
            >
                <Text style={{ color: 'white', fontSize: 25, fontWeight: '900' }}>Done</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddEmployee_GBTOW;
