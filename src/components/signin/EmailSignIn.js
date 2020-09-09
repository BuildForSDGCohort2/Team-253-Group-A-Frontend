import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
        <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={4}>
            <Grid item>
                <Typography variant="h6">
                    Sign in with your account
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField required id="email" type="email" fullWidth label="Email address" color="secondary"/>
            </Grid>
            <Grid item xs={12}>
                <TextField required id="password" fullWidth type="password" label="Password" color="secondary"/>
            </Grid>
            <Grid item>
                <Button variant="contained" color="secondary">
                    Sign in
                </Button>
            </Grid>
        </Grid>
        </form>
    </Paper>
  );
}