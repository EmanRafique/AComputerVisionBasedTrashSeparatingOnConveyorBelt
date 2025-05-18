import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

const Calculator = () => {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState(null);

  const handleOperation = operation => {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    if (isNaN(num1) || isNaN(num2)) {
      setResult('Invalid input');
      return;
    }

    let calcResult;
    switch (operation) {
      case 'add':
        calcResult = num1 + num2;
        break;
      case 'subtract':
        calcResult = num1 - num2;
        break;
      case 'multiply':
        calcResult = num1 * num2;
        break;
      case 'divide':
        calcResult = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
        break;
      default:
        return;
    }
    setResult(calcResult);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Calculator</Text>

      {/* First Number Input */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={firstNumber}
        onChangeText={setFirstNumber}
        placeholder="Enter first number"
        placeholderTextColor="#aaa"
      />

      {/* Second Number Input */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={secondNumber}
        onChangeText={setSecondNumber}
        placeholder="Enter second number"
        placeholderTextColor="#aaa"
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonRow}>
          <OperationButton label="Add" onPress={() => handleOperation('add')} />
          <OperationButton
            label="Subtract"
            onPress={() => handleOperation('subtract')}
          />
        </View>
        <View style={styles.buttonRow}>
          <OperationButton
            label="Product"
            onPress={() => handleOperation('multiply')}
          />
          <OperationButton
            label="Divide"
            onPress={() => handleOperation('divide')}
          />
        </View>
      </View>

      {/* Result Display */}
      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>Result:</Text>
        <View style={styles.resultDisplay}>
          <Text style={styles.resultText}>
            {result !== null ? result : 'No result yet'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const OperationButton = ({label, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#00796b',
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    color: '#004d40',
    backgroundColor: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00796b',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 20,
    color: '#00796b',
    marginBottom: 10,
  },
  resultDisplay: {
    borderWidth: 1,
    borderColor: '#00796b',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    color: '#004d40',
  },
});

export default Calculator;
