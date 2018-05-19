import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const rootReducer = combineReducers({
  ...reducers
});

let middlewares = applyMiddleware(thunk)


export default function configureStore() {
  if(process.NODE_ENV==='production'){
    return createStore(rootReducer, middlewares)
  }else{
    return createStore(rootReducer, compose(
      middlewares,
      window.devToolsExtension ? window.devToolsExtension() : f=>f
    ))
  }
}
