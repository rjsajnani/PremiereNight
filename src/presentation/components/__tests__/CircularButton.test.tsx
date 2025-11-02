import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CircularButton from '../CircularButton';

describe('CircularButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Snapshot Tests', () => {
    it('should match snapshot with default props', () => {
      const { toJSON } = render(
        <CircularButton title="Snapshot" onPress={mockOnPress} />,
      );

      expect(toJSON()).toMatchSnapshot();
    });
  });

  describe('renders correctly', () => {
    it('should display the correct title', () => {
      const { getByText } = render(
        <CircularButton title="Click Me" onPress={mockOnPress} />,
      );

      expect(getByText('Click Me')).toBeTruthy();
    });

    it('should render TouchableOpacity', () => {
      const { getByText } = render(
        <CircularButton title="Test" onPress={mockOnPress} />,
      );

      const button = getByText('Test').parent;
      expect(button).toBeTruthy();
    });
  });

  describe('Press Handling', () => {
    it('should call onPress when button is pressed', () => {
      const { getByText } = render(
        <CircularButton title="Press Me" onPress={mockOnPress} />,
      );

      const button = getByText('Press Me');
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });
});
