import React from "react";
import PropTypes from "prop-types";
import { useStorage } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
/* import CardHeader from "@material-ui/core/CardHeader"; */
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
/* import Avatar from "@material-ui/core/Avatar";
 */
const useStyles = makeStyles({
  root: {},
  media: {
    height: 140,
  },
});

TrashReportCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function TrashReportCard(props) {
  const classes = useStyles();
  const storage = useStorage();

  const [reportImageURL, setReportImageURL] = React.useState(null);
  /*   const [userProfile, setUserProfile] = React.useState(null);

  console.log("profile"); */

  const fetchImageURL = () => {
    if (reportImageURL === null) {
      storage
        .ref(props.data.images[0])
        .getDownloadURL()
        .then(function (url) {
          setReportImageURL(url);
        })
        .catch(function (error) {
          // Handle any errors
          console.log(error);
        });
    }
  };

  /* if (userProfile == null) {
    props.data.userProfile
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setUserProfile((state) => ({
            ...state,
            uid: doc.data().uid,
            displayName: doc.data().displayName,
            photoURL: doc.data().photoURL,
            isVerified: doc.data().isVerified,
            disabled: doc.data().disabled,
            createdAt: doc.data().createdAt,
          }));
        } else {
          console.log("No such document!");
        }
        fetchImageURL();
      })
      .catch(function (error) {
        // Handle any errors
      });
  } */

  fetchImageURL();

  return (
    <Card className={classes.root}>
      {/*       {userProfile != null && (
        <CardHeader
          avatar={<Avatar src={userProfile.photoURL} aria-label="profile picture"></Avatar>}
          title={userProfile.displayName}
          subheader={props.data.createdAt.toDate().toString()}
        />
      )} */}

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
