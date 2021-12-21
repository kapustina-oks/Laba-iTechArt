import { ChangeEvent, FC, useEffect, useState } from "react";
import "./filter.css";
import { IFilterState } from "@/types/types";
import transformParam from "@/utils/transformParam";
import { IObjectKeys } from "@/pages/product/product";
import InputFilter from "@/components/filter/inputFilter";

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
    localStorage.setItem("filter", transformParam(filter as IObjectKeys));
  }, [filter]);

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.dataset;
    const key = Object.keys(target)[0];

    if (key) {
      const value = target[key];
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

        <InputFilter
          name="genre"
          onChange={handleFilter}
          data={["data-genre"]}
          value="all"
          checked={filter.genre === "all"}
          title="All genres"/>

      {/*<label className="filter">*/}
      {/*  <input*/}
      {/*    className="with-gap"*/}
      {/*    name="genre"*/}
      {/*    type="radio"*/}
      {/*    data-genre="all"*/}
      {/*    onChange={handleFilter}*/}
      {/*    checked={filter.genre === "all"}*/}
      {/*  />*/}
      {/*  <span className="label">All genres</span>*/}
      {/*</label>*/}

      <label className="filter">
        <input
          className="with-gap"
          name="genre"
          type="radio"
          data-genre="strategy"
          onChange={handleFilter}
          checked={filter.genre === "strategy"}
        />
        <span className="label">Strategy</span>
      </label>

      <label className="filter">
        <input
          className="with-gap"
          name="genre"
          type="radio"
          data-genre="shooter"
          onChange={handleFilter}
          checked={filter.genre === "shooter"}
        />
        <span className="label">Shooter</span>
      </label>
      <label className="filter">
        <input
          className="with-gap"
          name="genre"
          type="radio"
          data-genre="fighting"
          onChange={handleFilter}
          checked={filter.genre === "fighting"}
        />
        <span className="label">Fighting</span>
      </label>

      <div className="filter_title">Filter by age</div>
      <label className="filter">
        <input
          className="with-gap"
          name="age"
          type="radio"
          data-age="all"
          onChange={handleFilter}
          checked={filter.age === "all"}
        />
        <span className="label">All ages</span>
      </label>

      <label className="filter">
        <input
          className="with-gap"
          name="age"
          type="radio"
          data-age="6+"
          onChange={handleFilter}
          checked={filter.age === "6+"}
        />
        <span className="label">6+</span>
      </label>

      <label className="filter">
        <input
          className="with-gap"
          name="age"
          type="radio"
          data-age="12+"
          onChange={handleFilter}
          checked={filter.age === "12+"}
        />
        <span className="label">12+</span>
      </label>
      <label className="filter">
        <input
          className="with-gap"
          name="age"
          type="radio"
          data-age="18+"
          onChange={handleFilter}
          checked={filter.age === "18+"}
        />
        <span className="label">18+</span>
      </label>

      <div className="filter_title">Sort by rating</div>
      <label className="filter">
        <input
          className="with-gap"
          name="rating"
          type="radio"
          data-rating="ascending"
          onChange={handleFilter}
          checked={filter.rating === "ascending"}
        />
        <span className="label">Ascending</span>
      </label>
      <label className="filter">
        <input
          className="with-gap"
          name="rating"
          type="radio"
          data-rating="descending"
          onChange={handleFilter}
          checked={filter.rating === "descending"}
        />
        <span className="label">Descending</span>
      </label>

      <div className="filter_title">Sort by price</div>
      <label className="filter">
        <input
          className="with-gap"
          name="price"
          type="radio"
          data-price="ascending"
          onChange={handleFilter}
          checked={filter.price === "ascending"}
        />
        <span className="label">Ascending</span>
      </label>
      <label className="filter">
        <input
          className="with-gap"
          name="price"
          type="radio"
          data-price="descending"
          onChange={handleFilter}
          checked={filter.price === "descending"}
        />
        <span className="label">Descending</span>
      </label>
    </div>
  );
};

export default Filter;
