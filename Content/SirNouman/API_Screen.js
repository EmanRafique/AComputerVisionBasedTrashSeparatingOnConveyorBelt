import { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';

const API_Screen = () => {
    const [firstName, setFirstName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [city, setCity] = useState('');
    const [DOB, setDOB] = useState('');
    const [contactId, setContactId] = useState(''); // For GET request by ID

    const setData = async () => {
        try {
            const response = await fetch(`http://${ipApi}/API-WebApp_MAP2024/api/Contact/AddContact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName, // Ensure this variable is defined
                    phoneNo,   // Ensure this variable is defined
                    city,      // Ensure this variable is defined
                    DOB,       // Ensure this variable is defined
                }),
            });
    
            const result = await response.json();
            console.log(result);
    
            if (response.ok) {
                Alert.alert('Success', result); // Show success message from the backend
            } else {
                Alert.alert('Error', result); // Show error message from the backend
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Something went wrong');
        }
    };
    
    // Function to get data using GET method (by contact ID)
    const getDataById = async () => {
        try {
            if (!contactId) {
                Alert.alert('Error', 'Please enter a valid contact ID');
                return;
            }

            const response = await fetch(`http://192.168.10.8/API-WebApp_MAP2024/api/Contact/getContact?id=${contactId}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                // Populate the input fields with fetched data
                setFirstName(data.firstName || '');
                setCity(data.city || '');
                setDOB(data.DOB || '');
                setPhoneNo(data.phoneNo || ''); // You can also update phone number if available
                Alert.alert('Success', 'Data retrieved successfully');
            } else {
                Alert.alert('Error', 'No data found');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Something went wrong');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F5D0C5', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            {/* Input Fields */}
            <TextInput
                style={{
                    width: '100%',
                    height: 50,
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor: '#ddd',
                }}
                placeholder='Enter first name'
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={{
                    width: '100%',
                    height: 50,
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    borderWidth: 2,
                    marginTop: 15,
                    borderColor: '#ddd',
                }}
                placeholder='Enter Phone Number'
                value={phoneNo}
                onChangeText={setPhoneNo}
            />
            <TextInput
                style={{
                    width: '100%',
                    height: 50,
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    borderWidth: 2,
                    marginTop: 15,
                    borderColor: '#ddd',
                }}
                placeholder='Enter city'
                value={city}
                onChangeText={setCity}
            />
            <TextInput
                style={{
                    width: '100%',
                    height: 50,
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    borderWidth: 2,
                    marginTop: 15,
                    borderColor: '#ddd',
                }}
                placeholder='Enter date of birth'
                value={DOB}
                onChangeText={setDOB}
            />
            <TextInput
                style={{
                    width: '100%',
                    height: 50,
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    borderWidth: 2,
                    marginTop: 15,
                    borderColor: '#ddd',
                }}
                placeholder='Enter contact ID to fetch data'
                value={contactId}
                onChangeText={setContactId}
            />

            {/* Buttons */}
            <Button mode='contained' style={{ marginTop: 20 }} onPress={setData}>
                Set Data
            </Button>
            <Button mode="contained" style={{ marginTop: 10 }} onPress={getDataById}>
                Get data by contact ID
            </Button>
        </View>
    );
};

export default API_Screen;
