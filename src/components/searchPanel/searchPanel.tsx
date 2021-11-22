import { FC } from "react";
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
    getResource(`/api/games?filter=${e.target.value}`)
      .then((res) => onRequestFilter(res))
      .then(() => onLoading(false));
  };

  // const debounce = (fn, ms: number) => {
  //   let timeout: NodeJS.Timeout;
  //   return function () {
  //     onLoading(true);
  //     const fnCall = () => {
  //       fn.apply(this, arguments);
  //     };
  //     clearTimeout(timeout);
  //     timeout = setTimeout(fnCall, ms);
  //   };
  // };

  // const debounce = (fn: (...args: T[]), ms: number) => {
  //   let timeoutId: ReturnType<typeof setTimeout>;
  //   return function (this: T, ...args: T[]) {
  //     onLoading(true);
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => fn.apply(this, args), ms);
  //   };
  // };

  const debounceSubmit = debounce(handleSubmit, 5000, onLoading);

  return (
    <div className="row">
      <form action="" method="get">
        <input onChange={debounceSubmit} placeholder="Search game..." type="search" />
      </form>
    </div>
  );
};

export default SearchPanel;
