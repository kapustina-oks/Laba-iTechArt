import { ReactElement, ReactNode, useEffect } from "react";
import ReactDom from "react-dom";

interface PropsPortal {
  children: ReactNode;
}

const Portal = ({ children }: PropsPortal): ReactElement<PropsPortal> => {
  const el = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  return ReactDom.createPortal(children, el);
};

export default Portal;
