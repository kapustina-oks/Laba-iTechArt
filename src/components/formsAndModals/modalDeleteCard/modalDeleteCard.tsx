import { useDispatch } from "react-redux";
import { deleteGame } from "../../../store/actionCreators/adminActions";
import "./modalDeleteCard.css";

interface IModalDeleteCard {
  onSubmit: () => void;
  gameID: number;
}

const ModalDeleteCard = ({ onSubmit, gameID }: IModalDeleteCard): JSX.Element => {
  const dispatch = useDispatch();

  const removeGame = () => {
    dispatch(deleteGame(gameID));
    onSubmit();
  };

  return (
    <div className="confirm">
      <p className="title-delete-game">Are you sure to delete this card-game?</p>
      <div className="btn-delete-group">
        <button className="btn-delete" onClick={removeGame}>
          YES
        </button>
        <button className="btn-delete" onClick={onSubmit}>
          NO
        </button>
      </div>
    </div>
  );
};

export default ModalDeleteCard;
