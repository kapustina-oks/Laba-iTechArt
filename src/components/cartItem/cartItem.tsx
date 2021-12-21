import { adjustItemQty, removeFromCart } from "@/store/actionCreators/cartActions";
import { useDispatch } from "react-redux";
import { ChangeEvent, memo, useState } from "react";
import { ICart } from "@/types/types";

interface ICartItem {
  game: ICart;
}

const CartItem = ({ game }: ICartItem) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState<string | number>(game.qty);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value;
    setInput(num);
    dispatch(adjustItemQty(game.id, num));
    const savedCart = localStorage.getItem("cart");
    if (savedCart != null) {
      const savedCartParsed = JSON.parse(savedCart);
      const currentGame = savedCartParsed.find((item: ICart) => item.id === game.id);
      currentGame.qty = +num;
      localStorage.setItem("cart", JSON.stringify(savedCartParsed));
    }
  };

  const onRemoveItem = (id: number) => () => {
    dispatch(removeFromCart(id));
    const savedCart = localStorage.getItem("cart");
    if (savedCart != null) {
      const savedCartParsed = JSON.parse(savedCart);
      const newListOfGames = savedCartParsed.filter((item: ICart) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newListOfGames));
    }
  };

  return (
    <tr>
      <td className="cart-title">{game.name}</td>
      <td>
        <select className="cart-select" name="select">
          {game.categories.map((item, i) => (
            <option key={i} value="value3">
              {item}
            </option>
          ))}
        </select>
      </td>
      <td className="cart-title">{new Date().toLocaleDateString()}</td>
      <td className="cart-title">
        <input
          className="cart-input"
          min="1"
          type="number"
          id="qty"
          name="qty"
          value={input}
          onChange={onChangeHandler}
        />
      </td>

      <td className="cart-title">{parseInt(game.price, 10) * +input}$</td>
      <td>
        <button onClick={onRemoveItem(game.id)}>
          <i className="fas fa-trash-alt cart-icon" />
        </button>
      </td>
    </tr>
  );
};

export default memo(CartItem);
