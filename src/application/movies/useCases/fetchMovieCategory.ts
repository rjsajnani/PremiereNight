import movieClient from '@api/client/movieClient';
import { MoviesList } from '@domain/index';

export async function fetchMovieByCategory(
  endPoint: string,
  pageNumber = 1,
): Promise<MoviesList> {
  const categoryPromise = movieClient.get<MoviesList>(endPoint, {
    params: {
      page: pageNumber,
    },
  });

  try {
    const categoryResponse = await categoryPromise;

    return categoryResponse.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}
