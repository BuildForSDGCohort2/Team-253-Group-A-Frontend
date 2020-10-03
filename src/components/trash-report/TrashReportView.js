import React from "react";
import { useFirestore } from "reactfire";
import { Link as LinkRouter, useParams } from "react-router-dom";
import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GenericNotFound from "../404";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TrashReportStatus from "./TrashReportStatus";
import Avatar from "@material-ui/core/Avatar";
import Moment from "react-moment";
import Skeleton from "@material-ui/lab/Skeleton";

import GoogleMap from "google-map-react";
import Marker from "./Marker";

const useStyles = makeStyles({
  root: {},
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "#f7f7f7",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  cardTitle: {},
  reportDateFooter: { marginRight: "auto" },
  cardStatus: { marginLeft: "auto" },
});

/* let firstLoad = true; */
let reportExists = true;

TrashReportView.propTypes = {
  reportId: PropTypes.string,
};

export default function TrashReportView(props) {
  const classes = useStyles();
  const db = useFirestore();
  let { id } = useParams();

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [userProfile, setUserProfile] = React.useState(null);
  const [firstLoad, setFirstLoad] = React.useState(true);

  if (id === undefined) {
    if (props.reportId !== undefined && props.reportId.length > 0) {
      id = props.reportId;
    } else return null;
  }

  if (firstLoad) {
    console.log("query report view");
    setFirstLoad(false);
    let reportDbRef = db.collection("spots").doc(id);

    reportDbRef.get().then(function (doc) {
      if (doc.exists) {
        setData(doc.data());
        doc
          .data()
          .userProfile.get()
          .then(function (profileDoc) {
            if (doc.exists) {
              setUserProfile(profileDoc.data());
            } else {
              console.log("No such document!");
            }
            setLoading(false);
          })
          .catch(function (error) {
            // Handle any errors
            console.log(error);
            setLoading(false);
          });
      } else {
        reportExists = false;
      }
    });
  }

  if (reportExists) {
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            loading ? (
              <Skeleton animation="wave" variant="circle">
                <Avatar />
              </Skeleton>
            ) : (
              <Link component={LinkRouter} to={`/profile/${userProfile.uid}`}>
                <Avatar
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
                color="secondary"
                to={`/profile/${userProfile.uid})`}
              >
                {userProfile.displayName === undefined ||
                userProfile.displayName == null
                  ? "CleanOut user"
                  : userProfile.displayName}
              </Link>
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              <Moment fromNow>{data.createdAt.toDate()}</Moment>
            )
          }
          action={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              <TrashReportStatus tagId={data.statusId} />
            )
          }
        />

        {loading ? (
          <Skeleton animation="wave" variant="rect" className={classes.media} />
        ) : (
          <CardMedia>
            <div
              component="img"
              className={classes.media}
              style={{ backgroundImage: `url(${data.images[0].downloadUrl})` }}
            />
          </CardMedia>
        )}
        <CardContent>
          {loading ? (
            <Skeleton
              animation="wave"
              height={21}
              style={{ marginBottom: 8 }}
              className={classes.cardTitle}
            />
          ) : (
            <Typography gutterBottom variant="h6" className={classes.cardTitle}>
              {data.title}
            </Typography>
          )}

          {loading ? (
            <Skeleton animation="wave" height={21} />
          ) : (
            <Typography gutterBottom variant="body2" paragraph>
              {data.description}
            </Typography>
          )}

          <div style={{ height: "350px", width: "100%" }}>
            <GoogleMap
              bootstrapURLKeys={{
                key: process.env.REACT_APP_FIREBASE_APIKEY,
              }}
              center={
                data != null
                  ? {
                      lat: data.location.latitude,
                      lng: data.location.longitude,
                    }
                  : { lat: 34.7398, lng: 10.76 }
              }
              defaultZoom={16}
            >
              {data != null && (
                <Marker
                  lat={data.location.latitude}
                  lng={data.location.longitude}
                />
              )}
            </GoogleMap>
          </div>
        </CardContent>
      </Card>
    );
  } else {
    return <GenericNotFound />;
  }
}
