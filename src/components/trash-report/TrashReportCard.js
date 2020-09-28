import React from "react";
import { useStorage } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  root: {},
  media: {
    height: 140,
  },
});

export default function TrashReportCard(props) {
  const classes = useStyles();
  const storage = useStorage();
  /* const db = useFirestore();

  const [userProfile, setUserProfile] = React.useState(null);

  if (userProfile == null) {
    db.doc(props.data.userProfile.path).get().then(function (querySnapshot) {
      console.log("profile");
      setUserProfile(querySnapshot.data);
    });
  } */

  const [reportImageURL, setReportImageURL] = React.useState(null);
  const [userProfile, setUserProfile] = React.useState(null);

  console.log("profile");
  if (reportImageURL === null) {
    storage;
    props.data.userProfile
      .get()
      .then(function (querySnapshot) {
        console.log("profile");
        setUserProfile(querySnapshot.data);
      })
      .catch(function (error) {
        // Handle any errors
      });
  }

  if (reportImageURL === null) {
    storage
      .ref(props.data.images[0])
      .getDownloadURL()
      .then(function (url) {
        setReportImageURL(url);
      })
      .catch(function (error) {
        // Handle any errors
      });
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={reportImageURL}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary">
          Share
        </Button>
        <Button size="small" color="secondary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
