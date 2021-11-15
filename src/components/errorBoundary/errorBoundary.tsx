import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.error) {
      return <h2>Something went wrong</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
