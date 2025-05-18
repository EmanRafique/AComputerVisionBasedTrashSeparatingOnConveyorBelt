import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UpdateContact_API = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');

    const validateInputs = () => {
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !dob.trim()) {
            Alert.alert('Validation Error', 'All fields are required!');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Validation Error', 'Please enter a valid email address!');
            return false;
        }
        return true;
    };

    const handleUpdate = async () => {
        if (!validateInputs()) return;

        try {
            const response = await fetch(url+'updateContactByEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, dob }),
            });

            const result = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'Your details have been successfully updated!');
                navigation.goBack(); // Navigate back to the previous screen
            } else {
                Alert.alert('Error', result.message || 'Failed to update details.');
            }
        } catch (error) {
            console.error('Error updating contact:', error);
            Alert.alert('Error', 'An error occurred. Please try again later.');
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20, backgroundColor: '#069349' }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#069349' }}>
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
                <Text style={{ flex: 1, fontSize: 20, color: 'white', fontWeight: 'bold' }}>Update Details</Text>
            </View>

            {/* Input Fields */}
            <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                {/* First Name */}
                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#4d4d4d" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Enter First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        style={styles.input}
                        placeholderTextColor="#7d7d7d"
                    />
                </View>

                {/* Last Name */}
                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#4d4d4d" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        style={styles.input}
                        placeholderTextColor="#7d7d7d"
                    />
                </View>

                {/* Email */}
                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={20} color="#4d4d4d" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        placeholderTextColor="#7d7d7d"
                    />
                </View>

                {/* Date of Birth */}
                <View style={styles.inputContainer}>
                    <Icon name="calendar" size={20} color="#4d4d4d" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Enter Date of Birth (YYYY-MM-DD)"
                        value={dob}
                        onChangeText={setDob}
                        style={styles.input}
                        placeholderTextColor="#7d7d7d"
                    />
                </View>
            </View>

            {/* Update Button */}
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = {
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#f1f1e6',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    updateButton: {
        marginVertical: 30,
        paddingVertical: 15,
        borderRadius: 30,
        backgroundColor: '#000',
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
};

export default UpdateContact_API;
