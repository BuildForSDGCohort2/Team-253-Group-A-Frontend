import firebase from "firebase/app";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import { useStorage, useUser, useFirestore } from "reactfire";

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
    borderRadius: 4,
    padding: theme.spacing(2),
    boderWidth: 2,
    borderStyle: "dashed",
    borderColor: theme.palette.secondary.main,
    cursor: "pointer",
    textAlign: "center",
    transitionDuration: "500ms",
    transitionProperty: "background-image,background-color",
    transitionTimingFunction: "ease",
  },
  formContentContainer: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  locationContainer: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default function AddTrashReport() {
  const classes = useStyles();
  const user = useUser();
  const storage = useStorage();
  const firestore = useFirestore();

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedFileURL, setSelectedFileURL] = React.useState("");
  const [reservedReportID, setReservedReportID] = React.useState("");
  const [remoteUploadRef, setRemoteUploadRef] = React.useState(null);

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
        .catch(function (error) {
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

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        function (snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function (error) {
          // Handle unsuccessful uploads
        },
        function () {
          setRemoteUploadRef(mRemoteUploadRef);
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log("File available at", downloadURL);
          });
        }
      );
    }
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper>
        <form autoComplete="off" noValidate onSubmit={saveTrashReport}>
          <input
            required
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleImageUpload}
          />
          <div
            className={classes.imageUploadContainer}
            style={{ backgroundImage: `url(${selectedFileURL})` }}
          >
            <label htmlFor="contained-button-file">
              <div className={classes.imageUpload}>
                <Button
                  variant="outlined"
                  color="secondary"
                  component="span"
                  size="large"
                  startIcon={<AddAPhoto />}
                >
                  Add Photo
                </Button>
              </div>
            </label>
          </div>
          <Grid container className={classes.formContentContainer} spacing={2}>
            <Grid item container xs={12} sm={7}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Paper className={classes.locationContainer}>Location</Paper>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="secondary">
                Save Report
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
