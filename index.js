import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
// create a store
const store=createStore(reducer,applyMiddleware(logger.default));

 //reducer is a function
function reducer(state={amount:100},action){
    if(action.type==='increment'){
        //immutability is required
        return {amount:state.amount+action.payload};

    }
    
    return state;
}
const history=[];

//global state
// store.subscribe(()=>{
//     console.log(history.push(store.getState()));
//     console.log(history);
// })

//action
setInterval(()=>{
    store.dispatch({type:'increment',payload:100});

},5000)




