import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { createPost ,updatePost} from '../../actions/posts';
import {  useSnackbar } from 'notistack';

const Form= ({ currentId, setCurrentId }) => {
  const { enqueueSnackbar } = useSnackbar();
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });

    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const classes = useStyles();

    const dispatch = useDispatch(); 

    useEffect(() => {
      if (post) setPostData(post);
    }, [post]);

     

    const handleSubmit = async (e) => {
      e.preventDefault();
  
       
      if (currentId === null) {
        dispatch(createPost(postData));
        clear();
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('Post Created Successful !', { variant: 'success'});
      } else {
        dispatch(updatePost(currentId, postData));
        clear(); 
        enqueueSnackbar('Post Updated Successful !', { variant: 'info'});
      }
    };


    const clear = () => {
      setCurrentId(null);
      setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    };
 
    //GET the post id to the form
    return (
        <Paper className={classes.paper}>
        <form autoComplete="off"  className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">{ currentId ? 'Editing' :'Creating'} a Post</Typography>

          <TextField name="creator" variant="outlined" required label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
          <TextField name="title" variant="outlined" required label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField name="message" variant="outlined" required label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <TextField name="tags" variant="outlined" required label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
          <div className={classes.fileInput}><FileBase required type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit { currentId ? 'Editing' :'Creating'}</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>ClearForm</Button>
        </form>
      </Paper>
    )
}

export default Form
