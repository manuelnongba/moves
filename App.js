import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AccountScreen from './src/screens/AccountScreen';
import MovesCreateScreen from './src/screens/MovesCreateScreen';
import MovesDetailScreen from './src/screens/MovesDetailScreen';
import MovesListScreen from './src/screens/MovesListScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

import {
  Provider as AuthProvider,
  Context as AuthContext,
} from './src/context/AuthContext';
import { setNavigator } from './src/utils/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as MovesProvider } from './src/context/MovesContext';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Text } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#101010',
  },
  text: {
    color: '#fff',
  },
  headerStyle: {
    alignItems: 'baseline',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});

function customHeader() {
  return (
    <View style={styles.headerStyle}>
      <Text h3 style={styles.text}>
        Moves
      </Text>
      <FontAwesome5 name="walking" color="#f03e3e" size={24} />
    </View>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MovesListNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: styles.container,
        headerStyle: styles.container,
        headerTitleStyle: styles.text,
      }}
    >
      <Stack.Screen
        name="MovesList"
        component={MovesListScreen}
        options={{
          headerTitle: customHeader,
        }}
      />
      <Stack.Screen
        name="MovesDetail"
        component={MovesDetailScreen}
        options={{ headerTitle: '' }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator sceneContainerStyle={styles.container}>
      <Tab.Screen
        name="MovesListFlow"
        component={MovesListNavigator}
        options={{
          headerShown: false,
          title: 'Moves',
          tabBarIcon: () => (
            <FontAwesome name="th-list" size={20} color="#adb5bd" />
          ),
          tabBarStyle: styles.container,
        }}
      />
      <Tab.Screen
        name="MovesCreate"
        component={MovesCreateScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Add Moves',
          tabBarIcon: () => (
            <FontAwesome name="plus" size={20} color="#adb5bd" />
          ),
          tabBarStyle: styles.container,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome name="gear" size={20} color="#adb5bd" />
          ),
          tabBarStyle: styles.container,
        }}
      />
    </Tab.Navigator>
  );
}

const App = forwardRef((props, ref) => {
  const [userSignIn, setUserSignIn] = useState(null);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    setUserSignIn(state.token);
  }, [state.token]);

  return (
    <NavigationContainer ref={ref}>
      <Stack.Navigator
        initialRouteName="ResolveAuthScreen"
        screenOptions={{
          cardStyle: styles.container,
        }}
      >
        {userSignIn === null ? (
          <>
            <Stack.Screen
              name="ResolveAuthScreen"
              component={ResolveAuthScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Signup"
              component={SignUpScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Signin"
              component={SignInScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Tab"
              component={TabNavigator}
              options={{ headerShown: false }}
            ></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default () => {
  return (
    <MovesProvider>
      <LocationProvider>
        <AuthProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </MovesProvider>
  );
};
