import initialState from "@/store/initialState";
import { ActionTypes, IAction, IInitialState } from "@/types/types";

const modalReducer = (state = initialState, action: IAction): IInitialState => {
  switch (action.type) {
    case ActionTypes.OPEN_MODAL:
      return { ...state, modal: true };
    case ActionTypes.CLOSE_MODAL:
      return { ...state, modal: false };
    default:
      return state;
  }
};

export default modalReducer;
