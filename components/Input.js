import React from 'react';
import { TextInput } from 'react-native';
import s from '../style';

export default function Input({
  placeholder,
  secureTextEntry,
  autoCapitalize,
  keyboardType,
  textContentType,
  onChangeText,
  value
}) {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry ? secureTextEntry : false}
      textContentType={textContentType ? textContentType : 'none'}
      autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
      keyboardType={keyboardType ? keyboardType : 'default'}
      placeholderTextColor="#F7A8A1"
      style={[s.input, s.isWhite, s.is16]}
      onChangeText={onChangeText}
      value={value}
    />
  );
}
