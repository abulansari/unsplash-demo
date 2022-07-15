import { createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";

const store = createStore(userReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
