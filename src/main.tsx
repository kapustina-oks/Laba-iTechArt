import "./styles/main.css";
import "./styles/main.scss";
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/app/app";
import { Auth, AuthContext } from "./components/context/context";

interface AppProps {
  nothing: boolean;
}
interface AppState {
  title: string;
}

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  render() {
    return (
      <StrictMode>
        <Router>
          <Auth value={this.context}>
            <App />
          </Auth>
        </Router>
      </StrictMode>
    );
  }
}
AppContainer.contextType = AuthContext;
ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
