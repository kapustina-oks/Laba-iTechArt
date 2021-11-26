import { Route, Switch } from "react-router-dom";
import { links } from "@/links";
// eslint-disable-next-line no-use-before-define
import React, { ReactNode } from "react";
import Header from "../header/header";
import Products from "../../pages/product/product";
import About from "../../pages/about/about";
import Home from "../../pages/home/home";
import Page404 from "../../pages/404Page";
import Footer from "../footer/footer";
import UserHeader from "../userHeader/userHeader";
import Profile from "../../pages/profile/profile";
import { AuthContext } from "../context/context";

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

  static contextType = AuthContext;

  // componentDidMount(): void {
  //   const { authLocalStorage } = this.context;
  //   authLocalStorage();
  //   // const user = localStorage.getItem("userName");
  //   // if (user) {
  //   //   authLogIn(true);
  //   // }
  // }

  componentDidCatch(err: Error, info: React.ErrorInfo): void {
    console.log(err, info, this.state.hasError);
    this.setState({ hasError: true });
  }

  render(): JSX.Element {
    const { auth } = this.context;
    return auth ? (
      <div className="app">
        <UserHeader />
        <main>
          <Switch>
            <Route path={`${product}/:categories?`}>
              <Products />
            </Route>
            <Route path={about}>
              <About />
            </Route>
            <Route path={profile}>
              <Profile />
            </Route>
            <Route exact path={home}>
              <Home />
            </Route>
            <Route path={other}>
              <Page404 />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    ) : (
      <div className="app">
        <Header />
        <main>
          <Switch>
            <Route path={`${product}/:categories?`}>
              <Products />
            </Route>
            <Route path={about}>
              <About />
            </Route>
            <Route exact path={home}>
              <Home />
            </Route>
            <Route path={other}>
              <Page404 />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}
export default App;
