import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import s from '../style';

export default function Button({ onPress, value }) {
  return (
    <TouchableOpacity style={s.button} onPress={onPress}>
      <Text style={[s.isRed, s.is24]}>{value}</Text>
    </TouchableOpacity>
  );
}
