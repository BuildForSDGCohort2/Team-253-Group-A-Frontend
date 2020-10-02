import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  root: {},
});

TrashReportStatus.propTypes = {
  statusId: PropTypes.string.isRequired,
};

export default function TrashReportStatus(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Chip
        label={props.statusId === undefined ? "Open" : props.statusId}
        variant="outlined"
        color="secondary"
        size="small"
      />
    </div>
  );
}
