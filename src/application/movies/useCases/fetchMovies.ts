import movieClient from '@api/client/movieClient';
import { MoviesList } from '@domain/index';

export async function fetchMovies() {
  try {
    const nowPlayingPromise = await movieClient.get<MoviesList>(
      '/movie/now_playing',
    );
    const popularPromise = await movieClient.get<MoviesList>('/movie/popular');
    const topRatedPromise = await movieClient.get<MoviesList>(
      '/movie/top_rated',
    );
    const upcomingPromise = await movieClient.get<MoviesList>(
      '/movie/upcoming',
    );

    const [nowPlayingRes, popularRes, topRatedRes, upcomingRes] =
      await Promise.all([
        nowPlayingPromise,
        popularPromise,
        topRatedPromise,
        upcomingPromise,
      ]);

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
