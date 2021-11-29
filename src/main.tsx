import "./styles/main.css";
import "./styles/main.scss";
import React, { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import someTypeScript from "./someTypeScript";
import App from "./components/app/app";
import { Auth, AuthContext } from "./components/context/context";
import FormSignUp from "@/components/formSignUp/formSignUp";

interface AppProps {
  nothing: boolean;
}
interface AppState {
  title: string;
}

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      title: someTypeScript("Test-block for css-modules"),
    };
    // test class-dead-code
    const goExlcude = true;
    if (!goExlcude) {
      console.warn("class-dead-code doesn't work");
    }
  }

  static contextType = AuthContext;

  render() {
    return (
      <StrictMode>
        <Router>
          <Auth value={this.context}>
            <App />
          </Auth>
        </Router>

        {/* <div className="test-block">
          <h2 className={style.mainTitle}>{this.state.title}</h2>
        </div>
        <div className={["test-block", style.background].join(" ")}>
          <h2>Test-block for url-loader</h2>
          <img src={imgSmall} alt="smallImage" />
        </div>
         or it can be
          <img src='/src/images/testSmall.png' alt="smallImage"></img>

        <div className={["test-block", style.svgBackground].join(" ")}>
          <h2>Test-block for svg-url-loader</h2>
          <img src={imgCamera} alt="small_SVG_Image" />
        </div> */}
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
