import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "@/types/types";
import { MenuItems } from "./menuItems/menuItems";
import "./dropdown.css";

const Dropdown: FC = (): JSX.Element => {
  const [click, setClick] = useState<boolean>(false);

  return (
    <>
      <ul onClick={() => setClick(!click)} className={click ? "dropdown-menu clicked" : "dropdown-menu"}>
        {MenuItems.map((item: Menu) => (
          <li key={item.id}>
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
