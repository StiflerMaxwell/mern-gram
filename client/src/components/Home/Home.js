import React, { useState, useEffect } from 'react';
import { Zoom, Box, Container,  Grow, Grid } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';
import Form from '../Form/Form';
import { getPosts } from '../../actions/posts';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import  '../../styles.scss';

 
const Home = () => {

 
    const [currentId, setCurrentId] = useState(null);
  
  
    const dispatch = useDispatch();
  
    useEffect(() => {
  
      dispatch(getPosts());
      
    
    },[dispatch]);

 

    return (
        <>

<Box mt={10}> 
    <Container maxWidth="xl"  >
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7} lg={8}>
             <Posts setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={4}   lg={4}>
            <Form  currentId={currentId} setCurrentId={setCurrentId}/>
          </Grid>
        </Grid>
  </Container>
  </Box>
  <Zoom in  timeout={500} >
  <Fab color="secondary" aria-label="add" className="fixed" >
        <AddIcon />
      </Fab>
  </Zoom>



            
        </>
    )
}

export default Home
