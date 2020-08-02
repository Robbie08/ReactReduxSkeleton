import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux'; // import redux


const initialState = {
  result: 10,
  lastValues: [],
  userName: "Robert"
}

// create our reducer - here we handle our actions
// @param1 : state (if no state gets passed in the we will use initialState)
// @param2 : action
const mainReducer = (state = initialState, action) => {
  switch(action.type){
    case "ADD":
      // if we want to update the initialState we can create a new object
      // then use the spread op to destructure our data back into the new object
      // finally we will override the first declaration by updating the state
      state ={
        ...state,
        result: state.result + action.payload,
        lastValues: [...state.lastValues, action.payload],
      };
      break;
    case "SUBTRACT":
      // if we want to update the initialState we can create a new object
      // then use the spread op to destructure our data back into the new object
      // finally we will override the first declaration by updating the state
      state ={
        ...state,
        result: state.result - action.payload,
        lastValues: [...state.lastValues, action.payload],
      }
      break;
    default:
      break;
  }

  return state;
}

// This is how we create the redux store. make sure to import {createStore}
// @param1 : reducer
// @param2 : initialState - can be object or whatever
const store = createStore(mainReducer,initialState);  

// we will subscribe and print out whenever the store notices a change in state
store.subscribe(() => {
  console.log("Store Updated!", store.getState());
});

// Dispatch our actions
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
