import React from 'react';
import {Link as LinkRouter} from 'react-router-dom';
import Link from '@material-ui/core/Link';
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
        <form className={classes.root} validate autoComplete="off">
        <Grid container spacing={4}>
            <Grid item>
                <Typography variant="h6">
                    Sign up for a free account
                </Typography>
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField required id="first-name" fullWidth label="First name" color="secondary"/>
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField required id="last-name" fullWidth label="Last name" color="secondary"/>
            </Grid>
            <Grid item xs={12}>
                <TextField required id="email" type="email" fullWidth label="Email address" color="secondary"/>
            </Grid>
            <Grid item xs={12}>
                <TextField required id="password" fullWidth type="password" label="Password" color="secondary"/>
            </Grid>
            <Grid item>
                <Typography variant="body2">
                I have read and I do accept&nbsp;  
                 <Link component={LinkRouter} to="/terms-of-services" color="secondary" >terms of services</Link> 
                 &nbsp;and <Link component={LinkRouter} to="/privacy-policy" color="secondary" >privacy policy</Link>.
                </Typography>
            </Grid>
            <Grid item>
                <Button variant="contained" color="secondary">
                    Register
                </Button>
            </Grid>
        </Grid>
        </form>
    </Paper>
  );
}