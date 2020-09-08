import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
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