import initialState from "@/store/initialState";
import { ActionAdminTypes, IActionAdmin } from "../types/adminTypes";

const adminReducer = (state = initialState, action: IActionAdmin) => {
  console.log(action.type);
  switch (action.type) {
    case ActionAdminTypes.LOAD_GAME:
      return { ...state, products: action.payload.products };
    case ActionAdminTypes.CREATE_NEW_GAME:
      return {
        ...state,
        products: [...state.products, action.payload.game],
      };
    case ActionAdminTypes.EDIT_GAME:
      return {
        ...state,
        products: state.products.map((item) => (item.id === action.payload.game.id ? action.payload.game : item)),
      };
    case ActionAdminTypes.DELETE_SET_SUCCESS:
      return { ...state, products: state.products.filter((item) => item.id !== action.payload.id) };
    default:
      return state;
  }
};

export default adminReducer;
