import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddLocationOutlinedIcon from "@material-ui/icons/AddLocationOutlined";

const useStyles = makeStyles((theme) => ({
  root: { position: "relative" },
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
  },
}));

export default function NoReportFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.noResultsContainer}>
        <Typography gutterBottom variant="body1" component="div">
          No trash spots has been reported yet or they&apos;ve been all cleaned.
        </Typography>

        <Button
          component={LinkRouter}
          to="/dashboard/spots/create"
          startIcon={<AddLocationOutlinedIcon />}
          variant="contained"
          color="secondary"
          size="large"
        >
          Report a spot of trash
        </Button>
      </div>
    </div>
  );
}
