import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbarDummy: {
    ...theme.mixins.toolbar,
    marginBottom: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
  },
  contentBoundary: {
    flexGrow: 1,
    padding: theme.spacing(3),
    minHeight: '50vh',
  },
}));
