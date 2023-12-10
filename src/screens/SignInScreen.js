import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context as AuthContext } from '../context/AuthContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
  },
});

function SignInScreen() {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) clearErrorMessage();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Moves"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Sign In"
      />
      <NavLink
        text="Don't have an account? Sign up instead"
        routeName="Signup"
      />
    </View>
  );
}

export default SignInScreen;
