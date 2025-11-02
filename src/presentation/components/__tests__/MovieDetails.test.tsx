import React from 'react';
import { render } from '@testing-library/react-native';

import { MovieDetails } from '@components/movies';
import { mockMovieDetails } from '@mocks/movie';

jest.mock('@react-native-vector-icons/ionicons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return function Ionicons({ name, testID, ...props }: any) {
    return <Text testID={testID || 'icon'}>{name}</Text>;
  };
});

jest.mock('currency-formatter', () => ({
  format: jest.fn(value => `$${value.toLocaleString()}`),
}));

describe('MovieDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Snapshot Tests', () => {
    it('should match snapshot with full data', () => {
      const { toJSON } = render(<MovieDetails {...mockMovieDetails} />);

      expect(toJSON()).toMatchSnapshot();
    });
  });
  describe('renders correctly', () => {
    it('should display all main sections', () => {
      const { getByText } = render(<MovieDetails {...mockMovieDetails} />);

      expect(getByText('Synopsis')).toBeTruthy();
      expect(getByText('Budget')).toBeTruthy();
    });
  });

  describe('Vote Average Display', () => {
    it('should display correct vote average', () => {
      const { getByText } = render(<MovieDetails {...mockMovieDetails} />);

      expect(getByText('8.5')).toBeTruthy();
    });

    it('should display star icon', () => {
      const { getByText } = render(<MovieDetails {...mockMovieDetails} />);

      expect(getByText('star')).toBeTruthy();
    });

    it('should handle different vote averages', () => {
      const differentRating = { ...mockMovieDetails, vote_average: 9.2 };
      const { getByText } = render(<MovieDetails {...differentRating} />);

      expect(getByText('9.2')).toBeTruthy();
    });

    it('should handle low ratings', () => {
      const lowRating = { ...mockMovieDetails, vote_average: 3.5 };
      const { getByText } = render(<MovieDetails {...lowRating} />);

      expect(getByText('3.5')).toBeTruthy();
    });
  });

  describe('Genres Display', () => {
    it('should display all genres', () => {
      const { getByText } = render(<MovieDetails {...mockMovieDetails} />);

      expect(
        getByText('Action     Adventure     Science Fiction'),
      ).toBeTruthy();
    });

    it('should handle single genre', () => {
      const singleGenre = {
        ...mockMovieDetails,
        genres: [{ id: 28, name: 'Action' }],
      };
      const { getByText } = render(<MovieDetails {...singleGenre} />);

      expect(getByText('Action')).toBeTruthy();
    });

    it('should handle two genres', () => {
      const twoGenres = {
        ...mockMovieDetails,
        genres: [
          { id: 28, name: 'Action' },
          { id: 12, name: 'Adventure' },
        ],
      };
      const { getByText } = render(<MovieDetails {...twoGenres} />);

      expect(getByText('Action     Adventure')).toBeTruthy();
    });

    it('should handle empty genres array', () => {
      const noGenres = { ...mockMovieDetails, genres: [] };
      const { getByText } = render(<MovieDetails {...noGenres} />);

      expect(getByText('')).toBeTruthy();
    });
  });

  describe('Release Date Display', () => {
    it('should display release date', () => {
      const { getByText } = render(<MovieDetails {...mockMovieDetails} />);

      expect(getByText('2024-01-15')).toBeTruthy();
    });

    it('should handle different date formats', () => {
      const differentDate = { ...mockMovieDetails, release_date: '2023-12-25' };
      const { getByText } = render(<MovieDetails {...differentDate} />);

      expect(getByText('2023-12-25')).toBeTruthy();
    });
  });

  describe('Synopsis Display', () => {
    it('should display synopsis section title', () => {
      const { getByText } = render(<MovieDetails {...mockMovieDetails} />);

      expect(getByText('Synopsis')).toBeTruthy();
    });

    it('should display overview text', () => {
      const { getByText } = render(<MovieDetails {...mockMovieDetails} />);

      expect(getByText(mockMovieDetails.overview)).toBeTruthy();
    });

    it('should handle long overview text', () => {
      const longOverview = {
        ...mockMovieDetails,
        overview:
          'This is a very long overview text that spans multiple lines and contains a lot of information about the movie plot, characters, and story.',
      };
      const { getByText } = render(<MovieDetails {...longOverview} />);

      expect(getByText(longOverview.overview)).toBeTruthy();
    });

    it('should handle short overview', () => {
      const shortOverview = {
        ...mockMovieDetails,
        overview: 'Short plot.',
      };
      const { getByText } = render(<MovieDetails {...shortOverview} />);

      expect(getByText('Short plot.')).toBeTruthy();
    });
  });

  describe('Budget Display', () => {
    it('should display budget when budget > 0', () => {
      const { getByText } = render(<MovieDetails {...mockMovieDetails} />);

      expect(getByText('Budget')).toBeTruthy();
      expect(getByText(/\$150,000,000/)).toBeTruthy();
    });

    it('should format budget correctly', () => {
      const { getByText } = render(<MovieDetails {...mockMovieDetails} />);

      expect(getByText('$150,000,000 USD')).toBeTruthy();
    });

    it('should not display budget when budget is 0', () => {
      const noBudget = { ...mockMovieDetails, budget: 0 };
      const { queryByText } = render(<MovieDetails {...noBudget} />);

      expect(queryByText('Budget')).toBeNull();
    });

    it('should not display budget when budget is negative', () => {
      const negativeBudget = { ...mockMovieDetails, budget: -100 };
      const { queryByText } = render(<MovieDetails {...negativeBudget} />);

      expect(queryByText('Budget')).toBeNull();
    });

    it('should handle small budget amounts', () => {
      const smallBudget = { ...mockMovieDetails, budget: 1000000 };
      const { getByText } = render(<MovieDetails {...smallBudget} />);

      expect(getByText('Budget')).toBeTruthy();
      expect(getByText('$1,000,000 USD')).toBeTruthy();
    });

    it('should handle very large budget amounts', () => {
      const largeBudget = { ...mockMovieDetails, budget: 500000000 };
      const { getByText } = render(<MovieDetails {...largeBudget} />);

      expect(getByText('Budget')).toBeTruthy();
      expect(getByText('$500,000,000 USD')).toBeTruthy();
    });
  });

  describe('Complete Data Display', () => {
    it('should display all information together', () => {
      const { getByText } = render(<MovieDetails {...mockMovieDetails} />);

      expect(getByText('8.5')).toBeTruthy();

      expect(
        getByText('Action     Adventure     Science Fiction'),
      ).toBeTruthy();

      expect(getByText('2024-01-15')).toBeTruthy();

      expect(getByText(mockMovieDetails.overview)).toBeTruthy();

      expect(getByText('Budget')).toBeTruthy();
      expect(getByText('$150,000,000 USD')).toBeTruthy();
    });
  });
});
