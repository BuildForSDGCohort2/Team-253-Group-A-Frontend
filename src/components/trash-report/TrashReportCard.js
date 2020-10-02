import React from "react";
import PropTypes from "prop-types";
import { Link as LinkRouter } from "react-router-dom";
import { useStorage } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TrashReportStatus from "./TrashReportStatus";
import Avatar from "@material-ui/core/Avatar";
import Moment from "react-moment";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  root: {},
  media: {
    height: 140,
  },
  cardTitle: {
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

TrashReportCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function TrashReportCard(props) {
  const classes = useStyles();
  const storage = useStorage();

  const trashReportPath = "/spots/" + props.data.id;

  const [loading, setLoading] = React.useState(true);
  const [firstLoad, setFirstLoad] = React.useState(true);

  const [reportImageURL, setReportImageURL] = React.useState(
    props.data.images[0].downloadUrl
  );
  const [userProfile, setUserProfile] = React.useState(null);

  const fetchImageURL = () => {
    if (reportImageURL === undefined) {
      storage
        .ref(props.data.images[0].storagePath)
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

  const fetchUserProfile = () => {
    if (userProfile == null) {
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
        })
        .catch(function (error) {
          // Handle any errors
          console.log(error);
        });
    }
  };

  if (firstLoad) {
    fetchUserProfile();
    fetchImageURL();
    setFirstLoad(false);
  }

  React.useEffect(() => {
    if (userProfile != null) setLoading(false);
  }, [userProfile]);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circle">
              <Avatar />
            </Skeleton>
          ) : (
            <Avatar
              alt={userProfile.displayName}
              src={userProfile.photoURL}
              aria-label="profile picture"
            />
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            userProfile.displayName
          )
        }
        subheader={<Moment fromNow>{props.data.createdAt.toDate()}</Moment>}
      />

      <CardActionArea component={LinkRouter} to={trashReportPath}>
        <CardMedia className={classes.media} image={reportImageURL} />
        <CardContent>
          <Typography
            noWrap
            gutterBottom
            variant="subtitle2"
            className={classes.cardTitle}
          >
            {props.data.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.data.description}
          </Typography>
        </CardContent>

        <CardActions>
          <TrashReportStatus
            className={classes.cardStatus}
            tagId={props.data.statusId}
          />
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
