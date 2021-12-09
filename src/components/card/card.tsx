import { FC } from "react";
import { dataItems } from "@/types/types";
import "./card.css";
import { addToCart } from "@/store/actionCreators/cartActions";
import { useDispatch } from "react-redux";

interface CardProps {
  game: dataItems;
}

const Card: FC<CardProps> = ({ game }): JSX.Element => {
  const dispatch = useDispatch();

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
          <button className="btn" onClick={() => dispatch(addToCart(game.id))}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
