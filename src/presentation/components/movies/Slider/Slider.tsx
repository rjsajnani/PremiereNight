import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SliderProps } from './Slider.types';
import MovieCard from '../MovieCard/MovieCard';
import CircularButton from '@components/CircularButton';

const Slider = ({
  title,
  movies,
  isHorizontal = true,
  onViewMore,
  onLoadMore,
  showAll = false,
}: SliderProps) => {
  const moviesList = showAll ? movies : movies.slice(0, 20);
  return (
    <View>
      {!!title && <Text style={styles.sliderText}>{title}</Text>}
      {movies.length > 0 ? (
        <FlatList
          horizontal={isHorizontal}
          data={moviesList}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={
            isHorizontal ? (
              <CircularButton
                onPress={onViewMore || (() => {})}
                title="View More"
              />
            ) : (
              onLoadMore && <ActivityIndicator size={'large'} />
            )
          }
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
          keyExtractor={item => item.original_title.toString()}
          ListFooterComponentStyle={styles.footerComponent}
          numColumns={isHorizontal ? undefined : 2}
          key={isHorizontal ? 'horizontal' : 'grid'}
          renderItem={({ item }) => (
            <MovieCard isHorizontal={isHorizontal} movie={item} />
          )}
        />
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sliderText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  footerComponent: { justifyContent: 'center', margin: 10 },
});

export default Slider;
