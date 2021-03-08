import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { createPost ,updatePost} from '../../actions/posts';
import {  useSnackbar } from 'notistack';

const Form= ({ currentId, setCurrentId }) => {
  const { enqueueSnackbar } = useSnackbar();
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });

    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const classes = useStyles();

    const dispatch = useDispatch(); 
    const user = JSON.parse(localStorage.getItem('profile'));

     
    useEffect(() => {
      if (post) setPostData(post);
    }, [post]);

     

    const handleSubmit = async (e) => {
      e.preventDefault();
  
       
      if (currentId === null) {
        dispatch(createPost({...postData, creatorname: user?.result?.name}));
        clear();
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('Post Created Successful !', { variant: 'success'});
      } else {
        dispatch(updatePost(currentId, {...postData, creatorname: user?.result?.name}));
        clear(); 
        enqueueSnackbar('Post Updated Successful !', { variant: 'info'});
      }
    };


    const clear = () => {
      setCurrentId(null);
      setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    };
 

    if(!user?.result?.name) {

      return(
        <Paper className={classes.paper}>
          <Typography variant="h6" align="center">
            Please sign in to sahre your posts!
          </Typography>
        </Paper>
          )
    }
    //GET the post id to the form
    return (
        <Paper className={classes.paper}>
        <form autoComplete="off"  className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">{ currentId ? 'Editing' :'Creating'} a Post</Typography>
          <TextField name="title" variant="outlined" required label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField name="message" variant="outlined" required label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <TextField name="tags" variant="outlined" required label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
          <div className={classes.fileInput}>
            <FileBase  required  accept="image/*"   className={classes.inputlabel} id="contained-button-file" type="file"   multiple={false}  onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />        
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
              Upload
            </Button>
          </label>
            
            </div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit { currentId ? 'Editing' :'Creating'}</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>ClearForm</Button>
        </form>
      </Paper>
    )
}

export default Form
