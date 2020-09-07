import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));


export default function GenericNotFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        Oops!! Not Found
    </div>
  );
}