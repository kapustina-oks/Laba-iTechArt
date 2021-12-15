import Portal from "@/components/portal/portal";
import "./modal.css";
import { modal } from "@/utils/modalUtils";
import { dataItems } from "@/types/types";

interface PropsModal {
  title: string;
  onSubmit: () => void;
  game?: dataItems | undefined;
  gameID?: number;
}

const Modal: ({ title, onSubmit, game, gameID }: PropsModal) => JSX.Element = ({ title, onSubmit, game, gameID }) => {
  const form = modal(title, onSubmit, game, gameID);
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
