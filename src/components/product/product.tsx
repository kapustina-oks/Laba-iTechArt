import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataItems, getResource } from "@/services/dataService";
import Card from "@/components/card/card";

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

  const contentCategory = <Card games={gameCategoryList} />;
  const contentProduct = <Card games={productList} />;
  return (
    <>
      <div className="home_container">{categories ? contentCategory : contentProduct}</div>
    </>
  );
};

export default Products;
