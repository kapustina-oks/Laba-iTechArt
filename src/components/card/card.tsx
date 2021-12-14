import { FC } from "react";
import { dataItems } from "@/types/types";
import "./card.css";
import { addToCart, totalItemsCart } from "@/store/actionCreators/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers/rootReducer";

interface CardProps {
  game: dataItems;
}

const Card: FC<CardProps> = ({ game }): JSX.Element => {
  const dispatch = useDispatch();
  const totalItems = useSelector((state: RootState) => state.cart.total);

  const onAddHandler = () => {
    dispatch(addToCart(game.id));
    dispatch(totalItemsCart(totalItems + 1));
  };

  let star = "";
  if (game.rating) {
    for (let i = 0; i < game.rating; i++) {
      star += " star_border";
    }
  }
  return (
    <div className="scene" key={game.id}>
      <div className="card">
        <div className="card-front">
          <div>
            <img className="size_img" src={game.img} alt="game_img" />
          </div>
          <div className="card-padding">
            <div className="d_flex">
              <span>{game.name}</span>
              <span>{game.price}</span>
            </div>
            <div>
              <i className="material-icons">{star}</i>
            </div>
          </div>
        </div>
        <div className="card-back text">
          {game.description}
          <button className="btn" onClick={onAddHandler}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
