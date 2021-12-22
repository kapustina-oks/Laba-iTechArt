import { Route, Switch, Redirect } from "react-router-dom";
import { links } from "@/links";
// eslint-disable-next-line no-use-before-define
import React, { lazy, ReactNode, Suspense } from "react";
import Spinner from "@/components/spinner/spinner";
import Header from "../header/header";
import Home from "../../pages/home/home";
import Footer from "../footer/footer";
import ProtectedRouter from "../protectedRouter/protectedRouter";

const Products = lazy(() => import("../../pages/product/product"));
const Cart = lazy(() => import("../../pages/cart/cart"));
const Profile = lazy(() => import("@/pages/profile/profile"));
const About = lazy(() => import("../../pages/about/about"));

const { home, product, about, profile, other } = links;

interface PropsApp {
  [key: string]: unknown;
  children?: ReactNode | ReactNode[] | null;
}

interface IState {
  hasError: boolean;
}

class App extends React.Component<PropsApp, IState> {
  ["constructor"]: typeof App;

  constructor(props: PropsApp) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(err: Error, info: React.ErrorInfo): void {
    console.log(err, info, this.state.hasError);
    this.setState({ hasError: true });
  }

  render(): JSX.Element {
    return (
      <div className="app">
        <Header />
        <main>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <ProtectedRouter path={`${product}/:categories?`}>
                <Products />
              </ProtectedRouter>
              <ProtectedRouter path={about}>
                <About />
              </ProtectedRouter>
              <ProtectedRouter path={profile}>
                <Profile />
              </ProtectedRouter>
              <ProtectedRouter path="/cart">
                <Cart />
              </ProtectedRouter>
              <Route exact path="/:login?">
                <Home />
              </Route>
              <Redirect from={other} to={home} />
            </Switch>
          </Suspense>
        </main>
        <Footer />
      </div>
    );
  }
}
export default App;
