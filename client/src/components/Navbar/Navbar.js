import React, { useState, useEffect } from 'react';
import { AppBar,Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import postimg from '../../images/post.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  
  useEffect(() => {

    const token = user?.token;
    //JWT...later 
    setUser(JSON.parse(localStorage.getItem('profile')));


    if(token)
    {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 <new Date().getTime())  
      logout();

    }
  },[location]);

  const logout = () => {
    dispatch({type: 'LOGOUT'});
    history.push('/');
    setUser(null);
  };

 
  return (
    <AppBar className={classes.appBar} position="fixed" color="secondary" >
      <div className={classes.brandContainer} >
      <Link  to="/" className={classes.nav} >
      <img className={classes.image} src={postimg} alt="icon" height="64" />
 
      </Link>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;