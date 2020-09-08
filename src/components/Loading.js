import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    alignContent: "center",
  },
}));


export default function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <CircularProgress color="secondary" />
    </div>
  );
}