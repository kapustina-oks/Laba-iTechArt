import FormSignIn from "@/components/formSignIn/formSignIn";
import FormSignUp from "@/components/formSignUp/formSignUp";
import FormChangePassword from "@/components/formChangePassword/formChangePassword";
import ModalCart from "@/components/modalCart/modalCart";
import { dataItems } from "@/types/types";
import ModalDeleteCard from "@/components/modalDeleteCard/modalDeleteCard";
import FormCreateAndEditCard from "../components/formCreateAndEditCard/formCreateAndEditCard";

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
