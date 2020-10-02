import React from "react";
import { useAuth } from "reactfire";
import "../index.css";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { Link as LinkRouter } from "react-router-dom";

import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  extendedFab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  gap: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  danger: {
    color: "red",
  },
  alertbox: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Account() {
  const classes = useStyles();

  const auth = useAuth();
  let user = auth.currentUser;
  let userName = user.displayName;
  let credential;

  const deleteAccount = () => {
    user
      .reauthenticateWithCredential(credential)
      .then(function () {
        console.log("User re-authenticated");
      })
      .catch(function (err) {
        console.log("Re-authentication failed!!", err);
      });

    // user
    //   .delete()
    //   .then(function () {
    //     console.log("User deleted successfullly!");
    //   })
    //   .catch(function (err) {
    //     console.log("Sorry, user could not be deleted.", err);
    //   });
  };

  return (
    <div className="account-grid-container">
      <div className="account-grid-item1">
        <Avatar alt={userName} src="#" className={classes.large} />
        <p>{userName}</p>
        <div>
          <Button
            className={classes.gap}
            variant="outlined"
            color="secondary"
            component={LinkRouter}
            to="/updateprofile"
          >
            <Tooltip title="Edit">
              <EditIcon color="secondary" />
            </Tooltip>
            Edit profile
          </Button>
        </div>
        <div>
          <Button
            onClick={deleteAccount}
            className={classes.danger}
            variant="outlined"
          >
            Delete account
          </Button>
        </div>
      </div>
      <div className="account-grid-item2">
        <Typography
          component="div"
          variant="h4"
          style={{ color: "rgb(56 80 58)", height: "fit-content" }}
        >
          Your covid-spots info
        </Typography>
      </div>
      <div className="account-grid-item3">Content</div>
    </div>
  );
}
