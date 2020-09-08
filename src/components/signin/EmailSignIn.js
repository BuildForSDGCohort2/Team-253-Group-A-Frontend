import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));


export default function EmailSignIn() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
        EmailSignIn
    </Paper>
  );
}