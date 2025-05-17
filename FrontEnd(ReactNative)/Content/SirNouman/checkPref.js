import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import { MyBtn } from './allControllers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native-paper';

const CheckSharedPref = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');

    useEffect(() => {
        const loadCount = async () => {
            try {
                const storedCount = await AsyncStorage.getItem("count");
                if (storedCount !== null) {
                    setCount(Number(storedCount)); // Convert to number
                }
            } catch (error) {
                console.error("Error loading count:", error);
            }
        };

        const loadName = async () => {
            try {
                const storedName = await AsyncStorage.getItem("name");
                if (storedName !== null) {
                    setName(storedName); // Directly set the string value
                }
            } catch (error) {
                console.error("Error loading name:", error);
            }
        };

        loadCount();
        loadName();
    }, []);

    const setUser = async () => {
        try {
            await AsyncStorage.setItem('name', name); // Store the name directly as a string
        } catch (error) {
            console.error("Error saving name:", error);
        }
    };

    const getName = async () => {
        try {
            const storedName = await AsyncStorage.getItem('name');
            if (storedName !== null) {
                setName(storedName); // Set the retrieved name directly
            }
        } catch (error) {
            console.error("Error retrieving name:", error);
        }
    };

    const handlePref = async () => {
        try {
            const newCount = count + 1;
            setCount(newCount);
            await AsyncStorage.setItem("count", newCount.toString());
        } catch (error) {
            console.error("Error saving count:", error);
        }
    };

    return (
        <View>
            <MyBtn
                title="CHECK"
                onPress={handlePref}
                style={{ backgroundColor: 'pink' }}
                txtStyle={{ fontSize: 20, color: 'red' }}
            />

            <TextInput
                placeholder="Enter Name"
                value={name}
                onChangeText={setName}
                style={{ borderBottomWidth: 1, marginBottom: 10, padding: 5 }}
            />

            <MyBtn title="Set User" onPress={setUser} />
            <MyBtn title="Get User" onPress={getName} />

            <Text>The current count is: {count}</Text>
            <Text>The saved name is: {name}</Text>
        </View>
    );
};

export default CheckSharedPref;
