import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { SnackbarProvider } from 'notistack';
import { reducers } from './reducers';
import App from './App';
 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk)),
 
  );


ReactDOM.render(
  
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
    <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root'),
);