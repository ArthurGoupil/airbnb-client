import React from 'react';
import { TextInput } from 'react-native';
import s from '../style';

export default function Input({
  width,
  placeholder,
  secureTextEntry,
  autoCapitalize,
  keyboardType,
  textContentType,
  placeholderTextColor,
  onChangeText,
  value,
  textColor,
  borderColor
}) {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry ? secureTextEntry : false}
      textContentType={textContentType ? textContentType : 'none'}
      autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
      keyboardType={keyboardType ? keyboardType : 'default'}
      placeholderTextColor={
        placeholderTextColor ? placeholderTextColor : '#F7A8A1'
      }
      style={[
        s.input,
        s.is16,
        {
          color: textColor ? textColor : 'white',
          borderBottomColor: borderColor ? borderColor : 'white',
          width: width ? width : '80%',
          marginBottom: '3%'
        }
      ]}
      onChangeText={onChangeText}
      value={value}
    />
  );
}
