import { Auth, AuthContext } from "@/components/context/context";
import Header from "@/components/header/header";
import { Route, Switch } from "react-router-dom";
import Products from "@/pages/product/product";
import About from "@/pages/about/about";
import Home from "@/pages/home/home";
import Page404 from "@/pages/404Page";
import Footer from "@/components/footer/footer";
import React, { useContext } from "react";
import { links } from "@/links";

const { home, product, about, other } = links;

const PublicPage = () => {
  const auth = useContext(AuthContext);
  return (
    <div className="app">
      <Auth value={auth}>
        <Header />
      </Auth>
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
};

export default PublicPage;
