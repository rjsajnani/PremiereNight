import { fetchMovieDetails } from '@application/movies';
import { MovieDetails } from '@domain/model';
import { useEffect, useState } from 'react';

export const useMovieDetails = (movieId: number) => {
  const [movieDetails, setMovieDetails] = useState<{
    isLoading: boolean;
    movieDetails: MovieDetails | null;
  }>({
    isLoading: false,
    movieDetails: null,
  });

  const getMovieDetails = async () => {
    const movieDetailsRes = await fetchMovieDetails(movieId);

    setMovieDetails({
      isLoading: false,
      movieDetails: movieDetailsRes.results,
    });
  };

  useEffect(() => {
    getMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...movieDetails,
  };
};
