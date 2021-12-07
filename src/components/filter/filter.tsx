import { FC, useEffect, useState } from "react";
import "./filter.css";

const initialState = {
  genre: "all",
  age: "all",
  rating: "descending",
  price: "ascending",
};

interface IFilterState {
  genre: string;
  age: string;
  rating: string;
  price: string;
}

interface FilterProps {
  onFilter: (type: string, filter: string) => void;
}



const Filter: FC<FilterProps> = ({ onFilter }: FilterProps): JSX.Element => {
  const [filter, setFilter] = useState<IFilterState>(initialState);
  // const [genre, setGenre] = useState<string>("all");
  // const [age, setAge] = useState<string>("all");
  // const [rating, setRating] = useState<string>("descending");
  // const [price, setPrice] = useState<string>("ascending");

  useEffect(() => {
    onFilter(filter);
    console.log(filter);
  }, [filter]);

  // useEffect(() => {
  //   onFilter("age", age);
  // }, [age]);
  //
  // useEffect(() => {
  //   onFilter("rating", rating);
  // }, [rating]);
  //
  // useEffect(() => {
  //   onFilter("price", price);
  // }, [price]);

  const handleFilter = (e) => {
    const target = e.target.dataset;
    console.log(target);
    switch (e.target.dataset) {
      case target.genre:
        setFilter((prevFilter) => ({ ...prevFilter, genre: target.genre }));
        break;
      case target.age:
        setFilter((prevFilter) => ({ ...prevFilter, age: target.age }));
        break;
      case target.rating:
        setFilter((prevFilter) => ({ ...prevFilter, rating: target.rating }));
        break;
      case target.price:
        setFilter((prevFilter) => ({ ...prevFilter, price: target.price }));
        break;
      default:
        setFilter(filter);
        break;
    }
    // if (e.target.dataset.genre) setGenre(e.target.dataset.genre);
    // if (e.target.dataset.age) setAge(e.target.dataset.age);
    // if (e.target.dataset.rating) setRating(e.target.dataset.rating);
    // if (e.target.dataset.price) setPrice(e.target.dataset.price);
  };

  return (
    <div className="filters">
      <div>Filter by genre</div>
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

      <div>Filter by age</div>
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

      <div>Sort by rating</div>
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

      <div>Sort by price</div>
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
