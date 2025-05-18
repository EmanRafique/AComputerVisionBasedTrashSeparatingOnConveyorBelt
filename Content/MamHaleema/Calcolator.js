import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Calcolator = () => {
  const [display, setDisplay] = useState('');

  const handlePress = value => {
    setDisplay(display + value);
  };

  return (
    <View style={styles.container}>
      {/* Display Screen */}
      <View style={styles.display}>
        <Text style={styles.displayText}>{display}</Text>
      </View>

      {/* Calculator Buttons */}
      <View style={styles.buttonsContainer}>
        {['1', '2', '3', '+'].map(value => (
          <Button
            key={value}
            label={value}
            onPress={() => handlePress(value)}
          />
        ))}
        {['4', '5', '6', '-'].map(value => (
          <Button
            key={value}
            label={value}
            onPress={() => handlePress(value)}
          />
        ))}
        {['7', '8', '9', '*'].map(value => (
          <Button
            key={value}
            label={value}
            onPress={() => handlePress(value)}
          />
        ))}
        {['0', 'C', '=', '/'].map(value => (
          <Button
            key={value}
            label={value}
            onPress={() =>
              value === 'C' ? setDisplay('') : handlePress(value)
            }
          />
        ))}
      </View>
    </View>
  );
};

const Button = ({label, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  display: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  displayText: {
    fontSize: 32,
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4CAF50',
    margin: 5,
    borderRadius: 5,
    width: '22%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default Calcolator;
