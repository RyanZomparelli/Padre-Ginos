// What is an error boundary in React?
// An error boundary is a class component that catches JavaScript errors anywhere
// in its child component tree, logs those errors, and displays a fallback UI
// instead of the component tree that crashed. It prevents the entire application
// from breaking when an error occurs in a specific component.

import { Component } from "react";
import { Link } from "@tanstack/react-router";

class ErrorBoundary extends Component {
  state = { hasError: false };

  // Error boundaries must be class components because React only supports the
  // error boundary lifecycle API (getDerivedStateFromError and componentDidCatch)
  // on class components, not function components.
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Uh Oh!</h2>
          <p>
            There was an error with this page.{" "}
            <Link to="/">Click here to go back to the home page.</Link>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
