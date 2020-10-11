import React from "react";
import { useAuth, useUser } from "reactfire";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { Link as LinkRouter } from "react-router-dom";
import DashboardOutlined from "@material-ui/icons/DashboardOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import * as APP_ROUTES from "../constants/routes";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = useAuth();
  const signOut = async () => {
    handleClose();
    await auth.signOut();
  };

  const user = useUser();

  const getProfilePath = () => {
    return APP_ROUTES.PROFILE + "/" + user.uid;
  };

  const getInitials = (string) => {
    var initials = "";
    if (string != null) {
      var names = string.split(" ");
      initials = names[0].substring(0, 1).toUpperCase();

      if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
      }
    }

    return initials;
  };

  if (user) {
    return (
      <div>
        <IconButton
          aria-controls="account-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Avatar src={user.photoURL} color="secondary">
            {getInitials(user.displayName)}
          </Avatar>
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={handleClose}
            component={LinkRouter}
            to={APP_ROUTES.DASHBOARD}
          >
            <ListItemIcon>
              <DashboardOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            component={LinkRouter}
            to={getProfilePath}
          >
            <ListItemIcon>
              <PersonOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Your Profile" />
          </MenuItem>
          {/* <MenuItem onClick={handleClose} component={LinkRouter} to="/dashboard/account">
            My account
          </MenuItem> */}
          <MenuItem onClick={signOut}>
            <ListItemIcon>
              <ExitToAppOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>
      </div>
    );
  } else return null;
}
