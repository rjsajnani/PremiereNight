import movieClient from '@api/client/movieClient';
import { fetchMovieByCategory } from '../fetchMovieCategory';
import { mockMoviesData } from '@mocks/movie';

jest.mock('@api/client/movieClient');
const mockMovieClient = movieClient as jest.Mocked<typeof movieClient>;

describe('fetchMovieByCategory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Successful API Calls', () => {
    it('should fetch movies for a category successfully', async () => {
      mockMovieClient.get.mockResolvedValueOnce({ data: mockMoviesData });

      const result = await fetchMovieByCategory('/movie/popular');

      expect(result).toEqual(mockMoviesData);
      expect(mockMovieClient.get).toHaveBeenCalledWith('/movie/popular', {
        params: { page: 1 },
      });
      expect(mockMovieClient.get).toHaveBeenCalledTimes(1);
    });

    it('should use default page number 1', async () => {
      mockMovieClient.get.mockResolvedValueOnce({ data: mockMoviesData });

      await fetchMovieByCategory('/movie/now_playing');

      expect(mockMovieClient.get).toHaveBeenCalledWith('/movie/now_playing', {
        params: { page: 1 },
      });
    });

    it('should fetch specific page number', async () => {
      const page2Data = { ...mockMoviesData, page: 2 };
      mockMovieClient.get.mockResolvedValueOnce({ data: page2Data });

      const result = await fetchMovieByCategory('/movie/top_rated', 2);

      expect(result.page).toBe(2);
      expect(mockMovieClient.get).toHaveBeenCalledWith('/movie/top_rated', {
        params: { page: 2 },
      });
    });

    it('should return correct data structure', async () => {
      mockMovieClient.get.mockResolvedValueOnce({ data: mockMoviesData });

      const result = await fetchMovieByCategory('/movie/upcoming');

      expect(result).toHaveProperty('results');
      expect(result).toHaveProperty('page');
      expect(result).toHaveProperty('total_pages');
      expect(result).toHaveProperty('total_results');
      expect(Array.isArray(result.results)).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should throw error when API call fails', async () => {
      const errorMessage = 'Network error';
      mockMovieClient.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(fetchMovieByCategory('/movie/popular')).rejects.toThrow(
        errorMessage,
      );

      expect(console.error).toHaveBeenCalledWith(
        'Error fetching movies:',
        expect.any(Error),
      );
    });
  });

  describe('Pagination', () => {
    it('should handle page 1', async () => {
      const page1Data = { ...mockMoviesData, page: 1 };
      mockMovieClient.get.mockResolvedValueOnce({ data: page1Data });

      const result = await fetchMovieByCategory('/movie/popular', 1);

      expect(result.page).toBe(1);
    });

    it('should handle page 10', async () => {
      const page10Data = { ...mockMoviesData, page: 10 };
      mockMovieClient.get.mockResolvedValueOnce({ data: page10Data });

      const result = await fetchMovieByCategory('/movie/popular', 10);

      expect(result.page).toBe(10);
      expect(mockMovieClient.get).toHaveBeenCalledWith('/movie/popular', {
        params: { page: 10 },
      });
    });
  });
});
