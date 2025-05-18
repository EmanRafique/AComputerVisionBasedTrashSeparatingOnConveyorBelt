import React, { useState } from 'react';
import { FlatList, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-paper';

const DelEmpfromList = () => {
  const initialEmployeeData = [
    { ID: 1, Name: 'Eman', Age: 21, City: 'Rawalpindi' },
    { ID: 2, Name: 'Quresha', Age: 20, City: 'Islamabad' },
    { ID: 3, Name: 'Aiman', Age: 22, City: 'Attock' },
    { ID: 4, Name: 'Ali', Age: 19, City: 'Lahore' },
    { ID: 5, Name: 'Zeeshan', Age: 21, City: 'Rawalpindi' },
  ];

  const [employee, setEmployee] = useState(initialEmployeeData);

  const deleteEmployee = id => {
    const filterEmployee = employee.filter(val => val.ID !== id);
    setEmployee(filterEmployee);  // Update state with filtered data
    console.log(filterEmployee);
  };

  const resetData = () => {
    setEmployee(initialEmployeeData);  // Reset the employee list
  };

  // Function to show Employee ID in an Alert
  const showEmployeeID = (id) => {
    Alert.alert('Employee ID: ' + id);  // Show ID in alert
  };

  const showAllEmployees = ({ item }) => {
    return (
      <View
        style={{
          margin: 10,
          backgroundColor: 'pink',
          borderRadius: 12,
          borderWidth: 2,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, borderWidth: 1, borderRadius: 10, margin: 5 }}>
            <View>
              <Text style={{ fontSize: 20, textAlign: 'center' }}>
                NAME: {item.Name}
              </Text>
              <Text style={{ fontSize: 20, textAlign: 'center' }}>
                AGE: {item.Age}
              </Text>
              <Text style={{ fontSize: 20, textAlign: 'center' }}>
                CITY: {item.City}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, borderWidth: 1, borderRadius: 10, margin: 5 }}>
            <Button
              labelStyle={{ fontSize: 20 }}
              style={{ borderRadius: 5, margin: 5 }}
              mode="contained"
              // Trigger the alert with employee ID
              onPress={() => showEmployeeID(item.ID)}
            >Show ID</Button>

            <Button
              labelStyle={{ fontSize: 20 }}
              style={{ borderRadius: 5, margin: 5 }}
              mode="contained"
              onPress={() => deleteEmployee(item.ID)} // Delete employee
            >Delete</Button>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button
        mode="contained"
        onPress={resetData} 
        labelStyle={{ fontSize: 20 }}
        style={{ borderRadius: 4, borderWidth: 10 }}
      >Reset Data</Button>
      <FlatList
        data={employee}
        renderItem={showAllEmployees}  
        keyExtractor={item => item.ID.toString()}  
      />
    </View>
  );
};

export default DelEmpfromList;
