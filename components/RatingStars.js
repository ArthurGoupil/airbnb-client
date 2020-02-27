import React from 'react';
import { View } from 'react-native';
import s from '../style';
import { Ionicons } from '@expo/vector-icons';

export default function RatingStars({ ratingValue }) {
  const ratingArr = [];
  for (let i = 0; i < 5; i++) {
    if (i < ratingValue) {
      ratingArr.push('*');
    } else {
      ratingArr.push('x');
    }
  }
  return (
    <View style={[s.ratingStarsContainer, s.flexRow, s.spaceBetween]}>
      {ratingArr.map((rating, index) => {
        if (rating === '*') {
          return (
            <Ionicons key={index} name={'ios-star'} size={20} color="#F5B304" />
          );
        } else if (rating === 'x') {
          return (
            <Ionicons key={index} name={'ios-star'} size={20} color="#BBBBBB" />
          );
        }
      })}
    </View>
  );
}
