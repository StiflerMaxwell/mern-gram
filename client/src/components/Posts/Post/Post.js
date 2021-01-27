import React, {useState} from 'react'
import useStyles from './styles';
import {Grow, Card, CardActions, CardContent, CardMedia,Avatar, Button, Typography } from '@material-ui/core/';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {  useSnackbar } from 'notistack';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost,likePost } from '../../../actions/posts';
import FavoriteIcon from '@material-ui/icons/Favorite';
const Post= ({post,setCurrentId}) => {
  const dispatch = useDispatch();
  const [Growchecked, setGrowchecked] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [deleteID,setDeleteId] = useState(null);
  const [timeout, setTimeout] = useState(1000); 
  
  const user = JSON.parse(localStorage.getItem('profile'));

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
  


  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><FavoriteIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><FavoriteBorderIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><FavoriteBorderIcon fontSize="small" />&nbsp;Like</>;
  };

 
 const classes = useStyles();

    return (


      <>
      <Grow   key={post._id} in={Growchecked}  timeout={timeout}> 
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
      <Avatar  alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
        <Typography variant="h6">{post.creatorname}</Typography>
        <Typography variant="body2">{moment(post.createdAt).locale('zh-cn').fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (

        <IconButton aria-label="delete" size="medium" color="secondary" onClick={() =>handleClickOpen(post._id) }><DeleteIcon /></IconButton>
      )}
      </div>


      
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
      <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (

        <Button size="small" color="primary" onClick={() => setCurrentId(post._id)}><EditIcon fontSize="small" /> Edit</Button>
        )}
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