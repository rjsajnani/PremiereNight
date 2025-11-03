import React, { Suspense } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import Slider from '../Slider/Slider';
import { MovieCategoriesProps } from './MovieCategories.types';
import MovieCarousel from '../MovieCarousel/MovieCarousel';

const MovieCategories = ({
  movieCategories,
  onViewMore,
}: MovieCategoriesProps) => {
  return (
    <ScrollView
      testID="movie-categories-scroll"
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Suspense fallback={<ActivityIndicator size={'large'} />}>
        {movieCategories[0] && (
          <MovieCarousel data={movieCategories[0].results} />
        )}
        {movieCategories.map((category, index) => (
          <Slider
            key={`${category.key}-${index}`}
            title={category.title}
            movies={
              index === 0
                ? category.results.slice(5, category.results.length)
                : category.results
            }
            onViewMore={
              onViewMore
                ? () => onViewMore(category.key, category.title)
                : undefined
            }
          />
        ))}
      </Suspense>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MovieCategories;
