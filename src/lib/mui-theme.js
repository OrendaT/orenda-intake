import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: `'DM Sans', sans-serif`,
  },
  palette: {
    primary: {
      main: '#000',
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: '#2E0086',
          '&.Mui-error': {
            color: '#2E0086',
          },
        },
        root: {
          color: '#000',
          zIndex: 1,
          backgroundColor: 'inherit',
          fontWeight: 500,
          '&.Mui-error': {
            color: '#000',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:before': {
            borderBottom: '2px solid #D1D1D1',
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: '2px solid #333',
          },
          '&.Mui-focused:before': {
            borderBottom: '2px solid #333',
          },
          '&:after': {
            borderBottom: '2px solid #333',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1D1D1',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#333',
          },
        },
      },
    },
    MuiSelect: {
      variants: {
        List: {
          styleOverrides: {
            scrollbarWidth: 'none',
          },
        },
      },
      style: {
        scrollbarWidth: 'none',
      },
      styleOverrides: {
        root: {
          scrollbarWidth: 'none',
        },
        list: {
          scrollbarWidth: 'none',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#000',
          textAlign: 'center',
        },
      },
    },
  },
});

export default theme;
