import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "../menuItems/menuItems";
import { Menu } from "../../types/types";
import "./dropdown.css";

const Dropdown: FC = (): JSX.Element => {
  const [click, setClick] = useState<boolean>(false);

  return (
    <>
      <ul onClick={() => setClick(!click)} className={click ? "dropdown-menu clicked" : "dropdown-menu"}>
        {MenuItems.map((item: Menu, i: number) => (
          <li key={i}>
            <Link className={item.cName} to={`/products/${item.path}`} onClick={() => setClick(false)}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dropdown;
