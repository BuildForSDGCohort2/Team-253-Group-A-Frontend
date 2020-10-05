import firebase from "firebase/app";
import React from "react";
import { useFirestore } from "reactfire";
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

export default function ContactUs() {
  const classes = useStyles();
  const db = useFirestore();

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isNotRobot, setIsNotRobot] = React.useState(false);

  const [errors, setErrors] = React.useState({});

  const onRecaptchaSuccess = (value) => {
    console.log("not robot ok " + value);
    setIsNotRobot(true);
  };

  const submitContactRequest = (event) => {
    event.preventDefault();

    let contactErrors = {};
    //check fuul name
    if (fullName.length === 0) {
      contactErrors.isFullName = true;
      contactErrors.fullNameMsg = "This field is required";
    }
    //check email
    if (email.length === 0) {
      contactErrors.isEmail = true;
      contactErrors.emailMsg = "This field is required";
    }
    //check subject
    if (subject.length === 0) {
      contactErrors.isSubject = true;
      contactErrors.subjectMsg = "This field is required";
    }
    //check message
    if (message.length === 0) {
      contactErrors.isMessage = true;
      contactErrors.messageMsg = "This field is required";
    }

    if (
      !contactErrors.isFullName &&
      !contactErrors.isEmail &&
      !contactErrors.isSubject &&
      !contactErrors.isMessage &&
      isNotRobot
    ) {
      console.log("submitting");
      db.collection("contact-request")
        .add({
          fullName: fullName,
          email: email,
          subject: subject,
          message: message,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    } else {
      setErrors(contactErrors);
    }
  };

  return (
    <div className={classes.root}>
      <form autoComplete="on" onSubmit={submitContactRequest}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5">
              Get In Touch
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0}>
              <TextField
                error={errors.isFullName}
                variant="outlined"
                type="text"
                required
                name="fullName"
                fullWidth
                label="Your Name"
                color="secondary"
                onChange={(e) => setFullName(e.target.value)}
                helperText={errors.fullNameMsg}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0}>
              <TextField
                error={errors.isEmail}
                variant="outlined"
                type="email"
                required
                name="email"
                fullWidth
                label="Your email"
                color="secondary"
                onChange={(e) => setEmail(e.target.value)}
                helperText={errors.emailMsg}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0}>
              <TextField
                error={errors.isSubject}
                variant="outlined"
                type="text"
                required
                name="subject"
                fullWidth
                label="Subject"
                color="secondary"
                onChange={(e) => setSubject(e.target.value)}
                helperText={errors.subjectMsg}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0}>
              <TextField
                error={errors.isMessage}
                variant="outlined"
                type="text"
                required
                name="email"
                fullWidth
                label="Your message"
                color="secondary"
                multiline
                rows={5}
                onChange={(e) => setMessage(e.target.value)}
                helperText={errors.messageMsg}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_CLIENT_KEY}
              onChange={onRecaptchaSuccess}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
