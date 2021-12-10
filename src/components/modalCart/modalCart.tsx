import { PropsForm } from "@/types/types";
import { useDispatch } from "react-redux";
import { removeAllItems } from "@/store/actionCreators/cartActions";
import "./modalCart.css";

const ModalCart = ({ onSubmit }: PropsForm): JSX.Element => {
  const dispatch = useDispatch();

  const removeAll = () => {
    dispatch(removeAllItems());
    onSubmit();
  };

  return (
    <div className="confirm">
      <p className="title-buy-games">Are you sure to buy this product?</p>
      <div className="btn-cart-group">
        <button className="btn-cart" onClick={removeAll}>YES</button>
        <button className="btn-cart" onClick={onSubmit}>NO</button>
      </div>
    </div>
  );
};

export default ModalCart;
