import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { AdminHeader, MyBtn } from '../NavigationFile';

const AdminResponse = ({ route, navigation }) => {
    const { ticketNumber, userName, reason } = route.params || null;
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmitResponse = async () => {
        if (!responseText.trim()) {
            Alert.alert("Error", "Response cannot be empty.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${global.ApiURL}complaintResponse`, {
                ticketnumber: ticketNumber,
                ComplaintResponse: responseText
            });
            Alert.alert("Added Successfully", response.data.message);
            navigation.navigate("Dashboard");
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "Failed to submit response.");
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
            <AdminHeader />
            <View style={{ padding: 20 }}>
                
                {/* Title */}
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#333' }}>
                    Respond to Complaint
                </Text>

                {/* Complaint Details Card */}
                <View style={{
                    backgroundColor: 'white',
                    padding: 15,
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                    marginBottom: 15
                }}>
                    <Text style={{ fontSize: 20, fontWeight: '900', color: '#333' }}>User: {userName}</Text>
                    <Text style={{ fontSize: 16, color: 'gray', marginTop: 5 }}>Reason: {reason}</Text>
                </View>

                {/* Response Input */}
                <TextInput
                    style={{
                        height: 150,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        borderRadius: 16,
                        padding: 10,
                        textAlignVertical: 'top',
                        backgroundColor: '#FFF',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 2
                    }}
                    placeholder="Write your response..."
                    multiline
                    value={responseText}
                    onChangeText={setResponseText}
                />

                {/* Submit Button */}
                <View style={{ marginTop: 20 }}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#069349" />
                    ) : (
                        <MyBtn title="Submit Response"
                        onPress={handleSubmitResponse}
                        style={{marginLeft:22}} />
                    )}
                </View>
            </View>
        </View>
    );
};

export default AdminResponse;
