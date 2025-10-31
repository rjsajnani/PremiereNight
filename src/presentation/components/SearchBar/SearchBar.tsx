import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchBarProps } from './SearchBar.types';
import Ionicons from '@react-native-vector-icons/ionicons';

export const SearchBar = ({
  searchQuery,
  onChangeSearchQuery,
  onSearch,
}: SearchBarProps) => {
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a movie"
        placeholderTextColor={'black'}
        onChangeText={onChangeSearchQuery}
        value={searchQuery}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Ionicons name="search" size={28} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: '85%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  searchButton: {
    padding: 10,
    height: '100%',
    alignItems: 'center',
  },
  searchInput: {
    marginLeft: 20,
    fontSize: 18,
    flex: 1,
    color: 'black',
  },
});
