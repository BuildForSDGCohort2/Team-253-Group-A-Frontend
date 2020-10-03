import React from "react";
import { useFirestore } from "reactfire";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import GenericNotFound from "./404";
import TrashReportList from "./trash-report/TrashReportList";
import Divider from "@material-ui/core/Divider";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  profilePicture: {
    marginLeft: "auto",
    marginRight: "auto",
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: theme.spacing(4),
  },
  profileName: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  profileHeader: {
    marginBottom: theme.spacing(4),
    textAlign: "center",
  },

  profileDivider: {
    marginBottom: theme.spacing(4),
  },
}));

let userExists = true;

Profile.propTypes = {
  userId: PropTypes.string,
};

export default function Profile(props) {
  const classes = useStyles();
  const db = useFirestore();
  let { id } = useParams();

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [firstLoad, setFirstLoad] = React.useState(true);

  if (id === undefined) {
    if (props.userId !== undefined && props.userId.length > 0) {
      id = props.userId;
    } else return null;
  }

  if (firstLoad) {
    console.log("query report view");
    setFirstLoad(false);
    let userDbRef = db.collection("profiles").doc(id);

    userDbRef.get().then(function (doc) {
      if (doc.exists) {
        setData(doc.data());
      } else {
        userExists = false;
      }
      setLoading(false);
    });
  }

  if (userExists) {
    return (
      <div className={classes.root}>
        <div className={classes.profileHeader}>
          {loading ? (
            <Skeleton
              animation="wave"
              variant="circle"
              className={classes.profilePicture}
            ></Skeleton>
          ) : (
            <Avatar src={data.photoURL} className={classes.profilePicture} />
          )}

          {loading ? (
            <Skeleton
              animation="wave"
              height={41}
              width="40%"
              className={classes.profileName}
            />
          ) : (
            <Typography variant="h5" className={classes.profileName}>
              {data.displayName}
            </Typography>
          )}
        </div>
        <Divider variant="middle" className={classes.profileDivider} />
        <TrashReportList uid={id} />
      </div>
    );
  } else {
    return <GenericNotFound />;
  }
}
