import Portal from "@/components/portal/portal";
import "./modal.css";

const Modal = ({ title, onSubmit, children }) => (
  // const handleSubmit = (): void => {
  //   console.log("Submit function!");
  // };
  //
  // const handleCancel = () => {
  //   console.log("Cancel function!");
  //   setIsOpen(false);
  // };
  <>
    <Portal>
      <div className="modal-overlay">
        <div className="modal-window">
          <div className="modal-title">{title}</div>
          <div className="modal-body">{children}</div>
          <div className="padding-btn">
            <button className="modal-btn" onClick={onSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </Portal>
  </>
);
export default Modal;
