import initialState from "@/store/initialState";
import { CLOSE_EDIT_MODAL, OPEN_EDIT_MODAL } from "@/store/actions";

const editModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_EDIT_MODAL:
      return { ...state, modal: true };
    case CLOSE_EDIT_MODAL:
      return { ...state, modal: false };
    default:
      return state;
  }
};

export default editModalReducer;
