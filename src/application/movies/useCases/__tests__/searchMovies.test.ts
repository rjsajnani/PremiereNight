import movieClient from '@api/client/movieClient';
import { MoviesList } from '@domain/model';
import { searchMovies } from '../searchMovies';
import { mockMovie } from '@mocks/movie';

jest.mock('@api/client/movieClient');
const mockMovieClient = movieClient as jest.Mocked<typeof movieClient>;

describe('searchMovies', () => {
  const mockSearchResults: MoviesList = {
    page: 1,
    total_pages: 5,
    total_results: 100,
    results: [mockMovie, { ...mockMovie, id: 2, title: 'Another Test Movie' }],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Successful Searches', () => {
    it('should search movies successfully', async () => {
      mockMovieClient.get.mockResolvedValueOnce({ data: mockSearchResults });

      const result = await searchMovies('inception');

      expect(result).toEqual({ results: mockSearchResults });
      expect(mockMovieClient.get).toHaveBeenCalledWith(
        '/search/movie?query=inception',
      );
      expect(mockMovieClient.get).toHaveBeenCalledTimes(1);
    });

    it('should handle queries', async () => {
      mockMovieClient.get.mockResolvedValueOnce({ data: mockSearchResults });

      await searchMovies('the dark knight');

      expect(mockMovieClient.get).toHaveBeenCalledWith(
        '/search/movie?query=the dark knight',
      );
    });

    it('should return multiple movie results', async () => {
      mockMovieClient.get.mockResolvedValueOnce({ data: mockSearchResults });

      const result = await searchMovies('test');

      expect(result.results.results).toHaveLength(2);
      expect(result.results.results[0].title).toBe('Test Movie');
      expect(result.results.results[1].title).toBe('Another Test Movie');
    });
  });

  describe('Empty Results', () => {
    it('should handle empty search results', async () => {
      const emptyResults: MoviesList = {
        page: 1,
        total_pages: 0,
        total_results: 0,
        results: [],
      };
      mockMovieClient.get.mockResolvedValueOnce({ data: emptyResults });

      const result = await searchMovies('nonexistentmovie123');

      expect(result.results.results).toHaveLength(0);
      expect(result.results.total_results).toBe(0);
    });
  });

  describe('Error Handling', () => {
    it('should throw error when API call fails', async () => {
      const errorMessage = 'Network error';
      mockMovieClient.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(searchMovies('test')).rejects.toThrow(errorMessage);
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching movies:',
        expect.any(Error),
      );
    });
  });
});
