import React, { useState, useEffect } from 'react';
import { Zoom, Box, Container, AppBar,Typography, Grow, Grid,Toolbar } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import postimage from './images/post.png';
import Posts from './components/Posts/Posts';
import { useDispatch } from 'react-redux';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './styles';
import  './styles.scss';

const  App = () => {
  const classes = useStyles(); 

  const [currentId, setCurrentId] = useState(null);


  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getPosts());
    
  
  },[dispatch]);

  return (
    <>
    <AppBar position="fixed">
        <Toolbar>
          <Box m={1}> 
          <img    src={postimage} alt="icon" height="32"    />
          </Box>
        
          <Typography variant="h6" color="inherit" noWrap  >
          MERN Stack Posts
          </Typography>
          
        </Toolbar>
      </AppBar> 

    <Box mt={10}> 
    <Container maxWidth="xl"  >
   

     
      <Container  >
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7} lg={8}>
             <Posts setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={4}   lg={4}>
            <Form  currentId={currentId} setCurrentId={setCurrentId}/>
          </Grid>
        </Grid>
      </Container>
     
  </Container>
  </Box>
  <Zoom in  timeout={500} >
  <Fab color="secondary" aria-label="add" className={classes.fixed} >
        <AddIcon />
      </Fab>
  </Zoom>
  </>
  );
}

export default App;
