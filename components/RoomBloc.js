import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import s from '../style';

import RoomDetails from '../components/RoomDetails';
import RenderImage from '../components/RenderImage';

export default function RoomBloc({
  photos,
  title,
  user,
  price,
  ratingValue,
  reviews,
  _id
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        navigation.navigate('Room', { roomId: _id });
      }}
    >
      <View style={[s.roomBloc]}>
        <View style={s.roomBlocImgContainer}>
          <RenderImage
            source={{
              uri: photos[0]
            }}
            height={240}
            imgStyle={{ width: '100%', height: 240 }}
            containerMgnBottom={10}
          />
          <View style={s.roomBlocPriceContainer}>
            <Text style={[s.isWhite, s.is18]}>{price}&nbsp;€</Text>
          </View>
        </View>
        <RoomDetails
          title={title}
          reviews={reviews}
          ratingValue={ratingValue}
          userPhoto={user.account.photos[0]}
        />
      </View>
    </TouchableOpacity>
  );
}
