import { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers/rootReducer";

interface IPropsProtectedRoute extends RouteProps {
  redirectPath?: string;
}

const ProtectedRouter: FC<IPropsProtectedRoute> = ({ redirectPath, ...rest }: IPropsProtectedRoute) => {
  const auth = useSelector((state: RootState) => state.auth.auth);

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
