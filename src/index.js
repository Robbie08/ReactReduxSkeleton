import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux'; // import redux


// create our reducer - here we handle our actions
// @param1 : state
// @param2 : action
const mainReducer = (state, action) => {
  switch(action.type){
    case "ADD":
      state += action.payload; // adds the value passed as payload
      break;
    case "SUBTRACT":
      state -= action.payload; // subtracts the value passed as payload
      break;
    default:
      break;
  }

  return state;
}

// This is how we create the redux store. make sure to import {createStore}
// @param1 : reducer
// @param2 : initialState - can be object or whatever
const store = createStore(mainReducer,1);  

// we will subscribe and print out whenever the store notices a change in state
store.subscribe(() => {
  console.log("Store Updated!", store.getState());
});

// Dispatch our action
store.dispatch({
  type: "ADD",
  payload: 10,
});

store.dispatch({
  type: "SUBTRACT",
  payload: 10,
});


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
