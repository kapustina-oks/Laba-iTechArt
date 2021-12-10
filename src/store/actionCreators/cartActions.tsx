import { ADD_TO_CART, ADJUST_ITEM_QTY, REMOVE_ALL_ITEM, REMOVE_FROM_CART, TOTAL_ITEMS } from "@/store/actions";

export const addToCart = (itemID: number) => ({
  type: ADD_TO_CART,
  payload: {
    id: itemID,
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
  payload: { num },
});
