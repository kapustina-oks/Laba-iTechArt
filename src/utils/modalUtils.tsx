import FormSignIn from "../components/formsAndModals/formSignIn/formSignIn";
import FormSignUp from "../components/formsAndModals/formSignUp/formSignUp";
import FormChangePassword from "../components/formsAndModals/formChangePassword/formChangePassword";
import ModalCart from "../components/formsAndModals/modalCart/modalCart";
import { dataItems } from "../types/types";
import ModalDeleteCard from "../components/formsAndModals/modalDeleteCard/modalDeleteCard";
import FormCreateAndEditCard from "../components/formsAndModals/formCreateAndEditCard/formCreateAndEditCard";

export const modal = (title: string, onSubmit: () => void, gameID: number, game?: dataItems | undefined) => {
  switch (title) {
    case "Authorization":
      return <FormSignIn onSubmit={onSubmit} />;
    case "Registration":
      return <FormSignUp onSubmit={onSubmit} />;
    case "Change Password":
      return <FormChangePassword onSubmit={onSubmit} />;
    case "Buy games":
      return <ModalCart onSubmit={onSubmit} />;
    case "Edit Card":
      return <FormCreateAndEditCard game={game} onSubmit={onSubmit} />;
    case "Create Card":
      return <FormCreateAndEditCard onSubmit={onSubmit} />;
    case "Delete Card":
      return <ModalDeleteCard gameID={gameID} onSubmit={onSubmit} />;
    default:
      break;
  }
};
