import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
      contrastText:'#008F0E',
    },
    secondary: {
      main: '#008F0E',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#dedede',
    },
  },
  typography: {
    subtitle1: {
      fontWeight: 500,
    },
  },
});

export default theme;