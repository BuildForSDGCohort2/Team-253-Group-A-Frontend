import React from "react";
import PropTypes from "prop-types";
import { Link as LinkRouter } from "react-router-dom";
import Link from "@material-ui/core/Link";
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
import ScheduleOutlined from "@material-ui/icons/ScheduleOutlined";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {},
  media: {
    position: "relative",
    height: 140,
  },
  cardHeader: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    background: "rgb(0,0,0)",
    // eslint-disable-next-line
    background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
  },
  cardTitle: {
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  reportDateFooter: { marginRight: "auto" },
  cardStatus: { marginLeft: "auto" },
  small: {
    width: 32,
    height: 32,
  },
  cardActionsContainer: {
    color: grey[500],
  },
});

TrashReportCard.propTypes = {
  data: PropTypes.object.isRequired,
  noHeader: PropTypes.bool,
};

TrashReportCard.defaultProps = { noHeader: false };

export default function TrashReportCard(props) {
  const classes = useStyles();
  const storage = useStorage();

  const trashReportPath = "/spots/view/" + props.data.id;

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
    <Card className={classes.root} variant="outlined">
      {loading ? (
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      ) : (
        <CardMedia className={classes.media} image={reportImageURL}>
          {!props.noHeader && (
            <CardHeader
              className={classes.cardHeader}
              avatar={
                loading ? (
                  <Skeleton animation="wave" variant="circle">
                    <Avatar />
                  </Skeleton>
                ) : (
                  <Link
                    component={LinkRouter}
                    to={`/profile/${userProfile.uid}`}
                  >
                    <Avatar
                      className={classes.small}
                      alt={userProfile.displayName}
                      src={userProfile.photoURL}
                      aria-label="profile picture"
                    />
                  </Link>
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
                  <Link
                    component={LinkRouter}
                    color="primary"
                    to={`/profile/${userProfile.uid}`}
                  >
                    {userProfile.displayName === undefined ||
                    userProfile.displayName == null
                      ? "CleanOut user"
                      : userProfile.displayName}
                  </Link>
                )
              }
              /* subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              <Moment fromNow>{props.data.createdAt.toDate()}</Moment>
            )
          } */
            />
          )}
        </CardMedia>
      )}
      <CardActionArea component={LinkRouter} to={trashReportPath}>
        <CardContent>
          {loading ? (
            <Skeleton
              animation="wave"
              height={21}
              style={{ marginBottom: 8 }}
              className={classes.cardTitle}
            />
          ) : (
            <Typography
              noWrap
              gutterBottom
              variant="subtitle2"
              className={classes.cardTitle}
            >
              {props.data.title}
            </Typography>
          )}
        </CardContent>

        {/* <Divider /> */}

        <CardActions className={classes.cardActionsContainer}>
          {loading ? (
            <Skeleton animation="wave" height={21} width="100%" />
          ) : (
            <React.Fragment>
              <ScheduleOutlined color="action" fontSize="small" />
              <Moment className={classes.reportDateFooter} fromNow>
                {props.data.createdAt.toDate()}
              </Moment>

              <div className={classes.cardStatus}>
                <TrashReportStatus tagId={props.data.statusId} />
              </div>
            </React.Fragment>
          )}
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
