import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { Circle, Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';

function Map() {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  if (!currentLocation)
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      region={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      provider={PROVIDER_GOOGLE}
    >
      <Circle
        center={currentLocation.coords}
        radius={25}
        strokeColor="rgba(233, 51, 51, 1.0)"
        fillColor="rgba(233, 51, 51, 0.5)"
      />
      <Heatmap
        points={locations.map((loc) => ({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          weight: 1,
        }))}
        opacity={5}
        radius={40}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default Map;
