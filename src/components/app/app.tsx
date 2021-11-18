import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { links } from "@/links";
import { Component } from "react";
import Header from "../header/header";
import Products from "../product/product";
import SignUp from "../signUp/signUp";
import About from "../about/about";
import SignIn from "../signIn/signIn";
import Home from "../home/home";
import Page404 from "../pages/404Page";
import Footer from "../footer/footer";


const { home, product, about, signin, signup, other } = links;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(err, info) {
    console.log(err, info);
    this.setState({ error: true });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <main>
            <Switch>

              {/*<Route path={product}>*/}
              {/*  <Products />*/}
              {/*</Route>*/}
              <Route path={`/products/:categories?`}>
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
              <Route exact path={"/"}>
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
