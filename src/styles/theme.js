import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      palette: {
        primary: {
          main: '#0053CB',
        },
      },
    },
  },
});
