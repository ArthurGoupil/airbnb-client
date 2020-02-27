import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import axios from 'axios';

import s from '../style';

export default function AroundMeScreen() {
  const [locationIsLoading, setLocationIsLoading] = useState(true);
  const [roomsAreLoading, setRoomsAreLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [nearRooms, setNearRooms] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const getLocationAsync = useCallback(async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setErrorMessage('Location permission denied.');
    } else {
      const location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setLocation(location);
      setLocationIsLoading(false);
    }
  });

  useEffect(() => {
    try {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMessage(
          `Geo-tracking doesn't work on Android emulators. Try with an Android device !`
        );
      } else {
        getLocationAsync();
      }
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  useEffect(() => {
    const fetchNearRooms = async () => {
      try {
        const response = await axios.get(
          `https://airbnb-api.herokuapp.com/api/room/around?latitude=${latitude}&longitude=${longitude}`
        );
        setNearRooms(response.data);
        setRoomsAreLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchNearRooms();
  }, [location]);

  return !locationIsLoading && !roomsAreLoading ? (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{
        flex: 1
      }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2
      }}
      loadingBackgroundColor="#BBBBBB"
    >
      {nearRooms.map(room => {
        return (
          <MapView.Marker
            key={room._id}
            title={room.title}
            coordinate={{ latitude: room.loc[1], longitude: room.loc[0] }}
          />
        );
      })}
    </MapView>
  ) : (
    <View style={[s.flex1, s.alignCenter, s.justifyCenter]}>
      <ActivityIndicator size="large" color="#BBBBBB" />
    </View>
  );
}
