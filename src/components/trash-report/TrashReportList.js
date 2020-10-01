import React from "react";
import PropTypes from "prop-types";
import { useFirestore } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import TrashReportCard from "./TrashReportCard";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

TrashReportList.propTypes = {
  uid: PropTypes.string,
  tagId: PropTypes.string,
};

export default function TrashReportList(props) {
  const classes = useStyles();
  const db = useFirestore();

  const reportFirestoreRef = db.collection("spots");

  if (props.uid != undefined && props.uid.length > 0) {
    reportFirestoreRef.where("uid", "==", props.uid);
  }

  if (props.tagId != undefined && props.tagId.length > 0) {
    reportFirestoreRef.where("tags", "array-contains", props.tagId);
  }

  const [reportList, setReportList] = React.useState([]);

  if (reportList.length === 0) {
    console.log("query list");
    reportFirestoreRef.get().then(function (querySnapshot) {
      let data = [];
      querySnapshot.forEach(function (doc) {
        data.push(doc.data());
      });
      setReportList(data);
    });
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {reportList.map((report) => {
          return (
            <Grid key={report.id} item xs={12} sm={6} md={4}>
              <TrashReportCard data={report} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
