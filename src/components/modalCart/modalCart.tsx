import { PropsForm } from "@/types/types";
import { useDispatch } from "react-redux";
import { removeAllItems } from "@/store/actionCreators/cartActions";

const ModalCart = ({ onSubmit }: PropsForm): JSX.Element => {
  const dispatch = useDispatch();

  const removeAll = () => {
    dispatch(removeAllItems());
    onSubmit();
  };

  return (
    <div className="confirm">
      <p>Are you sure to buy this product?</p>
      <button onClick={removeAll}>YES</button>
      <button onClick={onSubmit}>NO</button>
    </div>
  );
};

export default ModalCart;
