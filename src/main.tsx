import "./styles/main.css";
import "./styles/main.scss";
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./components/app/app";
import store from "./store/store";

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
          <Provider store={store}>
            <App />
          </Provider>
        </Router>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
