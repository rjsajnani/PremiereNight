import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CloseButton } from '@components/CloseButton';

describe('CircularButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Snapshot Tests', () => {
    it('should match snapshot with default props', () => {
      const { toJSON } = render(<CloseButton onPress={mockOnPress} />);

      expect(toJSON()).toMatchSnapshot();
    });
  });

  describe('renders correctly', () => {
    it('should display the correct title', () => {
      const { getByTestId } = render(<CloseButton onPress={mockOnPress} />);

      expect(getByTestId('close-button')).toBeTruthy();
    });

    it('should render TouchableOpacity', () => {
      const { getByTestId } = render(<CloseButton onPress={mockOnPress} />);

      const button = getByTestId('close-button').parent;
      expect(button).toBeTruthy();
    });
  });

  describe('Press Handling', () => {
    it('should call onPress when button is pressed', () => {
      const { getByTestId } = render(<CloseButton onPress={mockOnPress} />);

      const button = getByTestId('close-button');
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });
});
