import {
  ADD_TO_CART,
  ADJUST_ITEM_QTY,
  REMOVE_ALL_ITEM,
  REMOVE_FROM_CART,
  TOTAL_ITEMS,
  LOCAL_STORAGE_CART,
  LOAD_CART_PRODUCTS,
  UPDATE_CART_PRODUCTS,
} from "@/store/actions/cartAction";
import { ICart } from "@/types/types";
import dataGames from "@/mock/dataBase";
import { IActionCart, ICartInitialState } from "../types/cartTypes";

const gamesList = [...dataGames];

const initialState: ICartInitialState = {
  productsCart: gamesList,
  cart: [],
  total: 0,
};

const cartReducer = (state = initialState, action: IActionCart): ICartInitialState => {
  let item;
  let inCart;

  if ("payload" in action) {
    item = state.productsCart.find((product) => product.id === action.payload.id) as ICart;
    inCart = state.cart.find((game) => game.id === action.payload.id) as ICart;
    const selectedGames = inCart
      ? state.cart.map((itemCart) =>
          itemCart.id === action.payload.id ? { ...itemCart, qty: itemCart.qty + 1 } : itemCart
        )
      : [...state.cart, { ...item, qty: 1 }];

    switch (action.type) {
      case ADD_TO_CART:
        console.log(item);
        localStorage.setItem("cart", JSON.stringify(selectedGames));
        return {
          ...state,
          cart: selectedGames,
          total: state.total + 1,
        };
      case LOCAL_STORAGE_CART:
        return {
          ...state,
          cart: action.payload.savedGames,
        };
      case REMOVE_FROM_CART:
        return {
          ...state,
          cart: state.cart.filter((game) => game.id !== action.payload.id),
          total: state.total - 1,
        };
      case ADJUST_ITEM_QTY:
        return {
          ...state,
          cart: state.cart.map((game) =>
            game.id === action.payload.id ? { ...game, qty: +action.payload.qty } : game
          ),
        };

      case LOAD_CART_PRODUCTS:
        return {
          ...state,
          productsCart: action.payload.productsCartList,
        };

      case UPDATE_CART_PRODUCTS:
        return {
          ...state,
          cart: state.cart.map((game) =>
            game.id === action.payload.newGameID ? { ...game, ...action.payload.newGame } : game
          ),
        };

      case TOTAL_ITEMS:
        localStorage.setItem("total", String(action.payload.num));
        return {
          ...state,
          total: action.payload.num,
        };

      default:
        return state;
    }
  } else
    switch (action.type) {
      case REMOVE_ALL_ITEM:
        return {
          ...state,
          cart: [],
          total: 0,
        };

      default:
        return state;
    }
};

export default cartReducer;
