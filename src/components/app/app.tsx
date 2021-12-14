import { Route, Switch, Redirect } from "react-router-dom";
import { links } from "@/links";
// eslint-disable-next-line no-use-before-define
import React, { ReactNode } from "react";
import Profile from "@/pages/profile/profile";
import Header from "../header/header";
import Products from "../../pages/product/product";
import About from "../../pages/about/about";
import Home from "../../pages/home/home";
import Footer from "../footer/footer";
import ProtectedRouter from "../protectedRouter/protectedRouter";
import Cart from "../../pages/cart/cart";

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
        </main>
        <Footer />
      </div>
    );
  }
}
export default App;
