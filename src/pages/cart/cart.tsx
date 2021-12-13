import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers/rootReducer";
import { useEffect, useState } from "react";
import { ICart } from "@/types/types";
import { addCartFromLS, totalItemsCart } from "@/store/actionCreators/cartActions";
import CartItem from "../../components/cartItem/cartItem";
import Modal from "../../components/modal/modal";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [cartModal, setCartModal] = useState<boolean>(false);

  useEffect(() => {
    const savedGames = localStorage.getItem("cart");

    if (savedGames) {
      const savedGamesParse = JSON.parse(savedGames);
      dispatch(addCartFromLS(savedGamesParse));
    }
  }, []);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item: ICart) => {
      items += item.qty;
      price += item.qty * parseInt(item.price, 10);
    });

    setTotalItems(items);
    setTotalPrice(price);

    dispatch(totalItemsCart(totalItems));
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
          {cart.map((game: ICart) => (
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
