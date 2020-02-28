import React, { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';
import axios from 'axios';

import s from '../style';

import RoomBloc from '../components/RoomBloc';
import Loader from '../components/Loader';

export default function HomeScreen() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://airbnb-api.herokuapp.com/api/room?city=paris'
      );
      setData(response.data.rooms);
      setIsLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  });

  useEffect(() => {
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
    <Loader />
  );
}
