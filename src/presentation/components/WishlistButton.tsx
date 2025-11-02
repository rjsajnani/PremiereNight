import Ionicons from '@react-native-vector-icons/ionicons';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const WishlistButton = ({
  onPress,
  isWishlist,
}: {
  onPress: () => void;
  isWishlist: boolean;
}) => {
  return (
    <TouchableOpacity
      testID="wishlist-button"
      onPress={onPress}
      style={styles.button}
    >
      <Ionicons
        name={isWishlist ? 'heart' : 'heart-outline'}
        size={24}
        color={isWishlist ? '#ff4444' : '#fff'}
      />
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
