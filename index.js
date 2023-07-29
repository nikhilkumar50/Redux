import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk";

const init = "account/init";
const inc = "account/increment";
const dec = "account/decrement";
const incacc = "account/incrementacc";

const getAccUserPending = "account/getUser/pending";
const getAccUserFulFilled = "account/getUser/fulfilled";
const getAccUserRejected = "account/getUser/rejected";

const incBonus = "bonus/increment";
const incBonusbypay = "bonus/increment";
// create a store
const store = createStore(
  combineReducers({
    account: accountReducer,
    bonus: bonusReducer,
  }),
  applyMiddleware(logger.default, thunk.default)
);

//reducer is a function
function accountReducer(state = { amount: 100 }, action) {
  switch (action.type) {
    case getAccUserFulFilled:
      return { amount: action.payload ,pending:false};
    case getAccUserRejected:
      return { ...state, error: action.error, pending: false };
    case getAccUserPending:
      return { ...state, pending: true }; 

    case inc:
      return { amount: state.amount + 1 };
    case dec:
      return { amount: state.amount - 1 };
    case incacc:
      return { amount: state.amount + action.payload };
    case init:
      return { amount: action.payload };

    default:
      return state;
  }
}

function bonusReducer(state = { price: 0 }, action) {
  switch (action.type) {
    case incBonus:
      return { price: state.price + 1 };
    case incacc:
      if (action.payload <= 100) {
        return { price: state.price };
      }
      return { price: state.price + action.payload };
    default:
      return state;
  }
}

//const history=[];

//global state
// store.getState();

// store.subscribe(()=>{
//     console.log(history.push(store.getState()));
//     console.log(history);
//jab bhee state change tooh chalega
// })

// Async API Call

function getUserAccount(id) {
  return async (dispatch, getState) => {
    try {
        dispatch(getAccountUserPending());
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      dispatch(getAccountUserFulfilled(response.data.price));
    } catch (error) {
      dispatch(getAccountUserRejected(error.message));
    }
  };
}

function getAccountUserFulfilled(value) {
  return { type: getAccUserFulFilled, payload: value };
}

function getAccountUserRejected(error) {
  return { type: getAccUserRejected, erro: error };
}
function getAccountUserPending() {
  return { type: getAccUserPending };
}

//action creators

function incrementuser() {
  return { type: inc };
}

function decrementuser() {
  return { type: dec };
}

function incrementaccuser(value) {
  return { type: incacc, payload: value };
}

function incBonususer(value) {
  return { type: incBonus, payload: value };
}

function inituser(value) {
  // const data= await axios.get('https://jsonplaceholder.typicode.com/todos/1')

  return { type: init, payload: value };
}

//action
setTimeout(() => {
  store.dispatch(getUserAccount(1));
}, 2000);
