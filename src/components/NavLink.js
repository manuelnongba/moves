import { StyleSheet, TouchableOpacity } from 'react-native';
import Spacer from './Spacer';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-elements';

const styles = StyleSheet.create({
  link: {
    color: '#339af0',
  },
});

function NavLink({ text, routeName }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Spacer>
        <Text style={styles.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
}

export default NavLink;
