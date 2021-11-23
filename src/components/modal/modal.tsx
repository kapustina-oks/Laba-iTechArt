import Portal from "@/components/portal/portal";
import "./modal.css";
import FormSignIn from "../formSignIn/formSignIn";
import FormSignUp from "../formSignUp/formSignUp";

interface PropsModal {
  title: string;
  onSubmit(): void;
  // children: ReactNode;
}

const Modal = ({ title, onSubmit }: PropsModal) => {
  // const [login, setLogin] = useState("");
  // const [password, setPassword] = useState("");

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   setLogin(e.target.value);
  // };

  if (title === "Authorization") {
    return (
      <>
        <Portal>
          <div className="modal-overlay">
            <div className="modal-window">
              <div className="modal-title">{title}</div>
              <FormSignIn title={title} onSubmit={onSubmit} />
            </div>
          </div>
        </Portal>
      </>
    );
  }

  if (title === "Registration") {
    return (
      <>
        <Portal>
          <div className="modal-overlay">
            <div className="modal-window">
              <div className="modal-title">{title}</div>
              <FormSignUp title={title} onSubmit={onSubmit} />
            </div>
          </div>
        </Portal>
      </>
    );
  }
};

export default Modal;
