import initialState from "@/store/initialState";
import { ActionTypes, IAction, IInitialState } from "@/types/types";

const authReducer = (state = initialState, action: IAction): IInitialState => {
  switch (action.type) {
    case ActionTypes.LOG_IN:
      return { ...state, auth: true };
    case ActionTypes.LOG_OUT:
      localStorage.clear();
      return { ...state, auth: false };
    default:
      return state;
  }
};

export default authReducer;
