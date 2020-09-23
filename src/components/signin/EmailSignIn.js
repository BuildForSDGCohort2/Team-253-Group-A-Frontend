import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { useAuth } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";

import SocialSignInUp from "./SocialSignInUp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  authButton: {
    flexGrow: 1,
    width: "100%",
  },
  divider: {
    margin: theme.spacing(4),
  },
}));

export default function EmailSignIn() {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");

  const [backdropOpen, setbackdropOpen] = React.useState(false);
  const handlebackdropClose = () => {
    setbackdropOpen(false);
  };

  const auth = useAuth();

  const signIn = (event) => {
    event.preventDefault();

    setbackdropOpen(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        handlebackdropClose();
        handleAuthSuccess(result);
      })
      .catch((error) => {
        handlebackdropClose();
        const authErrors = {};
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/user-disabled" ||
          error.code === "auth/user-not-found"
        ) {
          authErrors.isEmail = true;
          authErrors.emailMessage = error.message;
        } else if (error.code === "auth/wrong-password") {
          authErrors.isPassword = true;
          authErrors.passwordMessage = error.message;
        }
        setErrors(authErrors);
      });
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
    setAlertOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  return (
    <Paper className={classes.root}>
      <form className={classes.root} autoComplete="on" onSubmit={signIn}>
        <Grid container spacing={4}>
          <Grid item>
            <Typography variant="h6">Log In</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="email"
              type="email"
              fullWidth
              label="Email address"
              color="secondary"
              error={errors.isEmail}
              helperText={errors.emailMessage}
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="password"
              fullWidth
              type="password"
              label="Password"
              color="secondary"
              error={errors.isPassword}
              helperText={errors.passwordMessage}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" align="right">
              <Link
                component={LinkRouter}
                color="secondary"
                to="/reset-password"
              >
                Forgot your password?
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              className={classes.authButton}
            >
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>

      <Typography
        align="center"
        variant="h6"
        className={classes.subTitle}
        gutterBottom
      >
        OR
      </Typography>
      <SocialSignInUp />
      <Typography align="center" variant="body2">
        By continuing, you agree to our's{" "}
        <Link component={LinkRouter} to="/terms-of-services" color="secondary">
          Terms of Service
        </Link>
        &nbsp;and{" "}
        <Link component={LinkRouter} to="/privacy-policy" color="secondary">
          Privacy Policy
        </Link>
        .
      </Typography>

      <Divider className={classes.divider} variant="middle" />

      <Typography gutterBottom variant="body2" align="center">
        You don&apos;t have an account yet?{" "}
        <Link component={LinkRouter} to="/register" color="secondary">
          Register
        </Link>
      </Typography>

      <Backdrop
        className={classes.backdrop}
        open={backdropOpen}
        onClick={handlebackdropClose}
      >
        <CircularProgress />
      </Backdrop>

      <Snackbar
        open={alertOpen}
        autoHideDuration={10000}
        onClose={handleCloseAlert}
      >
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
    </Paper>
  );
}
