import {
  MovieDetails as MovieDetailsType,
  MovieResult,
  MoviesList,
} from '@domain/model';

export const mockMovie: MovieResult = {
  id: 1,
  title: 'Test Movie',
  original_title: 'Test Movie',
  poster_path: '/test.jpg',
  backdrop_path: '/backdrop.jpg',
  vote_average: 8.5,
  vote_count: 1000,
  release_date: '2024-01-01',
  overview: 'Test overview',
  adult: false,
  genre_ids: [28, 12],
  original_language: 'en',
  popularity: 100.5,
  video: false,
};

export const mockMoviesData: MoviesList = {
  page: 1,
  total_pages: 10,
  total_results: 200,
  results: [mockMovie, { ...mockMovie, id: 2, title: 'Test Movie 2' }],
};

export const mockMovieDetails: MovieDetailsType = {
  id: 123,
  title: 'Test Movie',
  original_title: 'Test Movie',
  overview: 'This is a test movie overview with detailed description.',
  poster_path: '/test.jpg',
  backdrop_path: '/backdrop.jpg',
  release_date: '2024-01-15',
  runtime: 120,
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 100.5,
  adult: false,
  original_language: 'en',
  video: false,
  budget: 150000000,
  revenue: 500000000,
  status: 'Released',
  tagline: 'Test tagline',
  homepage: 'https://example.com',
  imdb_id: 'tt1234567',
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 878, name: 'Science Fiction' },
  ],
  production_companies: [
    {
      id: 1,
      name: 'Test Studios',
      logo_path: '/logo.jpg',
      origin_country: 'US',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'US',
      name: 'United States of America',
    },
  ],
  spoken_languages: [
    {
      iso_639_1: 'en',
      name: 'English',
      english_name: 'English',
    },
  ],
  belongs_to_collection: null,
};
