import React from "react";
import PropTypes from "prop-types";
import { Link as LinkRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

NavigationDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  anchor: PropTypes.string,
};

export default function NavigationDrawer(props) {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    setDrawerOpen(props.open);
  }, [props.open]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    props.closeHandler();
    setDrawerOpen(open);
  };

  return (
    <div>
      <React.Fragment key={props.anchor}>
        <Drawer
          anchor={props.anchor}
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button component={LinkRouter} to="/spots">
                <ListItemText primary="Spots" />
              </ListItem>
              <ListItem button component={LinkRouter} to="/events">
                <ListItemText primary="Events" />
              </ListItem>
              <ListItem button component={LinkRouter} to="/covid">
                <ListItemText primary="COVID-19" />
              </ListItem>
              <ListItem button component={LinkRouter} to="/about">
                <ListItemText primary="About" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
