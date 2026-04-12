import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Order from "./Order";
import PizzaOfTheDay from "./pizzaOfTheDay";

// A React functional component
const App = () => {
  return (
    <div>
      <h1>Padre Gino's - Order Now!</h1>
      <Order />
      <PizzaOfTheDay />
    </div>
  );
};

// Select the HTML element where we want React to render,
// create a React root for that container, and render App into it.
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
