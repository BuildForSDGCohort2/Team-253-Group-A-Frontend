import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {},
});

TrashReportStatus.propTypes = {
  statusId: PropTypes.string,
};

export default function TrashReportStatus(props) {
  const classes = useStyles();

  return <div className={classes.root}>{props.statusId}</div>;
}
