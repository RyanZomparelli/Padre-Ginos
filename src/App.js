import React from "react";
import { createRoot } from "react-dom/client";

const Pizza = (props) => {
  // A parent div with two sibling elements
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
};

// A React functional component
const App = () => {
  // Using React.createElement instead of JSX to create React elements.
  // It takes a type (like "div" or a component), a props object (or null), and any children.
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Padre Gino's"),
    React.createElement(Pizza, {
      name: "The Pepperoni Pizza",
      description: "Mozzarella Cheese, Pepperoni",
    }),
    React.createElement(Pizza, {
      name: "The Hawaiian",
      description: "Pinnapple and ham",
    }),
    React.createElement(Pizza, {
      name: "Meat Baby",
      description: "All the Meats!",
    }),
    React.createElement(Pizza, {
      name: "Veggie",
      description: "Enough veggies",
    }),
    React.createElement(Pizza, {
      name: "The Good One",
      description: "All the good stuff",
    }),
  ]);
};

// Select the HTML element where we want React to render,
// create a React root for that container, and render App into it.
const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
