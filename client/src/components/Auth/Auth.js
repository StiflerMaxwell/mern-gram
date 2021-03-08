import React, { useState,useEffect} from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { Avatar, Button, Paper,Box,  Grid, TextField,CircularProgress, Typography, Container } from '@material-ui/core';
 
import {GoogleLogin} from "react-google-login";
import { Switch, useHistory } from 'react-router-dom';
import useStyles from './styles';
import {signup, signin } from '../../actions/auth';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './Icon';


const initialState = {firstName: '',lastName: '', email:'', password:'', confirmPassword:''};

const Auth = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [showPassword,setShowPassword] = useState(false);
    const [formdata,setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [errormessage,setErrormessage] = useState('');


    const [loading,setLoading] = useState(false);

    const isLoginError = useSelector(state => state.auth.errors)

    
    //const IsloginError = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
 
    

    
    useEffect(() => {
        if (isLoginError) setErrormessage(isLoginError.data.message);
      }, [isLoginError]);


    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        if(isSignup) {
            dispatch(signup(formdata,history))
        }
        else {
            dispatch(signin(formdata,history)) 
   
            setLoginError(true)
        }

        //console.log(formdata);
        console.log(isLoginError);
    };
   
    
    const handleChange = (e) => {
        setFormData({...formdata, [e.target.name]: e.target.value});
    };

    const handleShowPassword = () =>setShowPassword(
        (prevShowPassword) => !prevShowPassword
    );

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
      const result = res?.profileObj;
      const token = res?.tokenId;
      try{
        dispatch({ type: 'AUTH', data:{result,token}});
        history.push('/');
      }
      catch(error) {
        console.log(error);
      }
    }

    const googleFailure = () => {
        console.log("google login was failed, plz try again later.")
    }



    return (

        <Box mt={20} >
        <Container component="main" maxWidth="xs"  >
            <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
             <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form}     onSubmit={handleSubmit}   >
                <Grid spacing ={3} container >
                    {
                    isSignup && (
                        <>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />  
                        </>
                    )}

                        <Input loginError = {loginError}   name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input   loginError = {loginError}   errormessage = {errormessage}    
                         name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                       
                         
                </Grid>
            
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                <GoogleLogin 
                    clientId="1095827748467-b1l72q3hc2ib39o1iulpdemi5r6h6spg.apps.googleusercontent.com"
                    render={(rednderProps) => (
                        <Button 
                        className={classes.googleButton} color="primary" 
                        fullWidth onClick={rednderProps.onClick} 
                        disabled = {rednderProps.disabled} 
                        variant="contained" 
                        startIcon={<Icon />}
                        > 
                        Google Sign In
                        </Button>
                 
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justify="center">
                        <Grid item>
                            <Button onClick={switchMode} disableElevation color="secondary" fullWidth> 
                            {isSignup ? 'Alrealdy have an account? Sign In' : "Don't have an account? Sign Up Now"}
                            </Button>
                        </Grid>
                </Grid>
            </form>
            </Paper>        
        </Container>
        </Box>
    )
}

export default Auth



