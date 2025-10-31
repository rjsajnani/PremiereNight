import movieClient from '@api/client/movieClient';
import { MoviesList } from '@domain/model';

export async function searchMovies(searchQuery: string) {
  try {
    const searchResult = await movieClient.get<MoviesList>(
      `/search/movie?query=${searchQuery}`,
    );

    return {
      results: searchResult.data,
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}
