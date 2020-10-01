import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import { useUser } from "reactfire";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardContainer: {
    backgroundColor: "white",
    marginTop: "-1px",
    minHeight: "500px",
    width: "90%",
    position: "absolute",
    top: "5%",
    left: "5%",
    // boxShadow: '0 1px 10px 1px #000',
  },
  upperContainer: {
    backgroundColor: "#909e90",
    width: "100%",
    height: "200px",
    position: "relative",
  },
  imageContainer: {
    padding: "5px",
    transform: "translate(40%, 150px)",
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
  },
  profilePicture: {
    width: "100px",
    height: "auto",
    backgroundColor: "white",
    borderRadius: "50%",
  },
  lowerContainer: {
    paddingTop: theme.spacing(9),
  },
}));

export default function About() {
  const classes = useStyles();

  const user = useUser();
  const userDisplayName = user.displayName;

  return (
    <div className={classes.root}>
      <div className={classes.cardContainer}>
        <div className={classes.upperContainer}>
          <div className={classes.imageContainer}>
            <Avatar
              src="https://lh5.googleusercontent.com/-thjP_h32BME/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucm8jrHp5vHhWlhY-BkpVL0BcxLAuQ/photo.jpg"
              component="div"
              className={classes.profilePicture}
            >
              SB
            </Avatar>
          </div>
        </div>
        <div className={classes.lowerContainer}>
          <Typography
            align="center"
            gutterBottom
            variant="subtitle1"
            component="div"
          >
            {userDisplayName}
          </Typography>
        </div>
      </div>
    </div>
  );
}
