// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  'gray.720': '#293242',
  'gray.730': '#273040',
  'gray.740': '#252E3D',
  'gray.750': '#242C3A',
};

// 3. extend the theme
const theme = extendTheme({ config, colors });

export default theme;
