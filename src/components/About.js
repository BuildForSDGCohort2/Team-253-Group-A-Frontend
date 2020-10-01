import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  teamTitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  profilePicture: {
    width: "100%",
    height: "auto",
    backgroundColor: theme.palette.secondary.main,
    "&::after": {
      content: "' '",
      display: "block",
      paddingBottom: "100%",
    },
    marginBottom: theme.spacing(2),
  },
}));

export default function About() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography gutterBottom variant="h4">
          About Us
        </Typography>

        <Typography gutterBottom paragraph variant="body1" component="p">
          CleanOut is a web app built by Team 253 Group A of Build for SDG
          Cohort 2 Challenge 2020, sponsored by Facebook and Andela.
        </Typography>

        <Typography gutterBottom paragraph variant="body1" component="p">
          This app uses the power of AI to detect COVID-19 trash from pictures.
        </Typography>

        <Typography gutterBottom paragraph variant="body1" component="p">
          Users are required to take a snapshot or video of a location and
          upload it on the app. Then the AI model detects possible COVID-19
          trash like glove, mask, sanitizer or tissues on the image. The image
          and location are then forwarded to cleanup agencies.
        </Typography>
      </Paper>
      <Typography
        className={classes.teamTitle}
        align="center"
        gutterBottom
        variant="h5"
      >
        Team Members
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={6} sm={3}>
          <Avatar
            src="https://avatars1.githubusercontent.com/u/45902355?s=460&u=ffbc0cc593f575d67140e4197eec449a412a08c9&v=4"
            component="div"
            className={classes.profilePicture}
          >
            SB
          </Avatar>
          <Typography
            align="center"
            gutterBottom
            variant="subtitle1"
            component="div"
          >
            Sofia Bourhim
          </Typography>
          <Typography
            align="center"
            gutterBottom
            variant="caption"
            component="div"
          >
            Morocco
          </Typography>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Avatar
            src="https://avatars2.githubusercontent.com/u/27445092?s=460&u=349cffccfccda38293e4aab20868a77b60079274&v=4"
            component="div"
            className={classes.profilePicture}
          >
            SE
          </Avatar>
          <Typography
            align="center"
            gutterBottom
            variant="subtitle1"
            component="div"
          >
            Sara El-Ateif
          </Typography>
          <Typography
            align="center"
            gutterBottom
            variant="caption"
            component="div"
          >
            Morocco
          </Typography>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Avatar
            src="https://avatars2.githubusercontent.com/u/46009285?s=460&v=4"
            component="div"
            className={classes.profilePicture}
          >
            OC
          </Avatar>
          <Typography
            align="center"
            gutterBottom
            variant="subtitle1"
            component="div"
          >
            Ojoechem Chinonso
          </Typography>
          <Typography
            align="center"
            gutterBottom
            variant="caption"
            component="div"
          >
            Nigeria
          </Typography>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Avatar
            src="https://avatars1.githubusercontent.com/u/297917?s=460&v=4"
            component="div"
            className={classes.profilePicture}
          >
            KH
          </Avatar>
          <Typography
            align="center"
            gutterBottom
            variant="subtitle1"
            component="div"
          >
            Khalil Hammami
          </Typography>
          <Typography
            align="center"
            gutterBottom
            variant="caption"
            component="div"
          >
            Tunisia
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
