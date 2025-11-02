import React, { Suspense } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import Slider from '../Slider/Slider';
import { MovieCategoriesProps } from './MovieCategories.types';

const MovieCategories = ({
  movieCategories,
  onViewMore,
}: MovieCategoriesProps) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Suspense fallback={<ActivityIndicator size={'large'} />}>
        {movieCategories.map((category, index) => (
          <Slider
            key={`${category.key}-${index}`}
            title={category.title}
            movies={category.results}
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
