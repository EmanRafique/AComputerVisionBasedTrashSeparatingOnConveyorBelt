import React, {useState} from 'react';
import {TextInput, View, Button, Text} from 'react-native';
import {RadioButton, Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginForm = () => {
  const [gender, setGender] = useState('male'); // To select gender
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Remember me checkbox

  const handleLogin = () => {
    console.warn('Login successful');
    console.log({email, password, gender, rememberMe});
  };

  return (
    <View style={{padding: 20}}>
      {/* Email and Password Fields */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{marginBottom: 10, borderBottomWidth: 1, padding: 10}}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{marginBottom: 20, borderBottomWidth: 1, padding: 10}}
      />

      {/* Gender Selection */}
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        <RadioButton
          status={gender === 'male' ? 'checked' : 'unchecked'}
          onPress={() => setGender('male')}
        />
        <Text>Male</Text>
        <Icon name="mars" size={20} color="blue" style={{marginLeft: 5}} />

        <RadioButton
          status={gender === 'female' ? 'checked' : 'unchecked'}
          onPress={() => setGender('female')}
        />
        <Text>Female</Text>
        <Icon name="venus" size={20} color="pink" style={{marginLeft: 5}} />
      </View>

      {/* Remember Me Checkbox */}
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        <Checkbox
          status={rememberMe ? 'checked' : 'unchecked'}
          onPress={() => setRememberMe(!rememberMe)}
        />
        <Text>Remember Me</Text>
        <Icon
          name={rememberMe ? 'check-square' : 'square'}
          size={20}
          color="green"
          style={{marginLeft: 5}}
        />
      </View>

      {/* Login Button */}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginForm;
