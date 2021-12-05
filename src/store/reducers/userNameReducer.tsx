import initialState from "@/store/initialState";
import { ActionTypes, IAction, IInitialState } from "@/types/types";

const userNameReducer = (state = initialState, action: IAction): IInitialState => {
  switch (action.type) {
    case ActionTypes.USER_NAME:
      return { ...state, userName: action.payload };
    default:
      return state;
  }
};

export default userNameReducer;
