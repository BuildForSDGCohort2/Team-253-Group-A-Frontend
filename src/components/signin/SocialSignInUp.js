import firebase from "firebase/app";

import React from "react";
import { useAuth } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import GoogleIcon from "../icons/GoogleIcon";
import TwitterIcon from "../icons/TwitterIcon";
import FacebookIcon from "../icons/FacebookIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
  },
  socialButton: {
    flexGrow: 1,
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textTransform: "none",
  },
  googleButton: {
    background: "#fff",
    color: "#000",
    "&:hover": {
      color: "#fff",
    },
  },
  facebookButton: {
    background: "#4267B2",
  },
  twitterButton: {
    background: "#1DA1F2",
  },
}));

export default function SocialSignInUp() {
  const classes = useStyles();
  const auth = useAuth();
  const [open, setOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");

  const signInGoogle = async () => {
    await auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        handleAuthSuccess(result);
      })
      .catch((error) => {
        handleAuthError(error);
      });
  };

  const signInTwitter = async () => {
    await auth
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then((result) => {
        handleAuthSuccess(result);
      })
      .catch((error) => {
        handleAuthError(error);
      });
  };

  const signInFacebook = async () => {
    await auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((result) => {
        handleAuthSuccess(result);
      })
      .catch((error) => {
        handleAuthError(error);
      });
  };

  const handleAuthError = (error) => {
    if (error.code === "auth/account-exists-with-different-credential") {
      setAlertMessage(error.message);
      setAlertSeverity("error");
      setOpen(true);
    }
  };

  const handleAuthSuccess = (data) => {
    if (data.additionalUserInfo.isNewUser) {
      setAlertMessage(
        "Welcome to CleanOut! you have been signed up successfully as " +
          data.additionalUserInfo.profile.email
      );
    } else {
      setAlertMessage(
        "Welcome back " + data.additionalUserInfo.profile.name + "!"
      );
    }

    setAlertSeverity("success");
    setOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Button
        className={classes.socialButton}
        classes={{
          root: classes.googleButton,
        }}
        variant="contained"
        size="large"
        onClick={signInGoogle}
        aria-label="Connect with Google"
        color="secondary"
        startIcon={<GoogleIcon fontSize="large" />}
      >
        Continue with Google
      </Button>

      <Button
        className={classes.socialButton}
        classes={{
          root: classes.twitterButton,
        }}
        variant="contained"
        size="large"
        onClick={signInTwitter}
        aria-label="Connect with Twitter"
        color="secondary"
        startIcon={<TwitterIcon fontSize="large" />}
      >
        Continue with Twitter
      </Button>

      <Button
        className={classes.socialButton}
        classes={{
          root: classes.facebookButton,
        }}
        variant="contained"
        size="large"
        onClick={signInFacebook}
        aria-label="Connect with Facebook"
        color="secondary"
        startIcon={<FacebookIcon fontSize="large" />}
      >
        Continue with Facebook
      </Button>

      <Snackbar open={open} autoHideDuration={10000} onClose={handleCloseAlert}>
        <Alert
          severity={alertSeverity}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseAlert}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
