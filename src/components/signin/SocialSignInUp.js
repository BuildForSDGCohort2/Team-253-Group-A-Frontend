import firebase from "firebase/app";

import React from "react";
import { useAuth } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

export default function SocialSignInUp(props) {
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
      <Typography variant="span">continue with:</Typography>
      <IconButton onClick={signInGoogle} aria-label="Connect with Google">
        <SvgIcon fontSize="large">
          <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
        </SvgIcon>
      </IconButton>
      <IconButton onClick={signInTwitter} aria-label="Connect with Twitter">
        <SvgIcon fontSize="large">
          <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
        </SvgIcon>
      </IconButton>
      <IconButton onClick={signInFacebook} aria-label="Connect with Facebook">
        <SvgIcon fontSize="large">
          <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
        </SvgIcon>
      </IconButton>

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
