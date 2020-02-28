import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Image, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import axios from 'axios';

import s from '../style';

import Loader from '../components/Loader';
import InputComponent from '../components/Input';
import ButtonComponent from '../components/Button';

export default function ProfileScreen({ userToken, setToken, userId, setId }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const [updateIsDone, setUpdateIsDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [description, setDescription] = useState();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setUser(response.data);
      setUsername(response.data.username);
      setName(response.data.name);
      setEmail(response.data.email);
      setDescription(response.data.description);
      setIsLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  });

  const handleUpdate = useCallback(async () => {
    setErrorMessage(null);
    setUpdateIsLoading(true);
    const fieldIsMissing = !name || !email || !username || !description;
    try {
      if (fieldIsMissing) {
        setErrorMessage('Please fill all fields.');
      } else {
        const response = await axios.put(
          `https://express-airbnb-api.herokuapp.com/user/update/${userId}`,
          { name, email, username, description },
          {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          }
        );
        console.log(response.data);
        setUpdateIsLoading(false);
        setUpdateIsDone(true);
        setTimeout(() => setUpdateIsDone(false), 2000);
      }
    } catch (e) {
      console.log(e);
      setErrorMessage('An error occurred.');
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  return !isLoading ? (
    <KeyboardAwareScrollView style={[s.profileContainer]}>
      <View>
        {user.photo.length !== 0 ? (
          <View style={s.alignCenter}>
            <Image source={{ uri: user.photo[0].url }} style={s.profileImg} />
          </View>
        ) : (
          <View style={s.alignCenter}>
            <Image
              source={require('../assets/images/user-default-image.png')}
              style={s.profileImg}
            />
          </View>
        )}
      </View>
      <View>
        <View>
          <Text style={[s.isBold, s.isRed, s.is16]}>name </Text>
          <InputComponent
            width="100%"
            textContentType="name"
            textColor="black"
            borderColor="#F35960"
            onChangeText={text => setName(text)}
            value={name}
          />
        </View>
        <View>
          <Text style={[s.isBold, s.isRed, s.is16]}>email </Text>
          <InputComponent
            width="100%"
            keyboardType="email-address"
            textContentType="name"
            textColor="black"
            borderColor="#F35960"
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </View>
        <View>
          <Text style={[s.isBold, s.isRed, s.is16]}>username </Text>
          <InputComponent
            width="100%"
            textContentType="username"
            textColor="black"
            borderColor="#F35960"
            onChangeText={text => setUsername(text)}
            value={username}
          />
        </View>
        <View>
          <Text style={[s.isBold, s.isRed, s.is16]}>description </Text>
          <View style={s.longInputProfileScreen}>
            <TextInput
              autoCapitalize="sentences"
              multiline
              style={[s.isBlack, s.is16]}
              onChangeText={text => setDescription(text)}
              value={description}
            />
          </View>
        </View>
        <Text style={[s.is16, { color: 'red' }]}>{errorMessage}</Text>
        <View style={[s.alignCenter]}>
          {!updateIsLoading || errorMessage ? (
            updateIsDone ? (
              <Text style={[s.updateDone, s.isRed, s.is16]}>Update done.</Text>
            ) : (
              <ButtonComponent
                backgroundColor="#F7A8A1"
                textColor="white"
                value="Update"
                onPress={handleUpdate}
              />
            )
          ) : (
            <View style={s.updateDone}>
              <ActivityIndicator size="large" color="#F35960" />
            </View>
          )}
        </View>
        <View style={[s.alignCenter]}>
          <ButtonComponent
            backgroundColor="#F35960"
            textColor="white"
            value="Log out"
            onPress={() => {
              setToken(null);
              setId(null);
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  ) : (
    <Loader />
  );
}
