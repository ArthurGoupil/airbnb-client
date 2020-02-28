import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Text,
  View
} from 'react-native';
import axios from 'axios';

import InputComponent from '../components/Input';
import ButtonComponent from '../components/Button';
import LinkComponent from '../components/Link';

import s from '../style';

export default function SignInScreen({ setToken, setId }) {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignin = useCallback(async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://express-airbnb-api.herokuapp.com/user/log_in',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setToken(response.data.token);
      setId(response.data.id);
      setIsLoading(false);
    } catch (e) {
      console.log(e.message);
      setErrorMessage('Wrong email or password.');
    }
  });

  return (
    <View style={[s.constants, s.bgIsRed, s.flex1]}>
      <KeyboardAvoidingView
        behavior="padding"
        style={[s.flex1, s.alignCenter, s.spaceAround]}
      >
        <View>
          <Image
            style={s.logo}
            source={require('../assets/images/logo-airbnb-mini-white.png')}
          />
        </View>
        <View
          style={[
            s.signinInputContainer,
            s.isFull,
            s.alignCenter,
            s.spaceBetween
          ]}
        >
          <InputComponent
            placeholder="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <InputComponent
            placeholder="password"
            secureTextEntry={true}
            textContentType="password"
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <Text style={[s.isWhite, s.is16]}>{errorMessage}</Text>
        </View>
        <View style={[s.signinActionsContainer, s.alignCenter, s.spaceBetween]}>
          {!isLoading || errorMessage ? (
            <ButtonComponent value="Sign in" onPress={handleSignin} />
          ) : (
            <ActivityIndicator size="large" color="white" />
          )}
          <LinkComponent
            value="No account yet ? Sign up"
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
