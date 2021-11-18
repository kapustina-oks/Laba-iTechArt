import { FC } from "react";
import "./searchPanel.css";
import { dataItems, getResource } from "@/services/dataService";

interface SearchPanelProps {
  onRequestFilter(res: dataItems[]): void;
  onLoading(load: boolean): void;
}


const SearchPanel: FC<SearchPanelProps> = ({ onRequestFilter, onLoading }): JSX.Element => {
  const handleSubmit = (e) => {
    console.log(e.target.value);
    getResource(`/api/games?filter=${e.target.value}`)
      .then((res) => onRequestFilter(res))
      .then(() => onLoading(false));
  };

  const debounce = (fn, ms: number) => {
    let timeout;
    return function() {
      onLoading(true);
      const fnCall = () => {fn.apply(this, arguments)}
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms);
    };
  };
  const debounceSubmit = debounce(handleSubmit, 5000);
  return (
    <div className="row">
      <form action="" method="get">
        <input
          onChange={debounceSubmit}
          placeholder="Search game..."
          type="search"
        />

      </form>
    </div>
  );
};

export default SearchPanel;
