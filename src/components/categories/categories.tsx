import { FC, useEffect, useState } from "react";
import { dataItems, getResource } from "../../services/dataService";
import Card from "@/components/card/card";
import { useParams } from "react-router-dom";

const Categories: FC = (): JSX.Element => {
  const { categories } = useParams();

  const [category, setCategory] = useState<string>("");
  const [gameList, setGameList] = useState<dataItems[]>([]);
  const onCategoryLoaded = (newCategory: string): void => {
    setCategory(newCategory);
  };
  const onRequest = () => {
    getResource(`/api/games?category=${categories}`).then((data) => setGameList(() => data));
  };
  useEffect(() => {
    onCategoryLoaded(categories);
    onRequest();
  }, [categories]);
  const content = <Card games={gameList} />;
  return (
    <>
      <div className="home_container">{content}</div>
      ;
    </>
  );
};

export default Categories;
