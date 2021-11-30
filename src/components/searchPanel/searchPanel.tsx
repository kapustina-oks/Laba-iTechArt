import React, { FC } from "react";
import "./searchPanel.css";
import { getResource } from "@/services/dataService";
import { dataItems } from "@/types/types";
import { debounce } from "../debounce/debounce";

interface SearchPanelProps {
  onRequestFilter(res: dataItems[]): void;
  onLoading(load: boolean): void;
}

const SearchPanel: FC<SearchPanelProps> = ({ onRequestFilter, onLoading }): JSX.Element => {
  const handleSubmit = (e: { target: { value: string } }) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      onLoading(false);
      return;
    }
    getResource(`/api/games?filter=${e.target.value}`)
      .then((res) => onRequestFilter(res))
      .then(() => onLoading(false));
  };

  const debounceSubmit: (event: React.ChangeEvent<HTMLInputElement>) => void = debounce(handleSubmit, 1000);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onLoading(true);
    debounceSubmit(event);
  };

  return (
    <div className="row">
      <form action="" method="get">
        <input onChange={onChangeHandler} placeholder="Search game..." type="search" />
      </form>
    </div>
  );
};

export default SearchPanel;
