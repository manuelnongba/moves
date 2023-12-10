import React, { useCallback, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import { useIsFocused } from '@react-navigation/native';
import MovesForm from '../components/MovesForm';

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
});

function MovesCreateScreen() {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);
  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );
  const isFocused = useIsFocused();
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView>
      <Text h4 style={styles.text}>
        Record Your Moves
      </Text>
      <Map />
      {err ? <Text>Please Enable Location Services</Text> : null}
      <MovesForm />
    </SafeAreaView>
  );
}

export default MovesCreateScreen;
