import { FC, useContext } from "react";
import { AuthContext } from "@/components/context/context";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface IPropsProtectedRoute extends RouteProps {
  redirectPath?: string;
}

const ProtectedRouter: FC<IPropsProtectedRoute> = ({ redirectPath, ...rest }: IPropsProtectedRoute) => {
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
