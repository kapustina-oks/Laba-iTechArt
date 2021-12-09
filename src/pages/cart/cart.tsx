import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers/rootReducer";
import React, { useEffect, useState } from "react";
import Modal from "@/components/modal/modal";
import CartItem from "../../components/cartItem/cartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [cartModal, setCartModal] = useState(false);


  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * parseInt(item.price, 10);
    });

    setTotalItems(items);
    setTotalPrice(price);

  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  const openModal = (event: React.SyntheticEvent<HTMLElement>) => {
    setCartModal(true);
  };

  const closeModal = (): void => {
    setCartModal(false);
  };

  return (
    <div className="home_container">
      <div>
        <p>TOTAL: ({totalItems} items)</p>
        <p>Games cost: {totalPrice}$</p>
        <p>Your balance: 1000$</p>
        <button onClick={openModal}>Buy</button>
        {cartModal && <Modal title="Buy games" onSubmit={closeModal} />}
      </div>
      <div className="grid_cart">
        <div className="cart-title">Name</div>
        <div className="cart-title">Platform</div>
        <div className="cart-title">Order date</div>
        <div className="cart-title">Amount</div>
        <div className="cart-title">Price($)</div>
        <div className="cart-title">Remove</div>
        {cart.map((game) => (
          <CartItem key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
