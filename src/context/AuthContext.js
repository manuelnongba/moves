import movesApi from '../api/moves';
import createDataContext from './createDataContext';
import { navigate } from '../utils/navigationRef';
import AsyncStorage from '@react-native-async-storage/async-storage';

function authReducer(state, action) {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'auth':
      return { errorMessage: '', token: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
}

function signup(dispatch) {
  return async ({ email, password }) => {
    try {
      const res = await movesApi.post('/signup', { email, password });

      await AsyncStorage.setItem('token', res.data.token);
      dispatch({ type: 'auth', payload: res.data.token });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign up',
      });
    }
  };
}

function signin(dispatch) {
  return async ({ email, password }) => {
    try {
      const res = await movesApi.post('/login', { email, password });

      await AsyncStorage.setItem('token', res.data.token);

      dispatch({ type: 'auth', payload: res.data.token });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign in',
      });
    }
  };
}

function signout(dispatch) {
  return async () => {
    await AsyncStorage?.removeItem('token');
    dispatch({ type: 'signout' });
  };
}

function clearErrorMessage(dispatch) {
  return () => {
    dispatch({ type: 'clear_error_message' });
  };
}

function tryLocalSignIn(dispatch) {
  return async () => {
    const token = await AsyncStorage?.getItem('token');

    if (token) {
      dispatch({ type: 'auth', payload: token });
    } else {
      navigate('Signin');
    }
  };
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignIn },
  { token: null, errorMessage: '' }
);
