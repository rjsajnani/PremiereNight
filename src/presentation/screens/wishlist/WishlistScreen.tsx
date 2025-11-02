import { Slider } from '@components/movies';
import { selectWishlistItems } from '@state/slice';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

export function WishListScreen() {
  const wishlistItems = useSelector(selectWishlistItems);

  return (
    <View style={styles.container}>
      {wishlistItems.length > 0 ? (
        <Slider movies={wishlistItems} isHorizontal={false} showAll />
      ) : (
        <Text style={styles.text}> No movies added to wishlist </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
  },
});
