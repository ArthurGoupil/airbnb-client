import React, { useState, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import axios from 'axios';

import s from '../style';

import Loader from '../components/Loader';
import InputComponent from '../components/Input';
import ButtonComponent from '../components/Button';

export default function ProfileScreen({ userToken, setToken, userId, setId }) {
  // Get user data when opening screen
  const [user, setUser] = useState(null);
  // Loading state for initial screen opening
  const [isLoading, setIsLoading] = useState(true);
  // Loading state when updating
  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  // State used to know if update is done
  const [updateIsDone, setUpdateIsDone] = useState(false);
  // error message when updating
  const [errorMessage, setErrorMessage] = useState(false);

  // User data
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [description, setDescription] = useState();

  // Photo upload states
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImagePicked = useCallback(async pickerResult => {
    try {
      setUploading(true);
      if (!pickerResult.cancelled) {
        const uri = pickerResult.uri;
        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const formData = new FormData();
        formData.append('photo', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`
        });

        const uploadResult = await axios.put(
          `https://express-airbnb-api.herokuapp.com/user/upload_picture/${userId}`,
          formData,
          {
            headers: {
              Authorization: 'Bearer ' + userToken,
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        setImage(uploadResult.data.photo[0]);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setUploading(false);
    }
  });

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
      setImage(response.data.photo[0]);
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
      <View style={[s.profileImgContainer, s.alignCenter]}>
        <View style={s.alignCenter}>
          {!uploading ? (
            <Image
              source={
                user.photo.length !== 0
                  ? { uri: image.url }
                  : require('../assets/images/user-default-image.png')
              }
              style={s.profileImg}
            />
          ) : (
            <View style={[s.profileImgLoaderContainer, s.justifyCenter]}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )}
        </View>

        <TouchableOpacity
          style={s.profileImgEdit}
          onPress={() => {
            Alert.alert(
              user.photo.length === 0
                ? 'Upload your profile picture'
                : 'Edit your profile picture',
              '',
              [
                {
                  text: 'Cancel',
                  style: 'cancel'
                },
                {
                  text: 'Take a photo',
                  onPress: async () => {
                    const cameraPerm = await Permissions.askAsync(
                      Permissions.CAMERA
                    );
                    const cameraRollPerm = await Permissions.askAsync(
                      Permissions.CAMERA_ROLL
                    );
                    // If user gives access to camera and camera roll
                    if (
                      cameraPerm.status === 'granted' &&
                      cameraRollPerm.status === 'granted'
                    ) {
                      const pickerResult = await ImagePicker.launchCameraAsync({
                        allowsEditing: true,
                        aspect: [1, 1]
                      });
                      handleImagePicked(pickerResult);
                    }
                  }
                },
                {
                  text: 'Pick an image from camera roll',
                  onPress: async () => {
                    const cameraRollPerm = await Permissions.askAsync(
                      Permissions.CAMERA_ROLL
                    );
                    // If user gives access to camera roll
                    if (cameraRollPerm.status === 'granted') {
                      const pickerResult = await ImagePicker.launchImageLibraryAsync(
                        {
                          allowsEditing: true,
                          aspect: [1, 1]
                        }
                      );
                      handleImagePicked(pickerResult);
                    }
                  }
                }
              ]
            );
          }}
        >
          <MaterialIcons name={'edit'} size={25} color={'white'} />
        </TouchableOpacity>
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
