import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {combineReducers, createStore} from 'redux';
import noteReducer from './reducers/noteReducers';
import {Provider} from 'react-redux';
import filterReducer, {filterChange} from './reducers/fiterReducer';

const reducer = combineReducers ({
  notes: noteReducer,
  filter: filterReducer,
});

const store = createStore (reducer);
ReactDOM.createRoot (document.getElementById ('root')).render (
  <Provider store={store}> <App /></Provider>
);
