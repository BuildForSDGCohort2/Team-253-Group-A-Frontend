import React from "react";
import { useAuth } from "reactfire";
import { Link as LinkRouter } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";

import SocialSignInUp from "../signin/SocialSignInUp";

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

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const [backdropOpen, setbackdropOpen] = React.useState(false);
  const handlebackdropClose = () => {
    setbackdropOpen(false);
  };

  const auth = useAuth();

  const registerNewUser = (event) => {
    event.preventDefault();

    setbackdropOpen(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth.currentUser
          .updateProfile({
            displayName: firstName + " " + lastName,
          })
          .then(
            function () {
              handlebackdropClose();
            },
            function () {
              handlebackdropClose();
            }
          );
      })
      .catch((error) => {
        handlebackdropClose();
        const authErrors = {};
        if (
          error.code === "auth/weak-password" ||
          error.code === "auth/invalid-email"
        ) {
          authErrors.isPassword = true;
          authErrors.passwordMessage = error.message;
        } else if (error.code === "auth/email-already-in-use") {
          authErrors.isEmail = true;
          authErrors.emailMessage = error.message;
        }
        setErrors(authErrors);
      });
  };

  return (
    <Paper className={classes.root}>
      <form
        className={classes.root}
        autoComplete="on"
        onSubmit={registerNewUser}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h6">Sign Up</Typography>
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              required
              name="firstName"
              fullWidth
              label="First name"
              color="secondary"
              defaultValue={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              required
              name="lastName"
              fullWidth
              label="Last name"
              color="secondary"
              defaultValue={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
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
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              className={classes.authButton}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      <Typography align="center" variant="h6" gutterBottom>
        OR
      </Typography>
      <SocialSignInUp />
      <Typography align="center" variant="body2">
        By continuing, you agree to our&apos;s{" "}
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
        Already have an account?{" "}
        <Link component={LinkRouter} to="/signin" color="secondary">
          Log In
        </Link>
      </Typography>

      <Backdrop
        className={classes.backdrop}
        open={backdropOpen}
        onClick={handlebackdropClose}
      >
        <CircularProgress />
      </Backdrop>
    </Paper>
  );
}
