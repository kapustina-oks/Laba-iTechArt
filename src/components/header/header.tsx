import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { links } from "@/links";
import { useDispatch, useSelector } from "react-redux";
import { authLogOutAction, closeModalAction } from "@/store/actionCreators/authActions";
import { RootState } from "@/store/reducers/rootReducer";
import { addCartFromLS, totalItemsCart } from "@/store/actionCreators/cartActions";
import Modal from "../modal/modal";
import Dropdown from "../dropdown/dropdown";

const { home, product, about } = links;

const Header: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.auth.modal);
  const auth = useSelector((state: RootState) => state.auth.auth);
  const userName = useSelector((state: RootState) => state.auth.userName);
  const total = useSelector((state: RootState) => state.cart.total);

  const [dropdown, setDropdown] = useState<boolean>(false);
  const [isOpenModalSignIn, setIsOpenModalSignIn] = useState<boolean>(false);
  const [isOpenModalSignUp, setIsOpenModalSignUp] = useState<boolean>(false);

  useEffect(() => {
    const savedGames = localStorage.getItem("cart");
    const totalGames = localStorage.getItem("total");

    if (savedGames) {
      dispatch(addCartFromLS(JSON.parse(savedGames)));
    }

    if (totalGames) {
      dispatch(totalItemsCart(+JSON.parse(totalGames)));
    }
  }, []);

  useEffect(() => {
    if (modal) {
      setIsOpenModalSignUp(true);
      dispatch(closeModalAction());
    }
  }, [modal]);

  const openModal = (event: React.SyntheticEvent<HTMLElement>) => {
    if (event.currentTarget.dataset.sign === "signIn") {
      setIsOpenModalSignIn(true);
    }
    if (event.currentTarget.dataset.sign === "signUp") {
      setIsOpenModalSignUp(true);
    }
  };

  const closeModal = (): void => {
    setIsOpenModalSignIn(false);
    setIsOpenModalSignUp(false);
  };

  let className = "nav-elem arrow";
  if (dropdown) {
    className = "nav-elem arrow-top";
  }

  const dropdownHandler =
    (isOpen: boolean): (() => void) =>
    () =>
      setDropdown(isOpen);

  const signUpHandler = () => {
    dispatch(authLogOutAction());
    localStorage.clear();
  };

  return (
    <header>
      {auth ? (
        <div className="container">
          <div className="logo">Game Store</div>
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-elem">
                <Link className="nav-link" to={home}>
                  Home
                </Link>
              </li>
              <li className={className} onMouseEnter={dropdownHandler(true)} onMouseLeave={dropdownHandler(false)}>
                <Link className="nav-link" to={product}>
                  Products
                </Link>
                {dropdown && <Dropdown />}
              </li>
              <li className="nav-elem">
                <Link className="nav-link" to={about}>
                  About
                </Link>
              </li>
              <li className="nav-elem" data-sign="signUp">
                <Link className="nav-link" to="/profile">
                  <div className="icons-flex">
                    <i className="fas fa-user icons-size" />
                    <div className="icons-text">{userName}</div>
                  </div>
                </Link>
              </li>
              <li className="nav-elem" data-sign="signIn">
                <Link className="nav-link" to="/cart">
                  <div className="icons-flex">
                    <i className="fas fa-shopping-cart icons-size" />
                    <div className="icons-text">{total}</div>
                  </div>
                </Link>
              </li>
              <li className="nav-elem" data-sign="signUp" onClick={signUpHandler}>
                <Link className="nav-link" to="/">
                  <i className="fas fa-sign-out-alt icons-size" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div className="container">
          <div className="logo">Game Store</div>
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-elem">
                <Link className="nav-link" to={home}>
                  Home
                </Link>
              </li>
              <li className="nav-elem arrow">
                <Link className="nav-link" to={product}>
                  Products
                </Link>
              </li>
              <li className="nav-elem">
                <Link className="nav-link" to={about}>
                  About
                </Link>
              </li>
              <li className="nav-elem" data-sign="signIn" onClick={openModal}>
                <div className="nav-link">Sign in</div>
              </li>
              {isOpenModalSignIn && <Modal title="Authorization" onSubmit={closeModal} />}
              <li className="nav-elem " data-sign="signUp" onClick={openModal}>
                <div className="nav-link">Sign up</div>
              </li>
              {isOpenModalSignUp && <Modal title="Registration" onSubmit={closeModal} />}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
