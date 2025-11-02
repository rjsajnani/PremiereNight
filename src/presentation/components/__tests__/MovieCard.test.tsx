import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Image } from 'react-native';
import { MovieCard } from '@components/movies';
import { mockMovie } from '@mocks/movie';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: jest.fn(),
    setOptions: jest.fn(),
  }),
}));

describe('MovieCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Snapshot Tests', () => {
    it('should match snapshot', () => {
      const { toJSON } = render(<MovieCard movie={mockMovie} />);

      expect(toJSON()).toMatchSnapshot();
    });

    it('should match snapshot with different movie', () => {
      const differentMovie = {
        ...mockMovie,
        id: 99,
        title: 'Snapshot Movie',
        poster_path: '/snapshot.jpg',
      };
      const { toJSON } = render(<MovieCard movie={differentMovie} />);

      expect(toJSON()).toMatchSnapshot();
    });
  });
  describe('renders correctly', () => {
    it('should render Image component', () => {
      const { UNSAFE_getByType } = render(<MovieCard movie={mockMovie} />);
      const image = UNSAFE_getByType(Image);

      expect(image).toBeTruthy();
    });
  });

  describe('Image Display', () => {
    it('should display correct image URL', () => {
      const { UNSAFE_getByType } = render(<MovieCard movie={mockMovie} />);
      const image = UNSAFE_getByType(Image);

      expect(image.props.source.uri).toBe(
        'https://image.tmdb.org/t/p/w500/test.jpg',
      );
    });
  });
  describe('Title Display', () => {
    it('should display movie title correctly', () => {
      const { getByText } = render(<MovieCard movie={mockMovie} />);
      const title = getByText('Test Movie');

      expect(title.props.children).toBe('Test Movie');
    });
  });

  describe('Navigation', () => {
    it('should navigate to movie details on press', () => {
      const { getByTestId } = render(<MovieCard movie={mockMovie} />);

      const card =
        getByTestId('movie-card') || getByTestId('movie-card-touchable');
      fireEvent.press(card);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('Details', mockMovie);
    });

    it('should pass correct movie data on navigation', () => {
      const customMovie = {
        ...mockMovie,
        id: 999,
        title: 'Custom Movie',
      };
      const { getByTestId } = render(<MovieCard movie={customMovie} />);

      const card = getByTestId('movie-card');
      fireEvent.press(card);

      expect(mockNavigate).toHaveBeenCalledWith('Details', customMovie);
    });
  });
});
