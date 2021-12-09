import { ADD_TO_CART, ADJUST_ITEM_QTY, REMOVE_ALL_ITEM, REMOVE_FROM_CART } from "@/store/actions";

export const addToCart = (itemID) => ({
  type: ADD_TO_CART,
  payload: {
    id: itemID,
  },
});

export const removeFromCart = (itemID) => ({
  type: REMOVE_FROM_CART,
  payload: {
    id: itemID,
  },
});

export const adjustItemQty = (itemID, qty) => ({
  type: ADJUST_ITEM_QTY,
  payload: {
    id: itemID,
    qty,
  },
});

export const removeAllItems = () => ({
  type: REMOVE_ALL_ITEM,
});
