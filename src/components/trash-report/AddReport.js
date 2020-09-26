import firebase from "firebase/app";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import Box from "@material-ui/core/Box";
import {
  useStorage,
  useUser,
  useFirestore,
  useFirestoreCollectionData,
} from "reactfire";

import Chip from "@material-ui/core/Chip";
/* import DoneIcon from "@material-ui/icons/Done"; */

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

import GoogleMap from "google-map-react";
import Marker from "./Marker";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  imageUploadContainer: {
    backgroundColor: "#f3f3f3",
    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
    padding: theme.spacing(2),
    transitionDuration: "500ms",
    transitionProperty: "background-image,background-color",
    transitionTimingFunction: "ease",
  },
  imageUpload: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    padding: theme.spacing(2),
    cursor: "pointer",
    textAlign: "center",
    transitionDuration: "500ms",
    transitionProperty: "background-image,background-color",
    transitionTimingFunction: "ease",
    minHeight: 350,
  },
  addBorder: {
    boderWidth: 2,
    borderStyle: "dashed",
    borderColor: theme.palette.secondary.main,
  },
  formContentContainer: {
    flexGrow: 1,
  },
  formContentLine: {
    padding: theme.spacing(2),
  },
  locationContainer: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  spotTagsContainer: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  spotTags: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  paperWrapper: {
    padding: theme.spacing(2),
  },
}));

export default function AddTrashReport() {
  const classes = useStyles();
  const user = useUser();
  const storage = useStorage();
  const firestore = useFirestore();

  // eslint-disable-next-line
  const [mapsApi, setMapsApi] = React.useState(null);
  /* const [mapGeocoder, setMapGeocoder] = React.useState(null); */

  // eslint-disable-next-line
  const [selectedFile, setSelectedFile] = React.useState(null);

  const [selectedFileURL, setSelectedFileURL] = React.useState("");
  const [reservedReportID, setReservedReportID] = React.useState("");
  const [remoteUploadRef, setRemoteUploadRef] = React.useState(null);
  const [uploadProgress, setUploadProgress] = React.useState(-1);

  const [reportLocation, setReportLocation] = React.useState(null);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      setReportLocation(
        new firebase.firestore.GeoPoint(
          position.coords.latitude,
          position.coords.longitude
        )
      );
    });
  }

  const [tagsData, setTagsData] = React.useState({ tags: [] });

  const defaultTagsRef = useFirestore().collection("report-tags");
  let tags = useFirestoreCollectionData(defaultTagsRef);
  if (tagsData.tags.length === 0) {
    setTagsData(
      tags.reduce(
        (options, option) => ({
          ...options,
          tags: tags,
          [option.id]: false,
        }),
        {}
      )
    );
  }

  if (reservedReportID === "") {
    setReservedReportID(firestore.collection("spots").doc().id);
  }

  const saveTrashReport = (event) => {
    event.preventDefault();
  };

  const handleImageUpload = (event) => {
    let mFile = event.target.files[0];

    if (remoteUploadRef != null) {
      // Delete the file
      remoteUploadRef
        .delete()
        .then(function () {
          // File deleted successfully
        })
        .catch(function () {
          // Uh-oh, an error occurred!
        });
    }

    if (mFile == null) {
      setSelectedFileURL("");
    } else {
      setSelectedFile(mFile);
      setSelectedFileURL(URL.createObjectURL(mFile));

      let mRemoteUploadRef = storage
        .ref()
        .child(user.uid)
        .child("spots")
        .child(reservedReportID + "/" + mFile.name);

      var uploadTask = mRemoteUploadRef.put(mFile);

      uploadTask.on(
        "state_changed",
        function (snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
            default: //nothing
          }
        },
        function () {
          // Handle unsuccessful uploads
          setUploadProgress(-1);
        },
        function () {
          setRemoteUploadRef(mRemoteUploadRef);
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log("File available at", downloadURL);
            setUploadProgress(-1);
          });
        }
      );
    }
  };

  /*  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  }; */

  // Fit map to its bounds after the api is loaded
  const mapApiIsLoaded = (maps) => {
    setMapsApi(maps);
    /*setMapGeocoder(new maps.Geocoder()); */
  };

  const handleGoogleMapClick = ({ lat, lng }) => {
    setReportLocation(new firebase.firestore.GeoPoint(lat, lng));
  };

  const handleTagChange = (tag) => () => {
    setTagsData((prevState) => ({
      ...prevState,
      [tag.id]: !prevState[tag.id],
    }));
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper>
        <form autoComplete="off" noValidate onSubmit={saveTrashReport}>
          <Box display="none">
            <input
              required
              name="spotImage"
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleImageUpload}
            />
          </Box>
          <div
            className={classes.imageUploadContainer}
            style={{ backgroundImage: `url(${selectedFileURL})` }}
          >
            <label htmlFor="contained-button-file">
              <div
                className={clsx(
                  classes.imageUpload,
                  selectedFileURL === "" && classes.addBorder
                )}
              >
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  size="large"
                  startIcon={<AddAPhoto />}
                >
                  {clsx(
                    "",
                    selectedFileURL === "" && "Add",
                    selectedFileURL !== "" && "Replace"
                  )}{" "}
                  Photo
                </Button>
              </div>
            </label>
          </div>
          <LinearProgress
            color={clsx(
              (uploadProgress === -1 || selectedFileURL === "") && "primary",
              uploadProgress !== -1 && "secondary"
            )}
            variant="determinate"
            value={uploadProgress}
          />

          <div className={classes.formContentContainer}>
            <div className={classes.formContentLine}>
              <TextField
                required
                name="title"
                fullWidth
                label="Name your spot"
                placeholder="placeholder"
                color="secondary"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className={classes.formContentLine}>
              <TextField
                required
                name="desc"
                fullWidth
                label="Describe your spot"
                placeholder="Add more details to decribe the situation"
                color="secondary"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
              />
            </div>

            <div className={classes.spotTagsContainer}>
              <Paper
                variant="outlined"
                elevation={0}
                className={classes.paperWrapper}
              >
                <Typography gutterBottom variant="h6" component="div">
                  Tag your spot:
                </Typography>
                <div className={classes.spotTags}>
                  {tagsData["tags"].map((tag) => {
                    return (
                      <Chip
                        key={tag.id}
                        label={tag.name}
                        {...(!tagsData[tag.id] && {
                          onClick: handleTagChange(tag),
                        })}
                        {...(tagsData[tag.id] && {
                          onDelete: handleTagChange(tag),
                        })}
                        color={clsx(
                          !tagsData[tag.id] && "default",
                          tagsData[tag.id] && "secondary"
                        )}
                      />
                    );
                  })}
                </div>
              </Paper>
            </div>

            <div className={classes.formContentLine}>
              <Paper
                variant="outlined"
                elevation={0}
                className={classes.locationContainer}
              >
                <Typography gutterBottom variant="h6">
                  Select spot location
                </Typography>
                <div style={{ height: "350px", width: "100%" }}>
                  <GoogleMap
                    bootstrapURLKeys={{
                      key: process.env.REACT_APP_FIREBASE_APIKEY,
                    }}
                    center={
                      reportLocation != null
                        ? {
                            lat: reportLocation.latitude,
                            lng: reportLocation.longitude,
                          }
                        : { lat: 34.7398, lng: 10.76 }
                    }
                    defaultZoom={10}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) =>
                      mapApiIsLoaded(map, maps)
                    }
                    onClick={handleGoogleMapClick}
                  >
                    {reportLocation != null && (
                      <Marker
                        lat={reportLocation.latitude}
                        lng={reportLocation.longitude}
                      />
                    )}
                  </GoogleMap>
                </div>
              </Paper>
            </div>
            <div className={classes.formContentLine}>
              <Button type="submit" variant="contained" color="secondary">
                Create Report
              </Button>
            </div>
          </div>
        </form>
      </Paper>
    </Container>
  );
}
