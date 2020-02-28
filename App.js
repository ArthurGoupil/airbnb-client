import React, { useState, useEffect, useCallback } from 'react';
import { AsyncStorage, StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './containers/HomeScreen';
import ProfileScreen from './containers/ProfileScreen';
import SignInScreen from './containers/SignInScreen';
import SignUpScreen from './containers/SignUpScreen';
import RoomScreen from './containers/RoomScreen';
import AroundMeScreen from './containers/AroundMeScreen';

import s from './style';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const mainRed = '#F35960';

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setToken = async token => {
    if (token) {
      AsyncStorage.setItem('userToken', token);
    } else {
      AsyncStorage.removeItem('userToken');
    }
    setUserToken(token);
  };
  const setId = async id => {
    if (id) {
      AsyncStorage.setItem('userId', id);
    } else {
      AsyncStorage.removeItem('userId');
    }
    setUserId(id);
  };

  const fetchTokenAndUserId = useCallback(async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');
      setIsLoading(false);
      setUserToken(userToken);
      setUserId(userId);
    } catch (e) {
      console.log(e.message);
    }
  });

  useEffect(() => {
    fetchTokenAndUserId();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            options={{
              header: () => null,
              animationEnabled: true
            }}
          >
            {() => <SignInScreen setToken={setToken} setId={setId} />}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            options={{
              header: () => null,
              animationEnabled: true
            }}
          >
            {() => <SignUpScreen setToken={setToken} setId={setId} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen
            name="Tab"
            options={{ header: () => null, animationEnabled: true }}
          >
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  style: { backgroundColor: mainRed },
                  tabStyle: {
                    paddingVertical: 5
                  },
                  activeTintColor: '#302E2E',
                  inactiveTintColor: 'white'
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={'ios-home'} size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: 'MyAirbnb',
                          tabBarLabel: 'Home',
                          headerStyle: { backgroundColor: mainRed },
                          headerTitleStyle: { color: 'white' }
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Room"
                        options={{
                          title: 'Room',
                          tabBarLabel: 'Room',
                          headerStyle: { backgroundColor: mainRed },
                          headerTitleStyle: { color: 'white' },
                          headerTintColor: 'white',
                          headerBackTitle: <Text></Text>
                        }}
                      >
                        {() => <RoomScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="AroundMe"
                  options={{
                    tabBarLabel: 'Around me',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={'ios-pin'} size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="AroundMe"
                        options={{
                          title: 'Around Me',
                          tabBarLabel: 'AroundMe',
                          headerStyle: { backgroundColor: mainRed },
                          headerTitleStyle: { color: 'white' }
                        }}
                      >
                        {() => <AroundMeScreen />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Room"
                        options={{
                          title: 'Room',
                          tabBarLabel: 'Room',
                          headerStyle: { backgroundColor: mainRed },
                          headerTitleStyle: { color: 'white' },
                          headerTintColor: 'white',
                          headerBackTitle: <Text></Text>
                        }}
                      >
                        {() => <RoomScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Profile"
                  options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={'ios-person'} size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: 'Profile',
                          tabBarLabel: 'Profile',
                          headerStyle: { backgroundColor: mainRed },
                          headerTitleStyle: { color: 'white' }
                        }}
                      >
                        {() => (
                          <ProfileScreen
                            userToken={userToken}
                            setToken={setToken}
                            userId={userId}
                            setId={setId}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
