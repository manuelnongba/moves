import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Button, Input } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#f03e3e',
  },
});

function AccountScreen() {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Spacer>
        <Button title="Logout" onPress={signout} buttonStyle={styles.button} />
      </Spacer>
    </SafeAreaView>
  );
}

export default AccountScreen;
