import { Slider } from '@components/movies';
import { loadHomeDashboard } from '@state/slice/movieSlice';
import { AppDispatch, RootState } from '@state/store';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(loadHomeDashboard());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Slider title="Now Playing" movies={movies.results} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
