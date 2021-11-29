import { FC, useContext } from "react";
import { AuthContext } from "@/components/context/context";
import { Redirect, Route } from "react-router-dom";

interface IPropsProtectedRoute {
  redirectPath: string;
}

const ProtectedRouter: FC<IPropsProtectedRoute> = ({ redirectPath, ...rest }) => {
  const { auth } = useContext(AuthContext);

  return auth ? (
    <Route {...rest} />
  ) : (
    <Route {...rest}>
      <Redirect to={redirectPath || "/"} />
    </Route>
  );
};

ProtectedRouter.defaultProps = {
  redirectPath: "/:login?",
};

export default ProtectedRouter;
