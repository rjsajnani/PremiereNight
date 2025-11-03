import { searchMovies } from '@application/movies';
import { SearchBar, MovieCategories, Slider } from '@components/index';
import { MovieCategory } from '@constants/constants';
import { MoviesList } from '@domain/model';
import { useMovieCategories } from '@hooks/index';
import { RootStackParams } from '@navigation/navigation.types';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppDispatch, RootState, loadHomeDashboard } from '@state/index';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(undefined);
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
        onClear={!!searchResults && clearSearch}
      />
      {searchResults && searchResults.results.length === 0 && (
        <View style={styles.emptyContainer}>
          <Ionicons name={'search'} size={45} color={'black'} />
          <Text style={styles.emptyTitle}>No movies found</Text>
          <Text style={styles.emptySubtitle}>
            Try searching with different keywords
          </Text>
        </View>
      )}
      {searchResults?.results && searchResults.results.length > 0 && (
        <Slider
          isHorizontal={false}
          title={`Found these movies for ${searchQuery}`}
          movies={searchResults.results}
        />
      )}

      {!searchResults && (
        <MovieCategories
          movieCategories={movieCategories}
          onViewMore={handleViewMore}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
