import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";

// A React functional component
const App = () => {
  return (
    <div>
      <h1>Padre Gino's - Order Now!</h1>
      <Pizza
        name="Pepperoni"
        description="Pep, Cheese, N stuff"
        // .webp developed by google. More efficient/better compression compared to JPEG or PNG.
        image={"/public/pizzas/pepperoni.webp"}
      />
      <Pizza
        name="Hawaiian"
        description="Ham, Pineapple, N stuff"
        image={"/public/pizzas/hawaiian.webp"}
      />
      <Pizza
        name="Meat Baby"
        description="All the meats N stuff"
        image={"/public/pizzas/big_meat.webp"}
      />
    </div>
  );
};

// Select the HTML element where we want React to render,
// create a React root for that container, and render App into it.
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
