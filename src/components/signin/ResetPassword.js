import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { useAuth } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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
}));

export default function ResetPassword() {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");

  const [backdropOpen, setbackdropOpen] = React.useState(false);
  const handlebackdropClose = () => {
    setbackdropOpen(false);
  };

  const auth = useAuth();

  const resetPassword = (event) => {
    event.preventDefault();

    setbackdropOpen(true);
    auth
      .sendPasswordResetEmail(email)
      .then(function (result) {
        handlebackdropClose();
        handleAuthSuccess(result);
      })
      .catch(function (error) {
        console.log(error);
        handlebackdropClose();
        const authErrors = {};
        authErrors.isEmail = true;
        authErrors.emailMessage = error.message;
        setErrors(authErrors);
      });
  };

  const handleAuthSuccess = (data) => {
    console.log(data);
    setAlertMessage("A password reset email to " + email);

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
    <Container maxWidth="sm">
      <Paper className={classes.root}>
        <form
          className={classes.root}
          autoComplete="on"
          onSubmit={resetPassword}
        >
          <Grid container spacing={4}>
            <Grid item>
              <Typography variant="h6">Reset your password</Typography>
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
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                className={classes.authButton}
              >
                Reset Password
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                <Link component={LinkRouter} to="/signin" color="secondary">
                  Go back to sign in page
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>

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
    </Container>
  );
}
