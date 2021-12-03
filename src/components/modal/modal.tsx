import Portal from "@/components/portal/portal";
import "./modal.css";
import FormSignIn from "../formSignIn/formSignIn";
import FormSignUp from "../formSignUp/formSignUp";
import FormChangePassword from "../formChangePassword/formChangePassword";

interface PropsModal {
  title: string;
  onSubmit: () => void;
}

const Modal: ({ title, onSubmit }: PropsModal) => JSX.Element = ({ title, onSubmit }) => {
  return (
    <>
      <Portal>
        <div className="modal-overlay">
          <div className="modal-window">
            <div className="modal-title">{title}</div>
            <div className="modal-body">
              <div className="icons-close" onClick={onSubmit}>
                <i className="far fa-times-circle" />
              </div>
              {title === "Authorization" ? <FormSignIn onSubmit={onSubmit} /> : null}
              {title === "Registration" ? <FormSignUp onSubmit={onSubmit} /> : null}
              {title === "Change Password" ? <FormChangePassword onSubmit={onSubmit} /> : null}
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default Modal;
