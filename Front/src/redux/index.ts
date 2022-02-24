import { combineReducers } from "redux";
import usersReducer from "./reducers/users.reducer"
import userReducer from "./reducers/user.reducer"

export default combineReducers({
	usersReducer,
	userReducer,
});