import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SliderProps } from './Slider.types';
import MovieCard from '../MovieCard/MovieCard';

const Slider = ({ title, movies, isHorizontal = true }: SliderProps) => {
  return (
    <View>
      {!!title && <Text style={styles.sliderText}>{title}</Text>}
      <FlatList
        horizontal={isHorizontal}
        data={movies}
        showsHorizontalScrollIndicator={false}
        numColumns={isHorizontal ? undefined : 2}
        key={isHorizontal ? 'horizontal' : 'grid'}
        renderItem={({ item }) => (
          <MovieCard isHorizontal={isHorizontal} movie={item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderText: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Slider;
