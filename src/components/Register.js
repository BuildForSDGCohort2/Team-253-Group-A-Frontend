import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));


export default function Register() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        Register
    </div>
  );
}