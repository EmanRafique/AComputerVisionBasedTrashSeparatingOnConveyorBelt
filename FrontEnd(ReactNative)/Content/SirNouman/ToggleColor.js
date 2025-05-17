import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Button, Checkbox, RadioButton} from 'react-native-paper';

const Toggle = () => {
  const [text, setText] = useState('Shazi');
  const [show, setShow] = useState(false);
  const [color, setColor] = useState('black');

  const changeColor = () => {
    if (color == 'black') setColor('green');
    else setColor('black');
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Text style={{fontSize: 30}}>Coloured</Text>
        <Checkbox
          onPress={changeColor}
          status={color == 'black' ? 'unchecked' : 'checked'}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Text style={{fontSize: 30}}>Show Data</Text>
        <Checkbox
          onPress={() => setShow(!show)}
          status={show == true ? 'checked' : 'unchecked'}
        />
      </View>
      <TextInput
        placeholder="Enter Text"
        onChangeText={setText}
        style={{fontSize: 30}}
      />
      <Button mode="contained" onPress={() => setShow(!show)}>
        Show/Hide
      </Button>
      {show && (
        <Text
          style={{
            fontSize: 40,
            color: color,
          }}>
          You Entered: {text}
        </Text>
      )}
    </View>
  );
};
export default Toggle;
