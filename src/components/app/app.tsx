import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { links } from "@/links";
// eslint-disable-next-line no-use-before-define
import React, { ReactNode } from "react";
import Header from "../header/header";
import Products from "../../pages/product/product";
import SignUp from "../../pages/signUp/signUp";
import About from "../../pages/about/about";
import SignIn from "../../pages/signIn/signIn";
import Home from "../../pages/home/home";
import Page404 from "../../pages/404Page";
import Footer from "../footer/footer";

const { home, product, about, signin, signup, other } = links;

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
      <Router>
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
              <Route path={signin}>
                <SignIn />
              </Route>
              <Route path={signup}>
                <SignUp />
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
      </Router>
    );
  }
}

export default App;
