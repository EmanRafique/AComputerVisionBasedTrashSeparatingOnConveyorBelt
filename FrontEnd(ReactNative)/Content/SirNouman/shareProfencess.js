import React, {useState} from 'react';
import { View } from 'react-native';
import {Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import for AsyncStorage

const SharedPrefScreen = () => {
    const [students, setStudents] = useState([]);
    const saveName = async () => {
        try {
        await AsyncStorage.setItem('st_name', "eman"); // Store name as 'eman'
        console.log('Data Saved');
        } catch (error) {
        console.log(error.message);
        }
    };

    const getName = async () => {
        try {
        const name = await AsyncStorage.getItem('st_name');
        if (name) {
            console.log(name);
        } else {
            console.log("No data found.");
        }
        } catch (error) {
        console.log(error.message);
        }
    };

    const saveStudent = async () => {
        try {
        const myStudent = { name: "Eman", city: "RWP", gender: "F", age: 21 };
        await AsyncStorage.setItem('student', JSON.stringify(myStudent)); // Store student object as JSON string
        console.log("Student Saved:", myStudent.name); // Log student name after saving
        } catch (error) {
        console.log(error);
        }
    };

    const getStudent = async () => {
        try {
        const response = await AsyncStorage.getItem('student');
        if (response) {
            const student = JSON.parse(response);
            console.log("Student Name:", student.name);
        } else {
            console.log("No Data Found");
        }
        } catch (error) {
        console.log(error);
        }
    };
        const saveAllStudents = async () => {
            try {
                const newStudents = [
                    { name: "Eman", city: "RWP", gender: "F", age: 21 },
                    {name:"Rimsha", city:"ISB", gender:"F", age:22}
                ];
                await AsyncStorage.setItem('students', JSON.stringify(newStudents));
                console.log("Students saved successfully!");
                setStudents(newStudents); 
            } catch (error) {
                console.error("Error saving students:", error);
            }
        };

    const getAllStudents = async () => {
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
    <View>
      <Button title="Save Name" onPress={saveName} />
      <Button title="Save Student" onPress={saveStudent} /> {/* Call saveStudent function */}
      <Button mode="save All Students" onPress={saveAllStudents} />
      <Button title="Get Name" onPress={getName} />
      <Button title="Get Student" onPress={getStudent} />
      <Button title="Get All Students" onPress={getAllStudents}/>
    </View>
    
  );
};

export default SharedPrefScreen;

