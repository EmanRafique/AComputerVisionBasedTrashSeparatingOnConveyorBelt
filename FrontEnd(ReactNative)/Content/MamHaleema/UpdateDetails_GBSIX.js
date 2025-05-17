import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const UpdateDetails = ({ route, navigation }) => {
    const { id, name } = route.params; 
    const [userName, setUserName] = useState(name);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [phonenumber, setPhoneNumber] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);

    const handleImagePick = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                maxWidth: 1024,
                maxHeight: 1024,
                quality: 1,
            },
            (response) => {
                if (response.didCancel) {
                    Alert.alert('Image selection was cancelled');
                } else if (response.errorCode) {
                    Alert.alert('Error selecting image', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                    setProfilePicture(response.assets[0].uri);
                }
            }
        );
    };

    const handleUpdate = async () => {
        const formData = new FormData();

        formData.append('id', id);
        formData.append('name', userName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phoneNo', phonenumber);

        if (profilePicture) {
            formData.append('imagePath', {
                uri: profilePicture,
                type: 'image/jpeg', 
                name: 'profile.jpg',
            });
        }

        try {
            const response = await axios.post(url+'Employee/updateEmployeeInfo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                Alert.alert('Profile Updated', 'Your details have been successfully updated!');
                console.log('Updated Details:', { userName, email, password, phonenumber, profilePicture });
            } else {
                Alert.alert('Update Failed', response.data || 'There was an error updating your details.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Update Failed', 'Could not update your profile. Please try again later.');
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#069349' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15, 
                paddingHorizontal: 20, backgroundColor: '#069349' }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'black',
                        padding: 10,
                        borderRadius: 50,
                        elevation: 5,
                        marginRight: 15,
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-left" size={20} color="white" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Update Details</Text>
            </View>

            <View style={{ alignItems: 'center', marginTop: 30 }}>
                <Image
                    source={profilePicture ? { uri: profilePicture } : require('../assets/Images_SirNoman/profileavatar.jpg')}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        borderWidth: 2,
                        borderColor: '#fff',
                        marginBottom: 10,
                    }}
                />
                <TouchableOpacity onPress={handleImagePick}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Change Picture</Text>
                </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1,
                     borderColor: '#dcdcdc', borderRadius: 10, paddingHorizontal: 10, marginBottom: 20,
                      backgroundColor: '#f1f1e6' }}>
                    <Icon name="user" size={20} color="#4d4d4d" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Enter Name"
                        value={userName}
                        onChangeText={setUserName}
                        style={{ flex: 1, fontSize: 16, color: '#000' }}
                        placeholderTextColor="#7d7d7d"
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1,
                     borderColor: '#dcdcdc', borderRadius: 10, paddingHorizontal: 10, marginBottom: 20,
                      backgroundColor: '#f1f1e6' }}>
                    <Icon name="envelope" size={20} color="#4d4d4d" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={setEmail}
                        style={{ flex: 1, fontSize: 16, color: '#000' }}
                        placeholderTextColor="#7d7d7d"
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, 
                    borderColor: '#dcdcdc', borderRadius: 10, paddingHorizontal: 10, marginBottom: 20, 
                    backgroundColor: '#f1f1e6' }}>
                    <Icon name="phone" size={20} color="#4d4d4d" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Enter Phone Number"
                        value={phonenumber}
                        keyboardType="numeric"
                        onChangeText={setPhoneNumber}
                        style={{ flex: 1, fontSize: 16, color: '#000' }}
                        placeholderTextColor="#7d7d7d"
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1,
                     borderColor: '#dcdcdc', borderRadius: 10, paddingHorizontal: 10,
                      backgroundColor: '#f1f1e6' }}>
                    <Icon name="lock" size={20} color="#4d4d4d" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={setPassword}
                        style={{ flex: 1, fontSize: 16, color: '#000' }}
                        placeholderTextColor="#7d7d7d"
                        secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="#4d4d4d" />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                style={{
                    marginVertical: 30,
                    paddingVertical: 15,
                    borderRadius: 30,
                    backgroundColor: '#000',
                    alignItems: 'center',
                    width: '70%',
                    alignSelf: 'center',
                }}
                onPress={handleUpdate}
            >
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Update</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default UpdateDetails;
