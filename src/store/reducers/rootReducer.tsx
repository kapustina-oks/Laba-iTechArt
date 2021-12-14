import { combineReducers } from "redux";
import authReducer from "@/store/reducers/authReducer";
import modalReducer from "@/store/reducers/modalReducer";
import userNameReducer from "@/store/reducers/userNameReducer";
import cartReducer from "@/store/reducers/cartReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  userName: userNameReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
