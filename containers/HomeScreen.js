import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import axios from 'axios';

import s from '../style';

import RoomBloc from '../components/RoomBloc';

export default function HomeScreen() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://airbnb-api.herokuapp.com/api/room?city=paris'
        );
        setData(response.data.rooms);
        setIsLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  return !isLoading ? (
    <FlatList
      style={s.homeScreenScrollView}
      data={data}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <RoomBloc {...item} />}
    />
  ) : (
    <View style={[s.flex1, s.alignCenter, s.justifyCenter]}>
      <ActivityIndicator size="large" color="#BBBBBB" />
    </View>
  );
}
