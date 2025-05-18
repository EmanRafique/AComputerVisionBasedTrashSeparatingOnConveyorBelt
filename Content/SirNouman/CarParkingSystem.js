import React, { useState } from 'react'; // Importing necessary React hooks
import { Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native'; // Importing UI components
import { RadioButton, Button } from 'react-native-paper'; // Importing additional UI components from react-native-paper

// Main component for the Car Parking System
const CarParkingSystem = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleNum, setVehicleNum] = useState('');
  const [type, setType] = useState('');
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  // State to manage the current filter (All/Car/Bike)
  const [filter, setFilter] = useState('All');
  const [message, setMessage] = useState('');
  const [parkedOutVehicles, setParkedOutVehicles] = useState([]);
  const [showParkedOut, setShowParkedOut] = useState(false);

  const handleParkIn = () => {
    if (!vehicleNum || !type) {
      setMessage('Please enter the vehicle number and select a type!');
      return;
    }
    
    // Add the new vehicle to the parked vehicles list
    const newVehicle = { velType: type, number: vehicleNum };
    setVehicles([...vehicles, newVehicle]);
    
    setVehicleNum('');
    setType('');
  
    setMessage(`Vehicle Number: ${vehicleNum}, Type: ${type} parked successfully!`);
  };

  const handleParkOut = (vehicleNumber) => {
    // Find the vehicle to park out
    const vehicle = vehicles.find((v) => v.number === vehicleNumber);
    if (vehicle) {
      setVehicles(vehicles.filter((v) => v.number !== vehicleNumber));
      
      setCount(count + 1);
      setPrice(price + (vehicle.velType === 'Car' ? 50 : 30)); // Cars earn 50, Bikes earn 30
    
      setParkedOutVehicles([...parkedOutVehicles, vehicle]);

      setMessage(`Vehicle Number: ${vehicleNumber} has been parked out.`);
      setShowParkedOut(false); // Ensure parked-out view is hidden
    }
  };

  // Function to handle filter selection (All/Car/Bike)
  const handleShowFilter = (filterType) => {
    setFilter(filterType);
    setMessage(''); // Clear any previous message
    setShowParkedOut(false); // Reset parked-out view
  };

  // Function to show parked-out vehicles
  const handleShowParkedOut = () => {
    setShowParkedOut(true); // Toggle parked-out view
    setMessage('Displaying parked out vehicles.'); // Set an informational message
  };

  // Filter the vehicles based on the selected filter
  const filteredVehicles = filter === 'All' ? vehicles : vehicles.filter((v) => v.velType === filter);

  return (
    <View style={{ padding: 20 }}>
      {/* Title */}
      <Text
        style={{
          backgroundColor: 'purple',fontSize: 25,color: 'white',textAlign: 'center',
          marginBottom: 20,height: 50,lineHeight: 50,}}
      >Car Parking System</Text>

      {/* Display success or error messages */}
      {message && (
        <Text style={{ color: 'green', fontSize: 16, marginBottom: 10, textAlign: 'center' }}>
          {message}
        </Text>
      )}

      {/* Input for vehicle number */}
      <TextInput
        placeholder="Vehicle Number"
        value={vehicleNum}
        onChangeText={setVehicleNum}
        style={{
          marginBottom: 20,borderBottomWidth: 2,
          padding: 10,borderColor: '#ccc',}}
      />

      {/* Radio buttons for selecting vehicle type */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <RadioButton
          value="Car"
          status={type === 'Car' ? 'checked' : 'unchecked'}
          onPress={() => setType('Car')}
        />
        <Text>Car</Text>
        <RadioButton
          value="Bike"
          status={type === 'Bike' ? 'checked' : 'unchecked'}
          onPress={() => setType('Bike')}
        />
        <Text>Bike</Text>
        <Button
          mode="contained"
          onPress={handleParkIn}
          labelStyle={{ fontSize: 15 }}
          style={{ borderRadius: 2, marginLeft: 80 }}
        > Park In</Button>
      </View>

      {/* Filter and parked-out buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
        {['All', 'Car', 'Bike'].map((item) => (
          <TouchableOpacity
            key={item}
            style={{
              backgroundColor: filter === item ? 'purple' : 'grey',
              paddingVertical: 12,paddingHorizontal: 20,
              borderRadius: 5,width: '20%',alignItems: 'center',
            }}
            onPress={() => handleShowFilter(item)}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>{item}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={{backgroundColor: 'grey',paddingVertical: 12,paddingHorizontal: 20,
            borderRadius: 5,width: '22%',alignItems: 'center',}}
          onPress={handleShowParkedOut}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Parked Out</Text>
        </TouchableOpacity>
      </View>

      {/* Display count and earnings */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }}>
        <Text style={{ fontSize: 15 }}>Total Parked In: {count}</Text>
        <Text style={{ fontSize: 15 }}>Total Earnings Rs: {price}</Text>
      </View>

      {/* Display filtered or parked-out vehicles */}
      {!showParkedOut ? (
        <FlatList
          data={filteredVehicles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{flexDirection: 'row',justifyContent: 'space-between',marginBottom: 10,
                borderBottomWidth: 1,borderColor: '#ddd',paddingBottom: 5,}}>
              <Text style={{ fontSize: 16 }}>
                {item.velType} - {item.number}
              </Text>
              <Button
                mode="text"
                onPress={() => handleParkOut(item.number)}
                labelStyle={{ color: 'purple', fontSize: 14 }}
              >Park Out</Button>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={parkedOutVehicles}
          keyExtractor={(item, index) => `out-${index}`}
          renderItem={({ item }) => (
            <View
              style={{backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
                marginBottom: 10,marginTop: 10,padding: 10,}}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.number}</Text>
              <Text style={{ fontSize: 16 }}> {item.velType}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};
export default CarParkingSystem;
