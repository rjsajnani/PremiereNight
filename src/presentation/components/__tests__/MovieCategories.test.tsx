import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MovieCategories } from '@components/movies';
import { mockMovie } from '@mocks/movie';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      setOptions: jest.fn(),
    }),
  };
});

describe('MovieCategories', () => {
  const mockCategories = [
    {
      key: 'nowPlaying',
      title: 'Now Playing',
      results: [mockMovie, { ...mockMovie, id: 2 }],
    },
  ];

  const mockOnViewMore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Snapshot Tests', () => {
    it('should match snapshot', () => {
      const { toJSON } = render(
        <MovieCategories movieCategories={mockCategories} />,
      );

      expect(toJSON()).toMatchSnapshot();
    });

    it('should match snapshot when empty', () => {
      const { toJSON } = render(<MovieCategories movieCategories={[]} />);

      expect(toJSON()).toMatchSnapshot();
    });
  });

  describe('renders correctly', () => {
    it('should render without crashing', () => {
      const { getByTestId } = render(
        <MovieCategories movieCategories={mockCategories} />,
      );
      expect(getByTestId('movie-categories-scroll')).toBeTruthy();
    });

    it('should render all movie categories', () => {
      const { getByText } = render(
        <MovieCategories movieCategories={mockCategories} />,
      );

      expect(getByText('Now Playing')).toBeTruthy();
    });
  });

  describe('View More Callback', () => {
    it('should call onViewMore with correct parameters', () => {
      const { getByText } = render(
        <MovieCategories
          movieCategories={mockCategories}
          onViewMore={mockOnViewMore}
        />,
      );

      const viewMoreButton = getByText('View More');
      fireEvent.press(viewMoreButton);

      expect(mockOnViewMore).toHaveBeenCalledWith('nowPlaying', 'Now Playing');
    });
  });

  describe('ScrollView Behavior', () => {
    it('should have vertical scroll indicator disabled', () => {
      const { getByTestId } = render(
        <MovieCategories movieCategories={mockCategories} />,
      );

      const scrollView = getByTestId('movie-categories-scroll');
      expect(scrollView.props.showsVerticalScrollIndicator).toBe(false);
    });
  });
});
