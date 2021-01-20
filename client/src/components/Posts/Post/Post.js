import React, {useState} from 'react'
import useStyles from './styles';
import {Grow, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {  useSnackbar } from 'notistack';

import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deletePost,likePost } from '../../../actions/posts';

const Post= ({post,setCurrentId}) => {
  const dispatch = useDispatch();
  const [Growchecked, setGrowchecked] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [deleteID,setDeleteId] = useState(null);
  const [timeout, setTimeout] = useState(1000); 
  

  const handleClickOpen = (id) => {
    setOpen(true);
    setDeleteId(id);
    
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleDelete = () => {

    dispatch(deletePost(deleteID));
    setTimeout(500);
    setGrowchecked(false)
    handleClose();
    enqueueSnackbar('Post Deleted Successful !', { variant: 'warning'});
  };
  


 
 const classes = useStyles();

    return (


      <>
      <Grow   key={post._id} in={Growchecked}  timeout={timeout}> 
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).locale('zh-cn').fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        {/* <Button style={{ color: 'white' }} size="small" onClick={() => {}}><DeleteIcon color="red" fontSize="default" /></Button> */}
        <IconButton aria-label="delete" size="medium" color="secondary" onClick={() =>handleClickOpen(post._id) }><DeleteIcon /></IconButton>

      </div>


      
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize="small" /> &nbsp;Like&nbsp;{post.likeCount} </Button>
        <Button size="small" color="primary" onClick={() => setCurrentId(post._id)}><EditIcon fontSize="small" /> Edit</Button>
      </CardActions>
 
    </Card>
    </Grow> 
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Deleteing Warning!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this post? You can't undo this action.    
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
  </>
    )
}

export default Post