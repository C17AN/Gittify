import { createStore, combineReducers } from "redux";
import Login from "./loginReducer";
import Noti from "./notiReducer";

const store = createStore(combineReducers({ Login, Noti }));

export default store;
