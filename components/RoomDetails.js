import React from 'react';
import { Image, Text, View } from 'react-native';

import RatingStars from '../components/RatingStars';

import s from '../style';

export default function RoomDetails({
  title,
  reviews,
  ratingValue,
  userPhoto,
  marginBottom
}) {
  return (
    <View
      style={[
        s.flexRow,
        s.alignCenter,
        s.spaceBetween,
        { marginBottom: marginBottom ? marginBottom : 0 }
      ]}
    >
      <View style={s.roomDetails}>
        <Text style={s.is16} numberOfLines={1}>
          {title}
        </Text>
        <View style={[s.reviewsContainer, s.flexRow, s.alignCenter]}>
          <RatingStars ratingValue={ratingValue} />
          <Text style={[s.is17, s.isGrey]}>{reviews} reviews</Text>
        </View>
      </View>
      <Image source={{ uri: userPhoto }} style={[s.roomDetailsUserImg]} />
    </View>
  );
}
