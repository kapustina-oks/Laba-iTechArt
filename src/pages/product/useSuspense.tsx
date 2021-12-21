import { useEffect, useState } from "react";

const useSuspense = (
  delay: number,
  updateCards: boolean,
  setUpdateCards: (arg0: boolean) => void,
  children: JSX.Element[],
  fallback: JSX.Element
): JSX.Element | JSX.Element[] => {
  const [renderComponent, setRenderComponent] = useState<JSX.Element | JSX.Element[]>(fallback);

  useEffect(() => {
    if (updateCards) {
      setRenderComponent(children);
    } else {
      setRenderComponent(fallback);
      setTimeout(() => setUpdateCards(true), delay);
    }
  }, [updateCards]);

  return renderComponent;
};
export default useSuspense;
