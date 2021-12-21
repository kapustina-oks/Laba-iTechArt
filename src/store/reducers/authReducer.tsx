import { ActionTypes, IAction, IAuthInitialState } from "../types/authTypes";

const initialState: IAuthInitialState = {
  auth: false,
  modal: false,
  userName: "",
  isAdmin: false,
};

const authReducer = (state = initialState, action: IAction): IAuthInitialState => {
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
