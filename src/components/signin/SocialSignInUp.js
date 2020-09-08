import firebase from 'firebase/app';

import React from 'react';
import { useAuth } from 'reactfire';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  socialButton: {
    flexGrow: 1,
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


export default function SocialSignInUp() {
  const classes = useStyles();

  const auth = useAuth();

  const signInGoogle = async () => {
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  const signInTwitter = async () => {
    await auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  };

  const signInFacebook = async () => {
    await auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  };

  return (
    <Paper className={classes.root}>
        <Button className={classes.socialButton} size="large" variant="outlined" color="secondary" onClick={signInGoogle}>
            with Google
        </Button>
        <Button className={classes.socialButton} size="large" variant="outlined" color="secondary" onClick={signInTwitter}>
            with Twitter
        </Button>
        <Button className={classes.socialButton} size="large" variant="outlined" color="secondary" onClick={signInFacebook}>
            with Facebook
        </Button>
    </Paper>
  );
}
