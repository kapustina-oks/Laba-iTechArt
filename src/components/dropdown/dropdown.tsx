import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItems } from "../menuItems/menuItems";
import "./dropdown.css";

const Dropdown: FC = () => {
  const [click, setClick] = useState<boolean>(false);

  const handleClick = (): void => setClick(!click);

  return (
    <>
      <ul onClick={handleClick} className={click ? "dropdown-menu clicked" : "dropdown-menu"}>
        {MenuItems.map((item: Menu, i: number) => (
          <li key={i}>
            <Link className={item.cName} to={item.path} onClick={() => setClick(false)}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dropdown;
