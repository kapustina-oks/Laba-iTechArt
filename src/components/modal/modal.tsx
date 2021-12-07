import Portal from "@/components/portal/portal";
import "./modal.css";
import { modal } from "@/utils/modalUtils";

interface PropsModal {
  title: string;
  onSubmit: () => void;
}

const Modal: ({ title, onSubmit }: PropsModal) => JSX.Element = ({ title, onSubmit }) => {
  const form = modal(title, onSubmit);
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
              {form}
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default Modal;
