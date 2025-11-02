import movieClient from '@api/client/movieClient';
import { MOVIE_CATEGORY_CONFIG } from '@constants/constants';
import { MoviesList } from '@domain/index';

export async function fetchMovies() {
  try {
    const moviePromises = Object.values(MOVIE_CATEGORY_CONFIG).map(category =>
      movieClient.get<MoviesList>(category.endpoint),
    );
    const [nowPlayingRes, popularRes, topRatedRes, upcomingRes] =
      await Promise.all(moviePromises);

    return {
      nowPlaying: {
        results: nowPlayingRes.data.results,
        page: nowPlayingRes.data.page,
        total_pages: nowPlayingRes.data.total_pages,
        total_results: nowPlayingRes.data.total_results,
      },
      popular: {
        results: popularRes.data.results,
        page: popularRes.data.page,
        total_pages: popularRes.data.total_pages,
        total_results: popularRes.data.total_results,
      },
      topRated: {
        results: topRatedRes.data.results,
        page: topRatedRes.data.page,
        total_pages: topRatedRes.data.total_pages,
        total_results: topRatedRes.data.total_results,
      },
      upcoming: {
        results: upcomingRes.data.results,
        page: upcomingRes.data.page,
        total_pages: upcomingRes.data.total_pages,
        total_results: upcomingRes.data.total_results,
      },
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}
