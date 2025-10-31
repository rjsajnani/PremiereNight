import Ionicons from '@react-native-vector-icons/ionicons';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const CloseButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Ionicons name="close" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 5,
  },
});
