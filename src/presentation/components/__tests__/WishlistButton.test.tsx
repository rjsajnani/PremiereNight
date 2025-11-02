import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { WishlistButton } from '@components/WishlistButton';

jest.mock('@react-native-vector-icons/ionicons', () => {
  const { Text } = require('react-native');
  return function Ionicons({ name, testID }: any) {
    return <Text testID={testID || 'icon'}>{name}</Text>;
  };
});

describe('CircularButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Snapshot Tests', () => {
    it('should match snapshot when not in wishlist', () => {
      const { toJSON } = render(
        <WishlistButton onPress={mockOnPress} isWishlist={false} />,
      );

      expect(toJSON()).toMatchSnapshot();
    });

    it('should match snapshot when in wishlist', () => {
      const { toJSON } = render(
        <WishlistButton onPress={mockOnPress} isWishlist={true} />,
      );

      expect(toJSON()).toMatchSnapshot();
    });
  });

  describe('renders correctly', () => {
    it('should render the button', () => {
      const { getByTestId } = render(
        <WishlistButton onPress={mockOnPress} isWishlist={false} />,
      );

      expect(getByTestId('wishlist-button')).toBeTruthy();
    });

    it('should display outline icon when not in wishlist', () => {
      const { getByText } = render(
        <WishlistButton onPress={mockOnPress} isWishlist={false} />,
      );

      expect(getByText('heart-outline')).toBeTruthy();
    });

    it('should display filled icon when in wishlist', () => {
      const { getByText } = render(
        <WishlistButton onPress={mockOnPress} isWishlist={true} />,
      );

      expect(getByText('heart')).toBeTruthy();
    });
  });

  describe('Press Handling', () => {
    it('should call onPress when button is pressed', () => {
      const { getByTestId } = render(
        <WishlistButton onPress={mockOnPress} isWishlist={false} />,
      );

      const button = getByTestId('wishlist-button');
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('should call onPress when in wishlist state', () => {
      const { getByTestId } = render(
        <WishlistButton onPress={mockOnPress} isWishlist={true} />,
      );

      const button = getByTestId('wishlist-button');
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('State Changes', () => {
    it('should update icon when isWishlist changes', () => {
      const { getByText, rerender } = render(
        <WishlistButton onPress={mockOnPress} isWishlist={false} />,
      );

      expect(getByText('heart-outline')).toBeTruthy();

      rerender(<WishlistButton onPress={mockOnPress} isWishlist={true} />);

      expect(getByText('heart')).toBeTruthy();
    });
  });
});
