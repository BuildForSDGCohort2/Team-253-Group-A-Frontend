import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  root: {},
});

TrashReportStatus.propTypes = {
  statusId: PropTypes.string,
};

export default function TrashReportStatus(props) {
  const classes = useStyles();

  return (
    <Chip
      className={classes.root}
      label={props.statusId === undefined ? "Open" : props.statusId}
      color="secondary"
      size="small"
    />
  );
}
