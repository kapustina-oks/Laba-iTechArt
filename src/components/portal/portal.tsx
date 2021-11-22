import { useEffect } from "react";
import ReactDom from "react-dom";

const Portal = ({ children }) => {
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
