import { CREATE_NEW_GAME, DELETE_SET_SUCCESS, EDIT_GAME, LOAD_GAME } from "@/store/actions";
import { IActionAdmin } from "@/types/types";
import initialState from "@/store/initialState";

const adminReducer = (state = initialState, action: IActionAdmin) => {
  console.log(action.type);
  switch (action.type) {
    case LOAD_GAME:
      return { ...state, products: action.payload.products };
    case CREATE_NEW_GAME:
      return { ...state, products: [...state.products, action.payload.game] };
    case EDIT_GAME:
      return {
        ...state,
        products: state.products.map((item) => (item.id === action.payload.game.id ? action.payload.game : item)),
      };
    case DELETE_SET_SUCCESS:
      return { ...state, products: state.products.filter((item) => item.id !== action.payload.id) };
    default:
      return state;
  }
};

export default adminReducer;
