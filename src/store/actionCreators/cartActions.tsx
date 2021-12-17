import {
  ADD_TO_CART,
  ADJUST_ITEM_QTY,
  REMOVE_ALL_ITEM,
  REMOVE_FROM_CART,
  TOTAL_ITEMS,
  LOCAL_STORAGE_CART,
  LOAD_CART_PRODUCTS,
  UPDATE_CART_PRODUCTS,
} from "@/store/actions";
import { dataItems, ICart } from "@/types/types";

export const addToCart = (itemID: number) => ({
  type: ADD_TO_CART,
  payload: {
    id: itemID,
  },
});

export const addCartFromLS = (savedGames: dataItems) => ({
  type: LOCAL_STORAGE_CART,
  payload: {
    savedGames,
  },
});

export const loadCartProductsAction = (productsCartList: ICart[]) => ({
  type: LOAD_CART_PRODUCTS,
  payload: {
    productsCartList,
  },
});

export const updateCartProductsAction = (newGameID: number, newGame: ICart) => ({
  type: UPDATE_CART_PRODUCTS,
  payload: {
    newGameID,
    newGame,
  },
});

export const removeFromCart = (itemID: number) => ({
  type: REMOVE_FROM_CART,
  payload: {
    id: itemID,
  },
});

export const adjustItemQty = (itemID: number, qty: string) => ({
  type: ADJUST_ITEM_QTY,
  payload: {
    id: itemID,
    qty,
  },
});

export const removeAllItems = () => ({
  type: REMOVE_ALL_ITEM,
});

export const totalItemsCart = (num: number) => ({
  type: TOTAL_ITEMS,
  payload: {
    num,
  },
});
