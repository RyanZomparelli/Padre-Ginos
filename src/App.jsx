import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
// COMPONENTS
import Order from "./Order";
import PizzaOfTheDay from "./pizzaOfTheDay";
import Header from "./Header";
// CONTEXTS
import CartContext from "./contexts/CartContext";

// A React functional component
const App = () => {
  const cartHook = useState([]);
  return (
    <CartContext.Provider value={cartHook}>
      <div>
        <Header />
        <Order />
        <PizzaOfTheDay />
      </div>
    </CartContext.Provider>
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
