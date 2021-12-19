import { combineReducers } from "redux";
import authReducer from "@/store/reducers/authReducer";
import adminReducer from "@/store/reducers/adminReducer";
import cartReducer from "@/store/reducers/cartReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
