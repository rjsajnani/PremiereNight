import { MOVIE_CATEGORY_CONFIG } from '@constants/constants';
import { MovieResult, MoviesList } from '@domain/model';
import { useMemo } from 'react';

interface MovieDashboardState {
  nowPlaying: MoviesList;
  popular: MoviesList;
  topRated: MoviesList;
  upcoming: MoviesList;
}

export const useMovieCategories = (
  movieData: MovieDashboardState,
): {
  title: string;
  results: MovieResult[];
  key: string;
}[] => {
  return useMemo(() => {
    return Object.entries(MOVIE_CATEGORY_CONFIG)
      .map(([key, config]) => ({
        title: config.title,
        key,
        results: movieData[key as keyof MovieDashboardState]?.results || [],
      }))
      .filter(category => category.results.length > 0);
  }, [movieData]);
};
