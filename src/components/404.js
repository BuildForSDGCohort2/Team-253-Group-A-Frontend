import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  subTitle: {
    color: grey[500],
  },
  notFoundImage: {
    margin: theme.spacing(2),
  },
}));

export default function GenericNotFound() {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="sm">
      <DeleteOutlinedIcon
        color="secondary"
        style={{ fontSize: 300 }}
        className={classes.notFoundImage}
      />
      <Typography align="center" variant="h2" gutterBottom>
        404
      </Typography>
      <Typography
        align="center"
        variant="h4"
        className={classes.subTitle}
        gutterBottom
      >
        Trash not found
      </Typography>
      <Typography align="center" variant="body1" component="p">
        Horray, no trash has been found here!
      </Typography>
      <Typography align="center" variant="body1" component="p">
        This spot has been already cleaned.
      </Typography>
    </Container>
  );
}
