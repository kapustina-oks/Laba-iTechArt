import Portal from "@/components/portal/portal";
import "./modal.css";
import { modal } from "@/utils/modalUtils";
import { dataItems } from "@/types/types";

interface PropsModal {
  title: string;
  onSubmit: () => void;
  gameID?: number;
  game?: dataItems | undefined;
}

const Modal: ({ title, onSubmit, gameID, game }: PropsModal) => JSX.Element = ({ title, onSubmit, gameID, game }) => {
  const form = modal(title, onSubmit, gameID as number, game);
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
