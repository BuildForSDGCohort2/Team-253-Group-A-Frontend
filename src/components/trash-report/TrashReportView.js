import React from "react";
import { useFirestore } from "reactfire";
import { Link as LinkRouter, useParams } from "react-router-dom";
import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import * as APP_ROUTES from "../../constants/routes";
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
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Divider from "@material-ui/core/Divider";
/* import GoogleMap from "google-map-react";
import Marker from "./Marker"; */

import {
  GoogleMap as GoogleMapApi,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 0,
    paddingTop: "30%",
    backgroundColor: "#f7f7f7",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  cardTitle: {},
  reportDateFooter: { marginRight: "auto" },
  cardStatus: { marginLeft: "auto" },
  detailsTitle: {
    margin: theme.spacing(2),
  },
  detailsContent: {
    margin: theme.spacing(2),
  },
  imagesTitle: {
    margin: "16px 32px",
  },
}));

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
  const [reportExists, setReportExists] = React.useState(true);

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
        setReportExists(false);
      }
    });
  }

  if (reportExists) {
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <CardHeader
            avatar={
              loading ? (
                <Skeleton animation="wave" variant="circle">
                  <Avatar />
                </Skeleton>
              ) : (
                <Link
                  component={LinkRouter}
                  to={APP_ROUTES.PROFILE + "/" + userProfile.uid}
                >
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
                  to={APP_ROUTES.PROFILE + "/" + userProfile.uid}
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

          <Divider variant="middle" />

          {loading ? (
            <Skeleton
              animation="wave"
              height={41}
              className={classes.detailsTitle}
            />
          ) : (
            <React.Fragment>
              <Typography variant="h4" className={classes.detailsTitle}>
                <LocationOnOutlinedIcon /> Spot Location
              </Typography>
            </React.Fragment>
          )}

          <LoadScript googleMapsApiKey={process.env.REACT_APP_FIREBASE_APIKEY}>
            <GoogleMapApi
              id="map-view"
              mapContainerStyle={{display: "block", height: "250px", width: "100%" }}
              center={
                data != null
                  ? {
                      lat: data.location.latitude,
                      lng: data.location.longitude,
                    }
                  : { lat: 34.7398, lng: 10.76 }
              }
              zoom={16}
            >
              {data != null && (
                <Marker
                  position={{
                    lat: data.location.latitude,
                    lng: data.location.longitude,
                  }}
                />
              )}
            </GoogleMapApi>
          </LoadScript>

          {loading ? (
            <Skeleton
              animation="wave"
              height={41}
              className={classes.detailsTitle}
            />
          ) : (
            <React.Fragment>
              <Typography variant="h4" className={classes.detailsTitle}>
                <InfoOutlinedIcon /> Spot Details
              </Typography>
              <Divider variant="middle" />
            </React.Fragment>
          )}

          <div className={classes.detailsContent}>
            {loading ? (
              <Skeleton
                animation="wave"
                height={21}
                style={{ marginBottom: 8 }}
                className={classes.cardTitle}
              />
            ) : (
              <Typography
                gutterBottom
                variant="h6"
                className={classes.cardTitle}
              >
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
          </div>
        </CardContent>

        {loading ? (
          <Skeleton
            animation="wave"
            height={41}
            className={classes.imagesTitle}
          />
        ) : (
          <Typography variant="h4" className={classes.imagesTitle}>
            <ImageOutlinedIcon /> Spot Images
          </Typography>
        )}

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
      </Card>
    );
  } else {
    return <GenericNotFound />;
  }
}
