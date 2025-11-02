import { searchMovies } from '@application/movies';
import { SearchBar, MovieCategories, Slider } from '@components/index';
import { MovieCategory } from '@constants/constants';
import { MoviesList } from '@domain/model';
import { useMovieCategories } from '@hooks/index';
import { RootStackParams } from '@navigation/navigation.types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppDispatch, RootState, loadHomeDashboard } from '@state/index';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'HomeScreen'
>;

export function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MoviesList>();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const dispatch = useDispatch<AppDispatch>();
  const { nowPlaying, popular, topRated, upcoming } = useSelector(
    (state: RootState) => state.movies,
  );

  useEffect(() => {
    dispatch(loadHomeDashboard());
  }, [dispatch]);

  const handleSearch = async () => {
    const { results } = await searchMovies(searchQuery);
    setSearchResults(results);
  };

  const movieCategories = useMovieCategories({
    nowPlaying,
    popular,
    topRated,
    upcoming,
  });

  const handleViewMore = (categoryKey: MovieCategory['key'], title: string) => {
    navigation.navigate('MovieCategories', { categoryKey, title });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        searchQuery={searchQuery}
        onChangeSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      {searchResults?.results && searchResults.results.length > 0 ? (
        <Slider
          isHorizontal={false}
          title={`Found these movies for ${searchQuery}`}
          movies={searchResults.results}
        />
      ) : (
        <MovieCategories
          movieCategories={movieCategories}
          onViewMore={handleViewMore}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
