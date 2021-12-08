import { ChangeEvent, FC, useEffect, useState } from "react";
import "./filter.css";
import { IFilterState } from "@/types/types";

const initialState = {
  genre: "all",
  age: "all",
  rating: "ascending",
  price: "ascending",
};

interface FilterProps {
  onFilter: (filter: IFilterState) => void;
}

const Filter: FC<FilterProps> = ({ onFilter }: FilterProps): JSX.Element => {
  const [filter, setFilter] = useState<IFilterState>(initialState);

  useEffect(() => {
    onFilter(filter);
    console.log(filter);
  }, [filter]);

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.dataset;
    const key = Object.keys(target)[0];
    console.log(key);

    if (key) {
      const value = target[key];
      // if (value === filter[key]) {
      //   return;
      // }
      console.log("value", value);
      console.log("key", key);
      if (key === "price" || key === "rating") {
        setFilter((prevFilter) => ({ ...prevFilter, sort: key, direction: value, [key]: value }));
      } else {
        setFilter((prevFilter) => ({ ...prevFilter, [key]: value }));
      }
    }
  };

  return (
    <div className="filters">
      <div className="filter_title">Filter by genre</div>
      <div className="filter_first">
        <input
          className="with-gap"
          name="genre"
          type="radio"
          data-genre="all"
          onChange={handleFilter}
          checked={filter.genre === "all"}
        />
        <label className="label">All genres</label>
      </div>

      <div className="filter_first">
        <input
          className="with-gap"
          name="genre"
          type="radio"
          data-genre="strategy"
          onChange={handleFilter}
          checked={filter.genre === "strategy"}
        />
        <label className="label">Strategy</label>
      </div>

      <div className="filter_first">
        <input
          className="with-gap"
          name="genre"
          type="radio"
          data-genre="shooter"
          onChange={handleFilter}
          checked={filter.genre === "shooter"}
        />
        <label className="label">Shooter</label>
      </div>
      <div className="filter_first">
        <input
          className="with-gap"
          name="genre"
          type="radio"
          data-genre="fighting"
          onChange={handleFilter}
          checked={filter.genre === "fighting"}
        />
        <label className="label">Fighting</label>
      </div>

      <div className="filter_title">Filter by age</div>
      <div className="filter_second">
        <input
          className="with-gap"
          name="age"
          type="radio"
          data-age="all"
          onChange={handleFilter}
          checked={filter.age === "all"}
        />
        <label className="label">All ages</label>
      </div>

      <div className="filter_second">
        <input
          className="with-gap"
          name="age"
          type="radio"
          data-age="6+"
          onChange={handleFilter}
          checked={filter.age === "6+"}
        />
        <label className="label">6+</label>
      </div>

      <div className="filter_second">
        <input
          className="with-gap"
          name="age"
          type="radio"
          data-age="12+"
          onChange={handleFilter}
          checked={filter.age === "12+"}
        />
        <label className="label">12+</label>
      </div>
      <div className="filter_second">
        <input
          className="with-gap"
          name="age"
          type="radio"
          data-age="18+"
          onChange={handleFilter}
          checked={filter.age === "18+"}
        />
        <label className="label">18+</label>
      </div>

      <div className="filter_title">Sort by rating</div>
      <div className="filter_third">
        <input
          className="with-gap"
          name="rating"
          type="radio"
          data-rating="ascending"
          onChange={handleFilter}
          checked={filter.rating === "ascending"}
        />
        <label className="label">Ascending</label>
      </div>
      <div className="filter_third">
        <input
          className="with-gap"
          name="rating"
          type="radio"
          data-rating="descending"
          onChange={handleFilter}
          checked={filter.rating === "descending"}
        />
        <label className="label">Descending</label>
      </div>

      <div className="filter_title">Sort by price</div>
      <div className="filter_fourth">
        <input
          className="with-gap"
          name="price"
          type="radio"
          data-price="ascending"
          onChange={handleFilter}
          checked={filter.price === "ascending"}
        />
        <label className="label">Ascending</label>
      </div>
      <div className="filter_fourth">
        <input
          className="with-gap"
          name="price"
          type="radio"
          data-price="descending"
          onChange={handleFilter}
          checked={filter.price === "descending"}
        />
        <label className="label">Descending</label>
      </div>
    </div>
  );
};

export default Filter;
