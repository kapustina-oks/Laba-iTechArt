import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResource } from "@/services/dataService";
import Card from "@/components/card/card";
import { dataItems } from "@/types/types";
import "./product.css";

interface IParams {
  categories?: string;
}

const Products: FC = (): JSX.Element => {
  const { categories } = useParams<IParams>();
  const [productList, setProductList] = useState<dataItems[]>([]);
  const [gameCategoryList, setGameCategoryList] = useState<dataItems[]>([]);
  const onRequest = (category: string) => {
    getResource(`/api/games?category=${category}`).then((data) => setGameCategoryList(data));
  };

  useEffect(() => {
    if (categories) {
      onRequest(categories);
    } else {
      getResource("/api/games?").then((data) => setProductList(data));
    }
  }, [categories]);

  const contentCategory = gameCategoryList.map((game) => <Card game={game} key={game.id} />);
  const contentProduct = productList.map((game) => <Card game={game} key={game.id} />);

  return (
    <>
      <div className="home_container">
        <div className="grid_games">{categories ? contentCategory : contentProduct}</div>
      </div>
    </>
  );
};

export default Products;
