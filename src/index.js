import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers, applyMiddleware} from 'redux'; // import redux


const mathInitState = {
  result: 10,
  lastValues: [],
};

const userInitState = {
  userName: "PimpOG94",
  userAge: 23,
}

// create our reducer - here we handle our actions
// @param1 : state (if no state gets passed in the we will use initialState)
// @param2 : action
const mathReducer = (state = mathInitState, action) => {
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


// creater another reducer to help handle state changes of the user
const userReducer = (state = userInitState, action) => {

  switch(action.type){
    case "SET_NAME":
      state = {
        ...state, // copy our original state in the new state
        userName: action.payload, 
      };
      break;
    case "SET_AGE":
      state = {
        ...state,
        userAge: action.payload,
      };
      break;

    default:
      break;
  }
  return state;
}

// we can think of this object as one larger global state with 
// multiple substates within it
// this is how we can combine our projects into one larger app
const mainReducer = combineReducers({
  mathReducer,
  userReducer,
});

// create middleware for that allows out reducers to communicate
const myLogger = (store) => (next) => (action) => {
  console.log("Logged Action: ", action);
  next(action); // this will allow our action to travel to our reducer
  
}

// This is how we create the redux store. make sure to import {createStore}
// @param1 : reducer
// @param2 : initialState - can be object or whatever
const store = createStore(mainReducer, {}, applyMiddleware());  

// we will subscribe and print out whenever the store notices a change in state
store.subscribe(() => {
  console.log("Store Updated!", store.getState());
});

// Dispatch our userName actions
store.dispatch({
  type: "SET_NAME",
  payload: "Bubba98",
})

store.dispatch({
  type:"SET_AGE",
  payload: 25,
})

// Dispatch our math actions
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
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
