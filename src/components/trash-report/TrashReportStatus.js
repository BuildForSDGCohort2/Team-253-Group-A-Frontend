import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {},
});

export default function TrashReportStatus(props) {
  const classes = useStyles();

  return <div className={classes.root}>{props.statusId}</div>;
}
