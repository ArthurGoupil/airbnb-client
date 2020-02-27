import React from 'react';
import { useRoute } from '@react-navigation/core';
import { Button, Text, View } from 'react-native';

export default function ProfileScreen({ setToken, user, setUser }) {
  return (
    <View>
      <Text>{user._id}</Text>
      <Button
        title="Log Out"
        onPress={() => {
          setUser(null);
          setToken(null);
        }}
      />
    </View>
  );
}
