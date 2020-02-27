import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import s from '../style';

export default function Link({ onPress, value }) {
  return (
    <TouchableOpacity style={s.link} onPress={onPress}>
      <Text style={[s.isWhite, s.is12, s.isUnderlined]}>{value}</Text>
    </TouchableOpacity>
  );
}
