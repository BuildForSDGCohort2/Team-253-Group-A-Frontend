import React from "react";
import PropTypes from "prop-types";
import { useFirestore } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TrashReportCard from "./TrashReportCard";
import Loading from "../Loading";
import NoReportFound from "./NoReportFound";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
  },
  noResultsContainer: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    margin: "auto",
    "& > *": {
      margin: theme.spacing(2),
    },
    width: "100%",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
}));

TrashReportList.propTypes = {
  uid: PropTypes.string,
  tagId: PropTypes.string,
  dashboard: PropTypes.bool,
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

  if (firstLoad) {
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

  React.useEffect(() => {
    setIsLoading(true);
    setFirstLoad(true);
  }, [props.uid]);

  return (
    <div className={classes.root}>
      {isLoading ? (
        <Loading />
      ) : reportList.length > 0 ? (
        <Grid container spacing={2}>
          {reportList.map((report) => {
            return (
              <Grid
                key={report.id}
                item
                xs={12}
                sm={6}
                md={props.dashboard ? 6 : 4}
              >
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
      ) : (
        <NoReportFound />
      )}
    </div>
  );
}
