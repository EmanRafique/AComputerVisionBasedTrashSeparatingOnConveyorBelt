import React, {useState} from 'react';
import {StyleSheet,Text,TextInput,View,} from 'react-native';
import {Button, Checkbox, RadioButton} from 'react-native-paper';
const AddUsers = () => {
  const [gender, setGender] = useState('female');
  const [id, setID] = useState('');
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [status, setStatus] = useState(false);
  const [marital, setMarital] = useState(true);
  const [graduate, setGraduate] = useState(true);
  const [arrayUsers, setAllUsers] = useState([]);
  const saveData = () => {
    if (password != cPassword) {
      console.warn('Password Not Same/Mathced');
      return;
    }
    if (!password || !cPassword) {
      console.warn('Please Enter Password/Confirm Password');
      return;
    }
    var user = {
      id: id,   name: name,   email: email,   password: password,   gender: gender,
      status: status,   marital: marital,   graduate: graduate,};
    setAllUsers([...arrayUsers, user]);
    setCount(count + 1);
    console.log(arrayUsers);
  };
  return (
    <View style={{flex: 1}}>
      <View style={ss.header}>
        <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>
          Total Users:
        </Text>
        <Text style={{color: 'yellow', fontSize: 22, fontWeight: 'bold'}}>
          {count}{' '}
        </Text>
      </View>
      <TextInput placeholder="ID" onChangeText={setID} style={ss.textInput} />
      <TextInput
        placeholder="Name"
        onChangeText={setName}
        style={ss.textInput}
      />
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        style={ss.textInput}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        style={ss.textInput}
      />
      <TextInput
        placeholder="Confirm Password"
        onChangeText={setCPassword}
        style={ss.textInput}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <RadioButton
          onPress={() => setGender('male')}
          status={gender == 'male' ? 'checked' : 'unchecked'}
        />
        <Text style={{fontSize: 22}}>Male</Text>
        <RadioButton
          onPress={() => setGender('female')}
          status={gender == 'female' ? 'checked' : 'unchecked'}></RadioButton>
        <Text style={{fontSize: 22}}>FeMale</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <RadioButton
          onPress={() => setStatus(true)}
          status={status ? 'checked' : 'unchecked'}></RadioButton>
        <Text style={{fontSize: 22}}>Active</Text>
        <RadioButton
          onPress={() => setStatus(false)}
          status={status ? 'unchecked' : 'checked'}></RadioButton>
        <Text style={{fontSize: 22}}>InActive</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox
          onPress={() => {
            setMarital(!marital);
          }}
          status={marital ? 'checked' : 'unchecked'}
        />
        <Text style={{fontSize: 22}}>Married</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox
          status={graduate ? 'checked' : 'unchecked'}
          onPress={() => setGraduate(!graduate)}
        />
        <Text style={{fontSize: 22}}>Graduated</Text>
      </View>
      <Button
        onPress={saveData}
        mode="contained"
        rippleColor="yellow"
        uppercase={true}>
        Save
      </Button>
    </View>
  );
};
const ss = StyleSheet.create({
  header: {
    backgroundColor: 'purple',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: -10,
    marginBottom: 10,
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
});
export default AddUsers;
