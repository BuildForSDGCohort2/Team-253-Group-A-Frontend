import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));


export default function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        about
    </div>
  );
}