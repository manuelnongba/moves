import React, { useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Context as MovesContext } from '../context/MovesContext';
import { useIsFocused } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
  background: {
    backgroundColor: '#101010',
  },
});

function MovesListScreen({ navigation }) {
  const { state, getMoves } = useContext(MovesContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getMoves();
  }, [isFocused]);

  return (
    <FlatList
      data={state}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MovesDetail', { _id: item._id })
            }
          >
            <ListItem containerStyle={styles.background}>
              <ListItem.Content>
                <ListItem.Title style={styles.text}>{item.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        );
      }}
    />
  );
}

export default MovesListScreen;
