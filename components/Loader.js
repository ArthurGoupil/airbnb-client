import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import s from '../style';

export default function ProfileScreen({ loaderColor, loaderSize }) {
  return (
    <View style={[s.flex1, s.alignCenter, s.justifyCenter]}>
      <ActivityIndicator
        size={loaderSize ? loaderSize : 'large'}
        color={loaderColor ? loaderColor : '#BBBBBB'}
      />
    </View>
  );
}
