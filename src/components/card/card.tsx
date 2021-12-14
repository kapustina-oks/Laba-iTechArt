import React, { FC, useEffect, useState } from "react";
import { dataItems } from "@/types/types";
import "./card.css";
import { getGame } from "@/store/actionCreators/adminActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers/rootReducer";
import Modal from "@/components/modal/modal";
import FormEditModal from "@/components/formEditModal/formEditModal";

interface CardProps {
  game: dataItems;
  onEditModal(): void;
}

const Card: FC<CardProps> = ({ game, onEditModal }): JSX.Element => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const dispatch = useDispatch();


  useEffect(() => {
    if (editModal) {
      dispatch(getGame(game.id));
    }
  }, [editModal]);

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
          <div className="btn-group-card">
            <button className="btn1">Add to cart</button>
            <button
              className="btn2"
              onClick={() => setEditModal(true)}
            >
              Edit card
            </button>
            {editModal && <Modal title="Edit Card" game={game} onSubmit={() => setEditModal(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
