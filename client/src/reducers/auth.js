import {AUTH,LOGOUT,ERROR} from '../constants/actionTypes';

const authReducers = (state={ authData:null, errors:null},action) => {

    switch (action.type) {
        case AUTH:
           
          localStorage.setItem('profile', JSON.stringify( {...action?.data}));
          return {...state,authData:action?.data};

          case LOGOUT:
            localStorage.clear();
              return { ...state, authData: null, loading: false, errors: null };

        case ERROR:
        return {   errors: action.data  };
  
        default:
        return  state;
    

    }
}



export default authReducers;