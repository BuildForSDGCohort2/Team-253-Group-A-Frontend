import firebase from "firebase/app";
import React from "react";
import { useHistory } from "react-router-dom";
import { useStorage, useUser, useFirestore } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import Box from "@material-ui/core/Box";

import Chip from "@material-ui/core/Chip";
import SvgIcon from "@material-ui/core/SvgIcon";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import GoogleMap from "google-map-react";
import Marker from "./Marker";

import Loading from "../Loading";
import ImageAnalyseStepper from "./ImageAnalyseStepper";

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
    position: "relative",
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
  errorMessageContainer: {
    margin: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function AddTrashReport() {
  const classes = useStyles();
  const user = useUser();
  const storage = useStorage();
  const db = useFirestore();
  let history = useHistory();

  const reportFirestoreRef = db.collection("spots");
  const defaultTagsRef = db.collection("report-tags");

  // eslint-disable-next-line
  const [mapsApi, setMapsApi] = React.useState(null);
  /* const [mapGeocoder, setMapGeocoder] = React.useState(null); */

  // eslint-disable-next-line
  const [selectedFile, setSelectedFile] = React.useState(null);

  const [selectedFileURL, setSelectedFileURL] = React.useState("");
  const [reservedReportID, setReservedReportID] = React.useState("");
  const [remoteUploadRef, setRemoteUploadRef] = React.useState(null);
  const [imageDownloadUrl, setImageDownloadUrl] = React.useState(null);
  const [uploadProgress, setUploadProgress] = React.useState(-1);
  const [imageAnalyseActiveStep, setImageAnalyseActiveStep] = React.useState(0);

  const [reporTitle, setReportTitle] = React.useState("");
  const [reportDescription, setReportDescription] = React.useState("");

  const [reportLocation, setReportLocation] = React.useState(null);

  const [isSaving, setIsSaving] = React.useState(false);

  const [errors, setErrors] = React.useState({});

  if (reservedReportID === "") {
    setReservedReportID(reportFirestoreRef.doc().id);
  }

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

  if (tagsData.tags.length === 0) {
    defaultTagsRef.get().then(function (querySnapshot) {
      let tags = [];
      querySnapshot.forEach(function (doc) {
        tags = [...tags, doc.data()];
      });
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
    });
  }

  const saveTrashReport = (event) => {
    event.preventDefault();
    setIsSaving(true);
    const validateErrors = {};
    let trashReport = { uid: user.uid, id: reservedReportID };
    trashReport.userProfile = db.collection("profiles").doc(user.uid);

    //check image
    if (selectedFile != null && remoteUploadRef != null) {
      trashReport.images = [
        {
          storagePath: remoteUploadRef.fullPath,
          downloadUrl: imageDownloadUrl,
        },
      ];
    } else {
      // handle image required
      validateErrors.isImage = true;
      validateErrors.imageMsgError = "You need to upload a photo for the spot.";
    }

    //check title
    if (reporTitle.length > 0) {
      trashReport.title = reporTitle;
    } else {
      // handle title required
      validateErrors.isTitle = true;
      validateErrors.titleMsgError = "You must give the spot a name.";
    }

    //check description
    if (reportDescription.length > 0) {
      trashReport.description = reportDescription;
    } else {
      // handle description required
      validateErrors.isDescription = true;
      validateErrors.descriptionMsgError =
        "Please write some details about the state of the spot.";
    }

    //check location
    if (reportLocation != null) {
      trashReport.location = reportLocation;
    } else {
      // handle location required
      validateErrors.isLocation = true;
      validateErrors.locationMsgError = "Location is required.";
    }

    trashReport.createdAt = firebase.firestore.Timestamp.fromDate(new Date());

    //tags
    trashReport.tags = [];
    Object.keys(tagsData)
      .filter((tag) => tag !== "tags")
      .filter((tag) => tagsData[tag])
      .forEach((tag) => {
        trashReport.tags.push(tag);
      });

    //saving report to firestore
    setErrors(validateErrors);
    if (
      !validateErrors.isImage &&
      !validateErrors.isTitle &&
      !validateErrors.isDescription &&
      !validateErrors.isLocation
    ) {
      reportFirestoreRef
        .doc(reservedReportID)
        .set(Object.assign({}, trashReport))
        .then(function () {
          console.log("Document successfully written!");
          history.push("/dashboard");
        })
        .catch(function (error) {
          setIsSaving(false);
          console.log(error);
        });
    } else {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (event) => {
    let mFile = event.target.files[0];

    if (remoteUploadRef != null) {
      handleBackImageAnalyseStep();
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
            setImageDownloadUrl(downloadURL);
            setUploadProgress(-1);
            handleNextImageAnalyseStep();
          });
        }
      );
    }
  };

  const handleNextImageAnalyseStep = () => {
    setImageAnalyseActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackImageAnalyseStep = () => {
    setImageAnalyseActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

          <Box
            className={classes.errorMessageContainer}
            component="div"
            display={errors.isImage ? "block" : "none"}
          >
            <Alert variant="outlined" severity="error">
              {errors.imageMsgError}
            </Alert>
          </Box>

          <ImageAnalyseStepper step={imageAnalyseActiveStep} />

          <div className={classes.formContentContainer}>
            <div className={classes.formContentLine}>
              <TextField
                required
                name="title"
                fullWidth
                label="Name your spot"
                placeholder="Spot name"
                color="secondary"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setReportTitle(e.target.value)}
                error={errors.isTitle}
                helperText={errors.titleMsgError}
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
                onChange={(e) => setReportDescription(e.target.value)}
                multiline
                error={errors.isDescription}
                helperText={errors.descriptionMsgError}
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
                  {tagsData["tags"].length === 0 && <Loading />}

                  {tagsData["tags"].map((tag) => {
                    return (
                      <Chip
                        key={tag.id}
                        label={tag.name}
                        {...(tag.id === "covid19" && {
                          icon: (
                            <SvgIcon viewBox="0 0 48 48">
                              <path d="M46.5,19A1.49977,1.49977,0,0,0,45,20.5V22H40.87225a16.9,16.9,0,0,0-3.53-8.51367l2.92121-2.92139,1.17582.99561a1.49993,1.49993,0,1,0,2.12134-2.1211l-4.99991-5a1.4999,1.4999,0,0,0-2.12127,2.1211l.99565,1.17578-2.92139,2.92138A16.90205,16.90205,0,0,0,26,7.12793V3h1.5a1.5,1.5,0,0,0,0-3h-7a1.5,1.5,0,0,0,0,3H22V7.12793a16.90205,16.90205,0,0,0-8.51367,3.52978L10.56494,7.73633l.99565-1.17578a1.4999,1.4999,0,0,0-2.12127-2.1211l-4.88475,5a1.49993,1.49993,0,0,0,2.12133,2.1211l1.06067-.99561,2.92121,2.92139A16.9,16.9,0,0,0,7.12775,22H3V20.5a1.5,1.5,0,0,0-3,0v7a1.5,1.5,0,0,0,3,0V26H7.12775a16.9,16.9,0,0,0,3.53,8.51367L7.73657,37.43506l-1.17582-.99561a1.49993,1.49993,0,0,0-2.12134,2.1211l4.99991,5a1.4999,1.4999,0,1,0,2.12127-2.1211l-.99565-1.17578,2.92127-2.92138A16.902,16.902,0,0,0,22,40.87207V45H20.5a1.5,1.5,0,0,0,0,3h7a1.5,1.5,0,0,0,0-3H26V40.87207a16.902,16.902,0,0,0,8.51379-3.52978l2.92127,2.92138-.99565,1.17578a1.4999,1.4999,0,0,0,2.12127,2.1211l4.99991-5a1.49993,1.49993,0,1,0-2.12134-2.1211l-1.17582.99561-2.92121-2.92139A16.9,16.9,0,0,0,40.87225,26H45v1.5a1.5,1.5,0,0,0,3,0v-7A1.49977,1.49977,0,0,0,46.5,19Zm-28,1A3.5,3.5,0,1,1,22,16.5,3.49994,3.49994,0,0,1,18.5,20ZM30,33a2,2,0,1,1,2-2A2.00006,2.00006,0,0,1,30,33Z" />
                            </SvgIcon>
                          ),
                        })}
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
                <Box
                  className={classes.errorMessageContainer}
                  component="div"
                  display={errors.isLocation ? "block" : "none"}
                >
                  <Alert variant="outlined" severity="error">
                    {errors.locationMsgError}
                  </Alert>
                </Box>
                <Typography gutterBottom variant="h6">
                  Select spot location*
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
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isSaving}
              >
                Create Report
              </Button>
            </div>
          </div>
        </form>
      </Paper>
      <Backdrop className={classes.backdrop} open={isSaving}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
