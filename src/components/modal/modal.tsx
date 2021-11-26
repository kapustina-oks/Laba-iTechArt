import Portal from "@/components/portal/portal";
import "./modal.css";
import FormSignIn from "../formSignIn/formSignIn";
import FormSignUp from "../formSignUp/formSignUp";
import { ReactNode, ReactPortal } from "react";

interface PropsModal {
  title: string;
  onSubmit(): void;
  //children: ReactNode | ReactPortal;
}

const Modal = ({ title, onSubmit }: PropsModal): JSX.Element => (
  <>
    <Portal>
      <div className="modal-overlay">
        <div className="modal-window">
          <div className="modal-title">{title}</div>
          <div className="modal-body">
            <div className="icons-close" onClick={onSubmit}>
              <i className="far fa-times-circle" />
            </div>
            {title === "Authorization" ? (
              <FormSignIn title={title} onSubmit={onSubmit} />
            ) : (
              <FormSignUp title={title} onSubmit={onSubmit} />
            )}
          </div>
        </div>
      </div>
    </Portal>
  </>
);

export default Modal;
