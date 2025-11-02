module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@screen': './src/presentation/screens',
          '@navigation': './src/presentation/navigation',
          '@state': './src/presentation/state',
          '@components': './src/presentation/components',
          '@hooks': './src/presentation/hooks',
          '@api': './src/infrastructure/api',
          '@domain': './src/domain/',
          '@application': './src/application',
          '@constants': './src/shared',
          '@mocks': './src/__mocks__',
        },
      },
    ],
  ],
};
