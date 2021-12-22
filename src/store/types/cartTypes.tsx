import { dataItems, ICart } from "@/types/types";

export enum ActionCartTypes {
  ADD_TO_CART = "ADD_TO_CART",
  ADJUST_ITEM_QTY = "ADJUST_ITEM_QTY",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  REMOVE_ALL_ITEM = "REMOVE_ALL_ITEM",
  TOTAL_ITEMS = "TOTAL_ITEMS",
  LOCAL_STORAGE_CART = "LOCAL_STORAGE_CART",
  LOAD_CART_PRODUCTS = "LOAD_CART_PRODUCTS",
  UPDATE_CART_PRODUCTS = "UPDATE_CART_PRODUCTS",
}

interface loadCartProductsAction {
  type: ActionCartTypes.LOAD_CART_PRODUCTS;
  payload: {
    productsCartList: dataItems[];
    id?: number;
  };
}

interface updateCartProductsAction {
  type: ActionCartTypes.UPDATE_CART_PRODUCTS;
  payload: {
    newGameID: number;
    newGame: dataItems;
    id?: number;
  };
}

interface addCartFromLS {
  type: ActionCartTypes.LOCAL_STORAGE_CART;
  payload: {
    savedGames: ICart[];
    id?: number;
  };
}

interface totalItemsCart {
  type: ActionCartTypes.TOTAL_ITEMS;
  payload: {
    num: number;
    id?: number;
  };
}

interface addToCart {
  type: ActionCartTypes.ADD_TO_CART;
  payload: {
    id: number;
  };
}

interface removeFromCart {
  type: ActionCartTypes.REMOVE_FROM_CART;
  payload: {
    id: number;
  };
}

interface adjustItemQty {
  type: ActionCartTypes.ADJUST_ITEM_QTY;
  payload: {
    id: number;
    qty: number;
  };
}

interface removeAllItems {
  type: ActionCartTypes.REMOVE_ALL_ITEM;
}

export type IActionCart =
  | addToCart
  | adjustItemQty
  | removeFromCart
  | removeAllItems
  | totalItemsCart
  | addCartFromLS
  | loadCartProductsAction
  | updateCartProductsAction;
