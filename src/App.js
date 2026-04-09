// A React functional component
const App = () => {
  // Using React.createElement instead of JSX to create React elements.
  // It takes a type (like "div" or a component), a props object (or null), and any children.
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Padre Gino's"),
  );
};

// Select the HTML element where we want React to render,
// create a React root for that container, and render App into it.
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
