import { combineReducers } from "redux";
import authReducer from "@/store/reducers/authReducer";
import modalReducer from "@/store/reducers/modalReducer";
import userNameReducer from "@/store/reducers/userNameReducer";
import adminReducer from "@/store/reducers/adminReducer";
import editModalReducer from "@/store/reducers/editModalReducer";
import fetchReducer from "@/store/reducers/fetchReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  userName: userNameReducer,
  admin: adminReducer,
  editModal: editModalReducer,
  reqGame: fetchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
