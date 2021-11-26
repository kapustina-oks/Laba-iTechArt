import UserHeader from "@/components/userHeader/userHeader";
import { Route, Switch } from "react-router-dom";
import Products from "@/pages/product/product";
import About from "@/pages/about/about";
import Home from "@/pages/home/home";
import Page404 from "@/pages/404Page";
import Footer from "@/components/footer/footer";
import React from "react";
import { links } from "@/links";
const { home, product, about, other } = links;

const PrivatPage = () => {
  return (
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
  )
}

export default PrivatPage;
