import React, { useContext } from 'react';
import { Button, Input } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveMoves from '../hooks/useSaveMoves';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
  buttonStart: {
    backgroundColor: '#37b24d',
  },
  buttonStop: {
    backgroundColor: '#f03e3e',
  },
});

function MovesForm() {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);
  const [saveMoves] = useSaveMoves();

  return (
    <>
      <Spacer>
        <Input
          value={name}
          onChangeText={(text) => {
            changeName(text);
          }}
          placeholder="Enter name"
          style={styles.text}
        />
      </Spacer>
      <Spacer>
        {recording ? (
          <Button
            title="Stop Recording"
            onPress={stopRecording}
            buttonStyle={styles.buttonStop}
          />
        ) : (
          <Button
            title="Start Recording"
            onPress={startRecording}
            buttonStyle={styles.buttonStart}
          />
        )}
      </Spacer>
      <Spacer>
        {!recording && locations.length ? (
          <Button
            title="Save Recording"
            onPress={saveMoves}
            containerStyle={styles.button}
          />
        ) : null}
      </Spacer>
    </>
  );
}

export default MovesForm;
