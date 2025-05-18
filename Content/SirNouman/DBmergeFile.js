import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TextInput, View, Alert } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from 'react-native-image-picker';
import SQLite from 'react-native-sqlite-storage';

const DBmergeFile = () => {
  const [ID, setID] = useState('');
  const [name, setName] = useState('');
  const [allPersons, setAllPersons] = useState([]);
  const [myImage, setMyImage] = useState(null);
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [department, setDepartment] = useState('');

  const db = SQLite.openDatabase({ name: 'myDB.db', location: 'default' });

  // Create Employee Table
  useEffect(() => {
    db.transaction(txl => {
      txl.executeSql(
        'CREATE TABLE IF NOT EXISTS Emp(empId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, city TEXT, age INTEGER, department TEXT, Path TEXT)',
        [],
        () => console.log('Employee Table Created Successfully'),
        (e) => console.log(e.message)
      );
    });
  }, []);

  // Add Image using Image Picker
  const addImage = () => {
    const options = { mediaType: 'photo' };
    ImagePicker.launchImageLibrary(options, (response) => {
      setMyImage(response.assets[0].uri);
      Alert.alert('Image Selected', 'You have successfully selected an image!');
    });
  };

  // Insert Employee Data
  const insertEmployee = () => {
    const query = 'INSERT INTO Emp(name, city, age, department, Path) VALUES(?,?,?,?,?)';
    db.transaction(txl => {
      txl.executeSql(
        query,
        [name, city, age, department, myImage],
        () => {
          Alert.alert('Success', 'Employee data inserted successfully');
          console.log('Employee data inserted successfully');
          getAllEmployees(); // Refresh the list after insert
        },
        (e) => {
          Alert.alert('Error', e.message);
          console.log(e.message);
        }
      );
    });
  };

  // Fetch All Employees
  const getAllEmployees = () => {
    db.transaction(txl => {
      txl.executeSql(
        'SELECT * FROM Emp',
        [],
        (txl, resp) => {
          const tempAllEmployees = [];
          for (let i = 0; i < resp.rows.length; i++) {
            const emp = resp.rows.item(i);
            tempAllEmployees.push(emp);
          }
          setAllPersons(tempAllEmployees);
          Alert.alert('All Employees', 'Employees have been fetched successfully!');
        },
        (error) => {
          Alert.alert('Error', 'Error fetching employees: ' + error.message);
          console.log('Error fetching employees:', error.message);
        }
      );
    });
  };

  // Fetch Employee by ID
  const showEmployeeByID = () => {
    db.transaction(txl => {
      txl.executeSql(
        'SELECT * FROM Emp WHERE empId = ?',
        [ID],
        (txl, resp) => {
          if (resp.rows.length > 0) {
            const emp = resp.rows.item(0);
            setName(emp.name);
            setCity(emp.city);
            setAge(emp.age.toString());
            setDepartment(emp.department);
            setMyImage(emp.Path); // Set image if available
            Alert.alert('Employee Found', `Employee ID: ${emp.empId}\nName: ${emp.name}\nCity: ${emp.city}\nAge: ${emp.age}\nDepartment: ${emp.department}`);
          } else {
            Alert.alert('No Employee Found', `No employee found with ID ${ID}`);
          }
        },
        (e) => {
          Alert.alert('Error', 'Error fetching employee by ID: ' + e.message);
          console.log('Error fetching employee by ID:', e.message);
        }
      );
    });
  };

  const deleteEmployee = (id) => {
    db.transaction(txl => {
      txl.executeSql(
        'DELETE FROM Emp WHERE empId = ?',
        [id],
        () => {
          Alert.alert('Deleted', 'Employee deleted successfully');
          console.log('Employee deleted successfully');
          getAllEmployees(); // Refresh the list after delete
        },
        (e) => {
          Alert.alert('Error', e.message);
          console.log(e.message);
        }
      );
    });
  };

  const showEmployeeID = (id) => {
    Alert.alert('Employee ID:', id.toString());
  };

  const renderEmployee = ({ item }) => (
    <View style={{ margin: 10, padding: 10, borderRadius: 10, backgroundColor: '#f0f0f0' }}>
      {item.Path && <Image source={{ uri: item.Path }} style={{ width: 150, height: 150, marginBottom: 10 }} />}
      <Text>Name: {item.name}</Text>
      <Text>City: {item.city}</Text>
      <Text>Age: {item.age}</Text>
      <Text>Department: {item.department}</Text>
      <Button onPress={() => deleteEmployee(item.empId)} mode="contained" style={{ width: '80%', margin: 10, borderRadius: 10 }}>Delete</Button>
      <Button onPress={() => showEmployeeID(item.empId)} mode="contained" style={{ width: '80%', margin: 10, borderRadius: 10 }}>Show ID</Button>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
      <TextInput
        placeholder="Enter ID"
        onChangeText={setID}
        value={ID}
        style={{ borderWidth: 1, margin: 10, fontSize: 20, width: '80%', paddingLeft: 10 }}
      />
      <TextInput
        placeholder="Enter Name"
        onChangeText={setName}
        value={name}
        style={{ borderWidth: 1, margin: 10, fontSize: 20, width: '80%', paddingLeft: 10 }}
      />
      <TextInput
        placeholder="Enter City"
        onChangeText={setCity}
        value={city}
        style={{ borderWidth: 1, margin: 10, fontSize: 20, width: '80%', paddingLeft: 10 }}
      />
      <TextInput
        placeholder="Enter Age"
        onChangeText={setAge}
        value={age}
        style={{ borderWidth: 1, margin: 10, fontSize: 20, width: '80%', paddingLeft: 10 }}
      />
      <TextInput
        placeholder="Enter Department"
        onChangeText={setDepartment}
        value={department}
        style={{ borderWidth: 1, margin: 10, fontSize: 20, width: '80%', paddingLeft: 10 }}
      />
      <View style ={{flexDirection:'row'}}>
      <Button onPress={insertEmployee} mode="elevated" style={{ width: '80', margin: 10, borderRadius: 10 }}>Save</Button>
      <Button onPress={addImage} mode="elevated" style={{ width: '90', margin: 10, borderRadius: 10 }}>+ Image</Button>
      <Button onPress={showEmployeeByID} mode="elevated" style={{ width: '120', margin: 10, borderRadius: 10 }}>Show By ID</Button>
      </View>
      
      <Button onPress={getAllEmployees} mode="elevated" style={{ width: '80%', margin: 10, borderRadius: 10 }}>Show All Employees</Button>
      
      <FlatList
        data={allPersons}
        keyExtractor={(item) => item.empId.toString()}
        renderItem={renderEmployee}
      />
    </View>
  );
};

export default DBmergeFile;
