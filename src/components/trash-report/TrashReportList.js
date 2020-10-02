import React from "react";
import PropTypes from "prop-types";
import { useFirestore } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import TrashReportCard from "./TrashReportCard";
import Loading from "../Loading";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

TrashReportList.propTypes = {
  uid: PropTypes.string,
  tagId: PropTypes.string,
};

//let firstLoad = true;

export default function TrashReportList(props) {
  const classes = useStyles();
  const db = useFirestore();

  let reportFirestoreRef = db.collection("spots");

  if (props.uid !== undefined && props.uid.length > 0) {
    reportFirestoreRef = reportFirestoreRef.where("uid", "==", props.uid);
  }

  if (props.tagId !== undefined && props.tagId.length > 0) {
    reportFirestoreRef = reportFirestoreRef.where(
      "tags",
      "array-contains",
      props.tagId
    );
  }

  const [firstLoad, setFirstLoad] = React.useState(true);
  const [reportList, setReportList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  if (firstLoad && reportList.length === 0) {
    console.log("query list");
    setFirstLoad(false);
    reportFirestoreRef
      .orderBy("createdAt", "desc")
      .get()
      .then(function (querySnapshot) {
        let data = [];
        querySnapshot.forEach(function (doc) {
          data.push(doc.data());
        });
        setReportList(data);
        setIsLoading(false);
      });
  }

  return (
    <div className={classes.root}>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <Grid container spacing={2}>
          {reportList.map((report) => {
            return (
              <Grid key={report.id} item xs={12} sm={6} md={4}>
                <TrashReportCard
                  {...(props.uid !== undefined && {
                    noHeader: true,
                  })}
                  data={report}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
}
