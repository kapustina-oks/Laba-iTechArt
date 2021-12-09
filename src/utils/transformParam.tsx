import { IObjectKeys } from "@/pages/product/product";

const transformParam = (param: IObjectKeys): string => {
  const keys = Object.keys(param);
  let result = "";

  if (keys.length) {
    const filterParam = keys.map((key) => `${key}=${param[key]}`).join("&");
    result = `${filterParam}`;
    console.log(result);
  }

  return result;
};

export default transformParam;
