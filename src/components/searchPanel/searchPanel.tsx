import { FC, useEffect, useState } from "react";
import "./searchPanel.css";
import { dataItems, getResource } from "@/services/dataService";
import Card from "@/components/card/card";

const SearchPanel: FC = (): JSX.Element => {
  const [filter, setFilter] = useState<string>("");
  const [gameList, setGameList] = useState<dataItems[]>([]);
  const onRequest = (s) => {
    getResource(`/api/games?filter=${s}`).then((data) => setGameList(() => data));
  };
  useEffect(() => {
    onRequest(filter);
  }, [filter]);
  const content = <Card games={gameList} />;
  return (
    <div className="row">
      <form action="" method="get">
        <input
          value={filter}
          onChange={(e) => setFilter((filter: string) => e.target.value)}
          placeholder="Search game..."
          type="search"
        />
        <button type="submit" onClick={() => onRequest(filter)}>
          <i className="fas fa-search" />
        </button>
      </form>
    </div>
  );
};

export default SearchPanel;
