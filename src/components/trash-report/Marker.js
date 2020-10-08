import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Room from "@material-ui/icons/Room";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
  root: {
    transform: "translateZ(0) translate(-50%, -100%)",
    backfaceVisibility: "hidden",
  },
}));

export default function Marker() {
  const classes = useStyles();
  return (
    <Room className={classes.root} style={{ color: red[500], fontSize: 80 }} />
  );
}
