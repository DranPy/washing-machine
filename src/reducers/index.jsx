import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import machine from "./machine";
import users from "./users";

export default combineReducers({
  machine,
  users,
  form: formReducer
});
