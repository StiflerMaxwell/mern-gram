import axios from 'axios';

// heroku server
//const url = 'https://mern-gram.herokuapp.com/posts';
//Local
const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id,updatedPost) => axios.patch(`${url}/${id}`,updatedPost);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

export const deletePost = (id) => axios.delete(`${url}/${id}`);
