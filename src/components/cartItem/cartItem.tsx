import { adjustItemQty, removeFromCart } from "@/store/actionCreators/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/store/reducers/rootReducer";

const CartItem = ({ game }) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState(game.qty);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    dispatch(adjustItemQty(game.id, e.target.value));
  };

  return (
    <>
      <div className="cart-title">{game.name}</div>
      <select name="select">{game.categories.map((item, i) => <option key={i} value="value3">{item}</option>)}</select>
      <div className="cart-title">{new Date().toLocaleDateString()}</div>
      <div className="cart-title">
        <input
          className="cart-input"
          min="1"
          type="number"
          id="qty"
          name="qty"
          value={input}
          onChange={onChangeHandler}
        />
      </div>

      <div className="cart-title">{parseInt(game.price,10) * input}$</div>
      <button onClick={() => dispatch(removeFromCart(game.id))}>
        <i className="fas fa-trash-alt" />
      </button>
    </>
  );
};

export default CartItem;
