import { createTheme } from '@mantine/core';

const themeMantine = createTheme({
  breakpoints: {
    lg: '74em',
    md: '64em',
    sm: '40em',
    xl: '90em',
    xs: '30em',
  },
  defaultRadius: 'md',
  fontFamily: 'Open Sans, Arial, Roboto, sans-serif',
});

export { themeMantine };
