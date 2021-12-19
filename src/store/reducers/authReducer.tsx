import initialState from "@/store/initialState";
import { IInitialState } from "@/types/types";
import { ActionTypes, IAction } from "../types/authTypes";

const authReducer = (state = initialState, action: IAction): IInitialState => {
  console.log(action.type);
  switch (action.type) {
    case ActionTypes.LOG_IN:
      return { ...state, auth: true };
    case ActionTypes.LOG_OUT:
      localStorage.clear();
      return { ...state, auth: false };
    case ActionTypes.OPEN_MODAL:
      return { ...state, modal: true };
    case ActionTypes.CLOSE_MODAL:
      return { ...state, modal: false };
    case ActionTypes.USER_NAME:
      return { ...state, userName: action.payload };
    case ActionTypes.IS_ADMIN:
      return { ...state, isAdmin: action.payload };
    default:
      return state;
  }
};

export default authReducer;
