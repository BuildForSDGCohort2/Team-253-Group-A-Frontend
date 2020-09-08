import React from 'react';
import {useAuth, useUser} from 'reactfire';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

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

  const user =  useUser();

  if(user){
    return (
      <div>
        <IconButton aria-controls="account-menu" aria-haspopup="true" onClick={handleClick}>
          <Avatar src={user.photoURL} color="secondary">U</Avatar>
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem  onClick={signOut}>Logout</MenuItem>
        </Menu>
      </div>
    );
  } else return null;
}