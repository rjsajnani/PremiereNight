import { searchMovies } from '@application/movies';
import { Slider } from '@components/movies';
import { SearchBar } from '@components/SearchBar/SearchBar';
import { MoviesList } from '@domain/model';
import { loadHomeDashboard } from '@state/slice/movieSlice';
import { AppDispatch, RootState } from '@state/store';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MoviesList>();

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
        <ScrollView>
          <Slider title="Now Playing" movies={nowPlaying.results} />
          <Slider title="Top Rated" movies={topRated.results} />
          <Slider title="Popular" movies={popular.results} />
          <Slider title="Upcoming" movies={upcoming.results} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
