import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/core';
import { ActivityIndicator, Text, View } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import axios from 'axios';

import RenderImage from '../components/RenderImage';
import RoomDetails from '../components/RoomDetails';

import s from '../style';

export default function RoomScreen() {
  const { params } = useRoute();
  const roomId = params.roomId;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [seeAllText, setSeeAllText] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://airbnb-api.herokuapp.com/api/room/${roomId}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  return !isLoading ? (
    <>
      <View>
        <ViewPager showPageIndicator={false} style={[s.viewPager]}>
          {data.photos.map((photo, index) => {
            return (
              <RenderImage
                key={index}
                source={{ uri: photo }}
                height={250}
                imgStyle={{ width: '100%', height: 250 }}
              />
            );
          })}
        </ViewPager>
      </View>
      <View style={[s.roomScreenBottom, s.flex1]}>
        <RoomDetails
          title={data.title}
          reviews={data.reviews}
          ratingValue={data.ratingValue}
          userPhoto={data.user.account.photos[0]}
          marginBottom={20}
        />
        <Text
          onPress={() => {
            setSeeAllText(!seeAllText);
          }}
          style={s.is16}
          numberOfLines={seeAllText ? 0 : 3}
        >
          {data.description}
        </Text>
        <View style={[s.flex1, s.spaceAround]}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{
              height: 200
            }}
            initialRegion={{
              latitude: data.loc[1],
              longitude: data.loc[0],
              latitudeDelta: 0.15,
              longitudeDelta: 0.15
            }}
            loadingBackgroundColor="#BBBBBB"
          >
            <MapView.Marker
              title={data.title}
              coordinate={{ latitude: data.loc[1], longitude: data.loc[0] }}
            />
          </MapView>
        </View>
      </View>
    </>
  ) : (
    <View style={[s.flex1, s.alignCenter, s.justifyCenter]}>
      <ActivityIndicator size="large" color="#BBBBBB" />
    </View>
  );
}
