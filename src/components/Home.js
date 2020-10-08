import React from "react";
import { SuspenseWithPerf } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";

import Loading from "./Loading";

/* const TrashReportList = React.lazy(() =>
  import("./trash-report/TrashReportList")
); */

const TrashReportList = React.lazy(() =>
  import("./trash-report/TrashReportList")
);

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SuspenseWithPerf
        fallback={<Loading />}
        traceId={"load-home-view-status"}
      >
        <TrashReportList />
      </SuspenseWithPerf>
    </div>
  );
}
