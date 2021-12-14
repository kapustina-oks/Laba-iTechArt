import FormSignIn from "@/components/formSignIn/formSignIn";
import FormSignUp from "@/components/formSignUp/formSignUp";
import FormChangePassword from "@/components/formChangePassword/formChangePassword";
import FormEditModal from "../components/formEditModal/formEditModal";
import { dataItems } from "@/types/types";

export const modal = (title: string, onSubmit: () => void, game: dataItems) => {
  switch (title) {
    case "Authorization":
      return <FormSignIn onSubmit={onSubmit} />;
    case "Registration":
      return <FormSignUp onSubmit={onSubmit} />;
    case "Change Password":
      return <FormChangePassword onSubmit={onSubmit} />;
    case "Edit Card":
      return <FormEditModal game={game} onSubmit={onSubmit} />;
    case "Create Card":
      return <FormEditModal onSubmit={onSubmit} />;
    default:
      break;
  }
};
