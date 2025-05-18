import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddContact_API = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://192.168.10.9/API-WebApp_MAP2024/api/ContactUser/showAllContacts"); // Replace with your API URL
            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (name, email) => {
        Alert.alert(
            'Update Profile',
            `Are you sure you want to update "${name}'s" profile?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Update canceled'),
                    style: 'cancel',
                },
                {
                    text: 'Proceed',
                    onPress: () => navigation.navigate('UpdateContactAPI', { name, email }),
                },
            ]
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header */}
            <Text style={{fontSize:35, fontWeight:'900', marginBottom:20}}>Add Contact</Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                    backgroundColor: '#f1f1f1',
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>Name</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>Email</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>Update</Text>
            </View>

            {/* Loading Spinner */}
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : contacts.length > 0 ? (
                <ScrollView>
                    {contacts.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: 20,
                                paddingVertical: 15,
                                borderBottomWidth: 1,
                                borderBottomColor: '#ddd',
                            }}
                        >
                            <Text style={{ flex: 1, fontSize: 14 }}>{item.name}</Text>
                            <Text style={{ flex: 1, fontSize: 14 }}>{item.email}</Text>
                            <TouchableOpacity
                                onPress={() => handleEdit(item.name, item.email)}
                                style={{ flex: 1, alignItems: 'center' }}
                            >
                                <Icon name="update" size={20} color="#069349" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: '#777' }}>No contacts found.</Text>
                </View>
            )}
        </View>
    );
};

export default AddContact_API;
