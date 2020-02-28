import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import s from '../style';

export default function Button({
  onPress,
  value,
  backgroundColor,
  textColor,
  marginBottom
}) {
  return (
    <TouchableOpacity
      style={[
        s.button,
        {
          backgroundColor: backgroundColor ? backgroundColor : 'white',
          marginBottom: marginBottom ? marginBottom : '3%'
        }
      ]}
      onPress={onPress}
    >
      <Text style={{ color: textColor ? textColor : '#F35960', fontSize: 24 }}>
        {value}
      </Text>
    </TouchableOpacity>
  );
}
