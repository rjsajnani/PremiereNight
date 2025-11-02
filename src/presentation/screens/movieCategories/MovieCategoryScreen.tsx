import { Slider } from '@components/movies';
import { RootStackParams } from '@navigation/navigation.types';
import { StackScreenProps } from '@react-navigation/stack';
import { loadMoreMovies } from '@state/slice/movieSlice';
import { AppDispatch, RootState } from '@state/store';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface MovieCategoryScreenProps
  extends StackScreenProps<RootStackParams, 'MovieCategories'> {}

export const MovieCategoryScreen = ({ route }: MovieCategoryScreenProps) => {
  const { categoryKey } = route.params;
  const dispatch = useDispatch<AppDispatch>();

  const movies = useSelector((state: RootState) => state.movies[categoryKey]);
  const loading = useSelector(
    (state: RootState) => state.movies.paginationStatus,
  );

  const loadMore = useCallback(() => {
    dispatch(loadMoreMovies({ categoryKey, page: movies.page + 1 }));
  }, [dispatch, categoryKey, movies.page]);

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    if (!!loading && movies.page < movies.total_pages) {
      loadMore();
    }
  };

  return (
    <View style={styles.container}>
      <Slider
        movies={movies.results}
        isHorizontal={false}
        onLoadMore={handleLoadMore}
        showAll
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 15 },
});
