import React, {useState} from 'react';
import {FlatList, Text, TextInput, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {Button} from 'react-native-paper';

const AddCountryToList = () => {
  const [allCountries, addCountry] = useState([
    {key: 1, value: 'Pakistan'},
    {key: 2, value: 'Iran'},
    {key: 3, value: 'Afghanistan'},
  ]);
  const [country, setCountry] = useState('');
  const [count, setCount] = useState(4);
  const [show, setShow] = useState(false);

  const addToList = () => {
    var newCountry = {key: count, value: country};
    setCount(count + 1);
    addCountry([...allCountries, newCountry]);
    setCountry('');
  };

  const showCountries = ({item}) => {
    return (
      <Text
        style={{fontSize: 25,margin: 10,borderWidth: 1,padding: 10,borderRadius: 10,}}>
        Key= {item.key} Value={item.value}
      </Text>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'lightblue', padding: 10}}>
      <TextInput
        style={{borderWidth: 1,backgroundColor: 'white',borderRadius: 10,fontSize: 18,}}
        value={country}
        placeholder="Enter Country To Add"
        onChangeText={val => setCountry(val)}
      />
      <Button
        mode="contained"
        labelStyle={{fontSize: 20, letterSpacing: 5, fontWeight: 'bold'}}
        style={{margin: 10,width: '80%',alignSelf: 'center',}}
        onPress={addToList}>
        {' '}
        ADD COUNTRY{' '}</Button>
      <SelectList
        data={allCountries}
        placeholder="Select Country"
        setSelected={() => {}}
        search={false}
        boxStyles={{backgroundColor: 'white'}}
        save="value"
      />
      <Button
        mode="elevated"
        style={{margin: 10}}
        labelStyle={{fontSize: 20}}
        onPress={() => {
          setShow(!show);
        }}>
        {' '}
        Show/Hide Data</Button>
      {show && <FlatList data={allCountries} renderItem={showCountries} />}
    </View>
  );
};
export default AddCountryToList;
