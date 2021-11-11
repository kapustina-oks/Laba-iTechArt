import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
            <Routes>
              <Route path={home} element={<Home />} />
              <Route path={product} element={<Products />} />
              <Route path={about} element={<About />} />
              <Route path={signin} element={<SignIn />} />
              <Route path={signup} element={<SignUp />} />
              <Route path={other} element={<Page404 />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
