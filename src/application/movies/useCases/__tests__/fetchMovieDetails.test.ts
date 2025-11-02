import movieClient from '@api/client/movieClient';
import { fetchMovieDetails } from '../fetchMovieDetails';
import { mockMovieDetails } from '@mocks/movie';

jest.mock('@api/client/movieClient');
const mockMovieClient = movieClient as jest.Mocked<typeof movieClient>;

describe('fetchMovieDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Successful API Calls', () => {
    it('should fetch movie details successfully', async () => {
      mockMovieClient.get.mockResolvedValueOnce({ data: mockMovieDetails });

      const result = await fetchMovieDetails(123);

      expect(result).toEqual({ results: mockMovieDetails });
      expect(mockMovieClient.get).toHaveBeenCalledWith('/movie/123');
      expect(mockMovieClient.get).toHaveBeenCalledTimes(1);
    });

    it('should call correct endpoint with movie ID', async () => {
      mockMovieClient.get.mockResolvedValueOnce({ data: mockMovieDetails });

      await fetchMovieDetails(456);

      expect(mockMovieClient.get).toHaveBeenCalledWith('/movie/456');
    });

    it('should fetch details with different movie IDs', async () => {
      const movieIds = [1, 100, 550, 1234];

      for (const id of movieIds) {
        mockMovieClient.get.mockResolvedValueOnce({
          data: { ...mockMovieDetails, id },
        });

        const result = await fetchMovieDetails(id);

        expect(result.results.id).toBe(id);
        expect(mockMovieClient.get).toHaveBeenCalledWith(`/movie/${id}`);
      }
    });

    it('should return correct movie details structure', async () => {
      mockMovieClient.get.mockResolvedValueOnce({ data: mockMovieDetails });

      const result = await fetchMovieDetails(123);

      expect(result.results).toHaveProperty('id');
      expect(result.results).toHaveProperty('title');
      expect(result.results).toHaveProperty('overview');
      expect(result.results).toHaveProperty('runtime');
      expect(result.results).toHaveProperty('genres');
      expect(result.results).toHaveProperty('production_companies');
    });
  });

  describe('Error Handling', () => {
    it('should throw error when API call fails', async () => {
      const errorMessage = 'Network error';
      mockMovieClient.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(fetchMovieDetails(123)).rejects.toThrow(errorMessage);
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching movies:',
        expect.any(Error),
      );
    });
  });
});
