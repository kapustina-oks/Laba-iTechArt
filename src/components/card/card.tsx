import { FC, useEffect, useState } from "react";
import { dataItems, ICart } from "@/types/types";
import "./card.css";
import { addToCart, totalItemsCart, updateCartProductsAction } from "@/store/actionCreators/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers/rootReducer";
import Modal from "@/components/modal/modal";

interface CardProps {
  game: dataItems;
  url: string;
}

const Card: FC<CardProps> = ({ game, url }): JSX.Element => {
  const dispatch = useDispatch();

  const totalItems = useSelector((state: RootState) => state.cart.total);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const productsCart = useSelector((state: RootState) => state.cart.productsCart);
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  const [editModal, setEditModal] = useState<boolean>(false);

  useEffect(() => {
    console.log(url);
    const isCart = cart.find((item) => item.id === game.id);
    if (isCart) {
      dispatch(updateCartProductsAction(game.id, game as ICart));
    }
  }, [productsCart]);

  const onAddHandler = () => {
    dispatch(addToCart(game.id));
    dispatch(totalItemsCart(totalItems + 1));
  };

  const modalHandler =
    (isOpen: boolean): (() => void) =>
    () =>
      setEditModal(isOpen);

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
          <div className="product-img">
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
            <button className="btn1" onClick={onAddHandler}>
              Add to cart
            </button>
            {url === "/products" && isAdmin ? (
              <button className="btn2" onClick={modalHandler(true)}>
                Edit card
              </button>
            ) : null}
            {editModal && <Modal title="Edit Card" game={game} onSubmit={modalHandler(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
