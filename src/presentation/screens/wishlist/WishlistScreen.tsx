import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function WishListScreen() {
  return (
    <View style={styles.container}>
      <Text>WishList</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
