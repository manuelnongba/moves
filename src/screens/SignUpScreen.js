import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { useIsFocused } from '@react-navigation/native';

function SignUpScreen() {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) clearErrorMessage();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign Up for Moves"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />
      <NavLink
        text="Already have an account? Sign in instead"
        routeName="Signin"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
  },
});

export default SignUpScreen;
