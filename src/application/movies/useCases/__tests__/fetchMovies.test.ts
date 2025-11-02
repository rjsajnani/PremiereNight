import movieClient from '@api/client/movieClient';
import { MoviesList } from '@domain/model';
import { fetchMovies } from '../fetchMovies';
import { mockMovie } from '@mocks/movie';

jest.mock('@api/client/movieClient');
const mockMovieClient = movieClient as jest.Mocked<typeof movieClient>;

describe('fetchMovies', () => {
  const mockMoviesData: MoviesList = {
    page: 1,
    total_pages: 10,
    total_results: 200,
    results: [mockMovie, { ...mockMovie, id: 2, title: 'Test Movie 2' }],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Successful API Calls', () => {
    beforeEach(() => {
      mockMovieClient.get
        .mockResolvedValueOnce({ data: mockMoviesData })
        .mockResolvedValueOnce({ data: mockMoviesData })
        .mockResolvedValueOnce({ data: mockMoviesData })
        .mockResolvedValueOnce({ data: mockMoviesData });
    });

    it('should call correct endpoints', async () => {
      await fetchMovies();

      expect(mockMovieClient.get).toHaveBeenCalledWith('/movie/now_playing');
      expect(mockMovieClient.get).toHaveBeenCalledWith('/movie/popular');
      expect(mockMovieClient.get).toHaveBeenCalledWith('/movie/top_rated');
      expect(mockMovieClient.get).toHaveBeenCalledWith('/movie/upcoming');
    });
    it('should fetch movies successfully', async () => {
      const result = await fetchMovies();

      expect(result).toHaveProperty('nowPlaying');
      expect(result).toHaveProperty('popular');
      expect(result).toHaveProperty('topRated');
      expect(result).toHaveProperty('upcoming');
      expect(mockMovieClient.get).toHaveBeenCalledTimes(4);
    });

    it('should return correct data structure', async () => {
      const result = await fetchMovies();

      expect(result.nowPlaying).toHaveProperty('results');
      expect(result.nowPlaying).toHaveProperty('page');
      expect(result.nowPlaying).toHaveProperty('total_pages');
      expect(result.nowPlaying).toHaveProperty('total_results');
    });
  });
  describe('Error Handling', () => {
    it('should throw error when API call fails', async () => {
      const errorMessage = 'Network error';
      mockMovieClient.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(fetchMovies()).rejects.toThrow(errorMessage);
      expect(console.error).toHaveBeenCalled();
    });
  });
});
