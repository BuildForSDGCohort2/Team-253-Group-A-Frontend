import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
}));

export default function ContactUs(props) {
  const classes = useStyles();

  return (
    <div {...props} className={classes.root}>
      <form noValidate autoComplete="off">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5">
              Get In Touch
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0}>
              <TextField
                variant="outlined"
                type="text"
                required
                name="fullName"
                fullWidth
                label="Your Name"
                color="secondary"
                /* onChange={(e) => setLastName(e.target.value)} */
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0}>
              <TextField
                variant="outlined"
                type="email"
                required
                name="email"
                fullWidth
                label="Your email"
                color="secondary"
                /* onChange={(e) => setLastName(e.target.value)} */
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0}>
              <TextField
                variant="outlined"
                type="text"
                required
                name="subject"
                fullWidth
                label="Subject"
                color="secondary"
                /* onChange={(e) => setLastName(e.target.value)} */
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0}>
              <TextField
                variant="outlined"
                type="text"
                required
                name="email"
                fullWidth
                label="Your message"
                color="secondary"
                multiline
                rows={5}
                /* onChange={(e) => setLastName(e.target.value)} */
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_CLIENT_KEY} />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
