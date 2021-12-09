import initialState from "@/store/initialState";
import { ADD_TO_CART, ADJUST_ITEM_QTY, REMOVE_ALL_ITEM, REMOVE_FROM_CART, TOTAL_AMOUNT_ITEMS } from "@/store/actions";

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Great Item data from products array
      const item = state.products.find((product) => product.id === action.payload.id);
      // Check if Item is in cart already
      const inCart = state.cart.find((game) => game.id === action.payload.id);

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) => (item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item))
          : [...state.cart, { ...item, qty: 1 }],
        total: state.total + 1,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((game) => game.id !== action.payload.id),
      };
    case ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((game) => (game.id === action.payload.id ? { ...game, qty: +action.payload.qty } : game)),
      };
    case REMOVE_ALL_ITEM:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
