import { CREATE_NEW_GAME, DELETE_SET_SUCCESS, EDIT_GAME } from "@/store/actions";
import { IActionAdmin } from "@/types/types";

const adminReducer = (state = [], action: IActionAdmin) => {
  switch (action.type) {
    case CREATE_NEW_GAME:
      return { ...state };
    case EDIT_GAME:
      return { ...state };
    case DELETE_SET_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};

export default adminReducer;
