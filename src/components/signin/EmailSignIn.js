import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));


export default function EmailSignIn() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        EmailSignIn
    </div>
  );
}