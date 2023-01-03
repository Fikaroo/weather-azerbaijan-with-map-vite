import { combineReducers } from "redux";
import colorReducer from "./reducers/colorReducer";

const rootReducer = combineReducers({ color: colorReducer });

export default rootReducer;
