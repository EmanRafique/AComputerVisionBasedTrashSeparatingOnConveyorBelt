import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentStorage = () => {
    const [students, setStudents] = useState([]);

    const saveStudents = async () => {
        try {
            const newStudents = [
                { name: "Eman", city: "RWP", gender: "F", age: 21 },
                { name: "Ali", city: "LHR", gender: "M", age: 22 },
                { name: "Sara", city: "KHI", gender: "F", age: 20 },
                {name:"Mahnoor", city:"RWP", gender:"F", age:20},
                {name:"Laiba", city:"LHR", gender:"F", age:21},
                {name:"Rimsha", city:"ISB", gender:"F", age:22}
            ];
            await AsyncStorage.setItem('students', JSON.stringify(newStudents));
            console.log("Students saved successfully!");
            setStudents(newStudents); 
        } catch (error) {
            console.error("Error saving students:", error);
        }
    };

    const getStudents = async () => {
        try {
            const storedStudents = await AsyncStorage.getItem('students');
            if (storedStudents) {
                const parsedStudents = JSON.parse(storedStudents);
                setStudents(parsedStudents);
                console.log("Students retrieved successfully:", parsedStudents);
            } else {
                console.log("No students data found.");
                setStudents([]); 
            }
        } catch (error) {
            console.error("Error getting students:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={saveStudents} style={styles.button}>Save All Students</Button>
                <Button mode="contained" onPress={getStudents} style={styles.button}>Get All Students</Button>
            </View>

            <View style={styles.displayContainer}>
                {students.length > 0 ? (
                    students.map((student, index) => (
                        <View key={index} style={styles.studentCard}>
                            <Text style={styles.studentText}>Name: {student.name}</Text>
                            <Text style={styles.studentText}>City: {student.city}</Text>
                            <Text style={styles.studentText}>Gender: {student.gender}</Text>
                            <Text style={styles.studentText}>Age: {student.age}</Text>
                        </View>
                    ))
                ) : (
                    <Text>No students to display.</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    button: {
        marginBottom: 10,
        minWidth: '45%',
    },
    displayContainer: {
        flex: 1,
        alignItems: 'center',
    },
    studentCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 3,
        width: '90%',
    },
    studentText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default StudentStorage;