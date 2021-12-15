import { combineReducers } from "redux";
import authReducer from "@/store/reducers/authReducer";
import modalReducer from "@/store/reducers/modalReducer";
import userNameReducer from "@/store/reducers/userNameReducer";
import adminReducer from "@/store/reducers/adminReducer";
import cartReducer from "@/store/reducers/cartReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  userName: userNameReducer,
  admin: adminReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
