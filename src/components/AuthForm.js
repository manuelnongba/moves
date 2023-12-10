import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from './Spacer';
import { FontAwesome5 } from '@expo/vector-icons';

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
  errorMessage: {
    fontSize: 14,
    color: 'red',
    marginLeft: 15,
  },
  movesHeader: {
    alignItems: 'baseline',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});

function AuthForm({ headerText, errorMessage, onSubmit, submitButtonText }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Spacer>
        <View style={styles.movesHeader}>
          <Text h3 style={styles.text}>
            {headerText}
          </Text>
          <FontAwesome5 name="walking" color="#f03e3e" size={24} />
        </View>
      </Spacer>
      <Input
        label="Email"
        value={email}
        onChangeText={(newEmail) => setEmail(newEmail)}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.text}
        labelStyle={styles.text}
      />
      <Spacer />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.text}
        labelStyle={styles.text}
      />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => onSubmit({ email, password })}
        />
      </Spacer>
    </>
  );
}

export default AuthForm;
