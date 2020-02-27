import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View
} from 'react-native';
import axios from 'axios';

import InputComponent from '../components/Input';
import ButtonComponent from '../components/Button';
import LinkComponent from '../components/Link';

import s from '../style';

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    setIsLoading(true);
    const fieldIsMissing =
      !email ||
      !username ||
      !name ||
      !description ||
      !password ||
      !passwordConfirm;
    try {
      if (fieldIsMissing) {
        setErrorMessage('Please fill all fields.');
      } else if (password !== passwordConfirm) {
        setErrorMessage('The two indicated passwords are differents.');
      } else {
        const response = await axios.post(
          'https://airbnb-api.herokuapp.com/api/user/sign_up',
          { email, username, name, description, password },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        setIsLoading(false);
        const userToken = response.data.token;
        setToken(userToken);
      }
    } catch (e) {
      console.log(e);
      setErrorMessage('An error occurred.');
    }
  };

  return (
    <View style={[s.constants, s.bgIsRed, s.flex1, s.spaceAround]}>
      <KeyboardAvoidingView
        behavior="padding"
        style={[s.flex1, s.alignCenter, s.spaceAround]}
      >
        <Text style={[s.isWhite, s.is28]}>Join us !</Text>
        <View
          style={[
            s.signupInputContainer,
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
            placeholder="username"
            textContentType="username"
            onChangeText={text => setUsername(text)}
            value={username}
          />
          <InputComponent
            placeholder="name"
            textContentType="name"
            onChangeText={text => setName(text)}
            value={name}
          />

          <View style={s.longInput}>
            <TextInput
              placeholder="tell us a few words about you."
              autoCapitalize="sentences"
              placeholderTextColor="#F7A8A1"
              multiline
              style={[s.isWhite, s.is16]}
              onChangeText={text => setDescription(text)}
              value={description}
            />
          </View>
          <InputComponent
            placeholder="password"
            secureTextEntry={true}
            textContentType="password"
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <InputComponent
            placeholder="password confirm"
            secureTextEntry={true}
            textContentType="password"
            onChangeText={text => setPasswordConfirm(text)}
            value={passwordConfirm}
          />
          <Text style={[s.isWhite, s.is16]}>{errorMessage}</Text>
        </View>
        <View style={[s.signinActionsContainer, s.alignCenter, s.spaceBetween]}>
          {!isLoading ? (
            <ButtonComponent value="Sign up" onPress={handleSignup} />
          ) : (
            <ActivityIndicator size="large" color="white" />
          )}
          <LinkComponent
            value="Already have an account ? Sign in"
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
