import { FC, useEffect, useState } from "react";
import "./filter.css";

const Filter: FC = ({ onFilter }): JSX.Element => {
  const [genre, setGenre] = useState<string>("all");
  const [age, setAge] = useState<string>("all");

  useEffect(() => {
    onFilter("genre", genre);
  }, [genre]);

  useEffect(() => {
    onFilter("age", age);
  }, [age]);

  const handleFilter = (e) => {
    if (e.target.dataset.type) setGenre(e.target.dataset.type);
    if (e.target.dataset.age) setAge(e.target.dataset.age);
  };

  return (
    <div className="filters">
      <div className="filter_first">
        <input
          className="with-gap"
          name="genre"
          type="radio"
          data-type="all"
          onChange={handleFilter}
          checked={genre === "all"}
        />
        <label className="label">All genres</label>
      </div>

      <div className="filter_first">
        <input
          className="with-gap"
          name="genre"
          type="radio"
          data-type="strategy"
          onChange={handleFilter}
          checked={genre === "strategy"}
        />
        <label className="label">Strategy</label>
      </div>

      <div className="filter_first">
        <input
          className="with-gap"
          name="genre"
          type="radio"
          data-type="shooter"
          onChange={handleFilter}
          checked={genre === "shooter"}
        />
        <label className="label">Shooter</label>
      </div>
      <div className="filter_first">
        <input
          className="with-gap"
          name="genre"
          type="radio"
          data-type="fighting"
          onChange={handleFilter}
          checked={genre === "fighting"}
        />
        <label className="label">Fighting</label>
      </div>



      <div className="filter_second">
        <input
          className="with-gap"
          name="age"
          type="radio"
          data-age="all"
          onChange={handleFilter}
          checked={age === "all"}
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
          checked={age === "6+"}
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
          checked={age === "12+"}
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
          checked={age === "18+"}
        />
        <label className="label">18+</label>
      </div>
    </div>
  );
};

export default Filter;
