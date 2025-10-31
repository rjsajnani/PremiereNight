import movieClient from '@api/client/movieClient';
import { MoviesList } from '@domain/index';

export async function fetchMovies() {
  try {
    const nowPlayingRes = await movieClient.get<MoviesList>('/now_playing');

    return {
      results: nowPlayingRes.data.results,
      page: nowPlayingRes.data.page,
      total_pages: nowPlayingRes.data.total_pages,
      total_results: nowPlayingRes.data.total_results,
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}
