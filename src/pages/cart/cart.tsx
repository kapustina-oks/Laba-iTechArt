import "./cart.css";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers/rootReducer";
import { useEffect, useState } from "react";
import { dataItems, ICart } from "@/types/types";
import CartItem from "../../components/cartItem/cartItem";
import Modal from "../../components/modal/modal";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [cartModal, setCartModal] = useState(false);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item: ICart) => {
      items += item.qty;
      price += item.qty * parseInt(item.price, 10);
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  const openModal = () => {
    setCartModal(true);
  };

  const closeModal = (): void => {
    setCartModal(false);
  };

  return (
    <div className="cart_container">
      <table className="resp-tab">
        <thead>
          <tr>
            <th>Name</th>
            <th>Platform</th>
            <th>Order date</th>
            <th>Amount</th>
            <th>Price($)</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((game: dataItems) => (
            <CartItem key={game.id} game={game} />
          ))}
        </tbody>
      </table>
      <div className="cart-info">
        <p>TOTAL: {totalItems} items</p>
        <p>Games cost: {totalPrice}$</p>
        <p>Your balance: 1000$</p>
        <button className="btn-cart" onClick={openModal}>
          Buy
        </button>
        {cartModal && <Modal title="Buy games" onSubmit={closeModal} />}
      </div>
    </div>
  );
};

export default Cart;
