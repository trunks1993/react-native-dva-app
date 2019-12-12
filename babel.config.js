module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.js', '.ts', '.tsx', '.json', '.d.ts'],
        alias: {
          'pages/*': ['./pages/'],
          "models": ["./models/"],
        },
      },
    ],
  ],
};
