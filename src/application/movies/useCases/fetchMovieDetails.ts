import movieClient from '@api/client/movieClient';
import { MovieDetails } from '@domain/model';

export async function fetchMovieDetails(movieId: number) {
  try {
    const movieDetailsRes = await movieClient.get<MovieDetails>(
      `/movie/${movieId}`,
    );

    return {
      results: movieDetailsRes.data,
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}
