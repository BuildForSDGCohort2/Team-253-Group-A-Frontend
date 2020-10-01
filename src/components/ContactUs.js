import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

const useStylesc = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  roots: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 20,
    padding: theme.spacing(1),
    backgroundColor: "#d6e4d6e6",
    color: "#023e07",
  },
  icon: {
    marginLeft: theme.spacing(1),
    fontSize: 15,
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
    <div>
      <Typography gutterBottom variant="h3" style={{ fontWeight: "bold" }}>
        Contact Us
      </Typography>
      <Paper className={classes.root}>
        <MailOutlineOutlinedIcon className={classes.message} />
        <TextField
          id="standard-full-width"
          style={{ margin: 8 }}
          placeholder="Full name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-full-width"
          style={{ margin: 8 }}
          placeholder="Email address"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-full-width"
          style={{ margin: 8 }}
          placeholder="Phone number"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-full-width"
          style={{ margin: 8 }}
          placeholder="Leave a message"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          Send
          <SendRoundedIcon className={classes.icon} />
        </Button>
      </Paper>
    </div>
  );
}
