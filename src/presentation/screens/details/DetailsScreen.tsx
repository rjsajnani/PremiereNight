import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>HomeDetails</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
