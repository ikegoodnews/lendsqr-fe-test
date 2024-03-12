import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';
import {thunk} from 'redux-thunk';
import rootReducer from '../_redux/reducer';

// const composeEnhancers = composeWithDevTools({
//    // Specify here name, actionsDenylist, actionsCreators and other options
// });

const store = createStore(
   rootReducer,
   composeWithDevTools(
      applyMiddleware(thunk),
      // other store enhancers if any
   ),
);

export default store;
