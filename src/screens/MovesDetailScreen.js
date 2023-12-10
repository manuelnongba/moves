import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Context as MovesContext } from '../context/MovesContext';
import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
  text: {
    color: '#fff',
    fontSize: 32,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#f03e3e',
  },
});

function MovesDetailScreen({ route }) {
  const { _id } = route.params;
  const { state, deleteMoves } = useContext(MovesContext);

  const move = state.find((move) => move._id === _id);
  const initialCoords = move.locations[0].coords;

  return (
    <>
      <Text style={styles.text}>{move.name}</Text>
      <MapView
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords,
        }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
      >
        <Heatmap
          points={move.locations.map((loc) => ({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            weight: 1,
          }))}
          opacity={3}
          radius={40}
        />
      </MapView>
      <Spacer>
        <Button
          title="Delete Move"
          buttonStyle={styles.button}
          onPress={() => deleteMoves(move._id)}
        />
      </Spacer>
    </>
  );
}

export default MovesDetailScreen;
