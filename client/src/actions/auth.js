import * as api from '../api/index';
import {AUTH,ERROR} from '../constants/actionTypes';





export const signin = (formData, history) => async(dispatch) => {


  

    try {
         //log in user
         const  {data} = await api.signIn(formData);
         dispatch({type: AUTH, data});
         history.push('/');
 
    }
    catch(error){
        const data =  error.response ;
        dispatch({type: ERROR, data});
  
}
}


export const signup = (formData, history) => async(dispatch) => {
    try {
         //Sign up user
         const  {data} = await api.signUp(formData);

         dispatch({type: AUTH,  data});
         history.push('/');
    }
    catch(error){

        console.log(error);

    }


}
