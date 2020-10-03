import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import StarRateTwoToneIcon from "@material-ui/icons/StarRateTwoTone";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  textFieldLeft: {
    marginLeft: theme.spacing(0),
    marginRight: "3%",
    width: "47%",
  },
  textFieldRight: {
    marginLeft: "3%",
    marginRight: theme.spacing(0),
    width: "47%",
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 20,
    padding: theme.spacing(1),
    // backgroundColor: "#d6e4d6e6",
    backgroundColor: "#023e07",
    color: "white",
  },
  icon: {
    marginLeft: 2,
    marginBottom: 4,
    fontSize: 10,
    color: "red",
  },
  message: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 80,
    marginBottom: theme.spacing(5),
    color: "#1a9224e3",
  },
}));

export default function ContactUs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        gutterBottom
        variant="h3"
        style={{ fontWeight: "bold", color: "#023e07" }}
      >
        Get In Touch
      </Typography>
      <form noValidate autoComplete="off">
        <Typography>
          Name
          <StarRateTwoToneIcon className={classes.icon} />
        </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          margin="normal"
          className={classes.textFieldLeft}
          style={{
            backgroundColor: "white",
          }}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          margin="normal"
          className={classes.textFieldRight}
          style={{
            backgroundColor: "white",
          }}
        />
        <Typography>
          Email
          <StarRateTwoToneIcon className={classes.icon} />
        </Typography>
        <TextField
          id="outlined-full-width-static"
          variant="outlined"
          fullWidth
          margin="normal"
          style={{
            backgroundColor: "white",
          }}
        />
        <Typography>
          Comment or Message
          <StarRateTwoToneIcon className={classes.icon} />
        </Typography>
        <TextField
          id="outlined-multiline-static"
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          margin="normal"
          style={{
            backgroundColor: "white",
          }}
        />
      </form>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
      >
        Submit
      </Button>
    </div>
  );
}
