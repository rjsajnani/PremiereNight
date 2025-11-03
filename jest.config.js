module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@model/(.*)$': '<rootDir>/src/domain/models/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
    '^@state/(.*)$': '<rootDir>/src/presentation/state/$1',
    '^@components/(.*)$': '<rootDir>/src/presentation/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/presentation/hooks/$1',
    '^@screen/(.*)$': '<rootDir>/src/presentation/screens/$1',
    '^@navigation/(.*)$': '<rootDir>/src/presentation/navigation/$1',
    '^@mocks/(.*)$': '<rootDir>/src/__mocks__/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(' +
      '@react-native|' +
      'react-native|' +
      '@react-navigation|' +
      '@react-native-vector-icons|' +
      '@reduxjs/toolkit|' +
      'immer|' +
      'react-redux|' +
      'redux|' +
      '@react-native-async-storage' +
      ')/)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/android/',
    '<rootDir>/ios/',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/index.ts',
    '!src/**/types.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react',
      },
    },
  },
};
