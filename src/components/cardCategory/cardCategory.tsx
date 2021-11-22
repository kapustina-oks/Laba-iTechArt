import { FC } from "react";
import "./cardCategory.css";
import { ICategories } from "@/types/types";

interface PropsCardCategory {
  category: ICategories;
  handleCategory(category: string): void;
}

const CardCategory: FC<PropsCardCategory> = ({ category, handleCategory }): JSX.Element => (
  <>
    <div className="card-category" onClick={() => handleCategory(category.name)}>
      <div className="fab-icons">
        <i className={category.icons} />
      </div>
      <div className="card-title">{category.title}</div>
    </div>
  </>
);

export default CardCategory;
