import { useState, useEffect, useContext } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
// COMPONENTS
import Pizza from "../Pizza";
import Cart from "../Cart";
// CONTEXTS
import CartContext from "../contexts/CartContext";
// HELPERS
import { intl } from "../utils/helpers";

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

// VS an arrow function or function expression, named functions show up in the
// stack trace.
function Order() {
  // React useState Hook.  Never use hooks in loops or conditionals because when
  // React rerenders this component, it relies on the state being called in the
  // same order each time to accurately keep track of what changed and what didn't.
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  async function checkout() {
    setLoading(true);

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    setCart([]);
    setLoading(false);
  }

  // Derived State
  // Derived state is a value that can be calculated from existing props or state,
  // so it usually should be computed normally rather than stored as its own
  // separate piece of React state.
  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = intl.format(
      selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : "",
    );
  }

  // 'Side effect' (API call) function. If you just called this function below in the component
  //  body, it would run every time the component rerendered. So put it in a useEffect hook!
  async function fetchPizzaTypes() {
    // The Vite proxy setup is what allows relative paths like /api/pizzas instead
    // of a full backend URL during development.
    const pizzaRes = await fetch("/api/pizzas");
    const pizzaData = await pizzaRes.json();
    setPizzaTypes(pizzaData);
    setLoading(false);
  }

  // Dependency array, only run it once. Empty [].
  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCart([
              ...cart,
              { pizza: selectedPizza, size: pizzaSize, price },
            ]);
          }}
        >
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                name="pizza-type"
                // id="pizza-type"
                value={pizzaType}
                onChange={(e) => setPizzaType(e.target.value)}
              >
                {/* <option value="pepperoni">The Pepperoni Pizza</option>
                  <option value="hawaiian">The Hawaiian Pizza</option>
                  <option value="big_meat">The Big Meat Pizza</option>  
                Use map func instead*/}
                {pizzaTypes.map((pizza) => (
                  // When no unique key is provided, React will warn developers in
                  // the console and may inefficiently re-render components by tearing
                  // down and rebuilding them completely, which can impact performance.
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              {/* Event bubbling works in React much like it does in the DOM.
                The change event from the selected radio input bubbles up to this div,
                so we can attach one onChange handler here instead of one on each input.
                Calling setPizzaSize updates state and causes React to rerender. */}
              {/* <div onChange={(e) => setPizzaSize(e.target.value)}> */}
              <div>
                <span>
                  <input
                    checked={pizzaSize === "S"}
                    type="radio"
                    name="pizza-size"
                    value="S"
                    id="pizza-s"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === "M"}
                    type="radio"
                    name="pizza-size"
                    value="M"
                    id="pizza-m"
                    onChange={(e) => setPizzaSize(e.target.value)}
                    //  onChange={(e) => setPizzaSize('M')} - would also work.
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === "L"}
                    type="radio"
                    name="pizza-size"
                    value="L"
                    id="pizza-l"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          {loading ? (
            <h3>LOADING …</h3>
          ) : (
            <div className="order-pizza">
              <Pizza
                name={selectedPizza.name}
                description={selectedPizza.description}
                image={selectedPizza.image}
              />
              <p>{price}</p>
            </div>
          )}
        </form>
      </div>
      {loading ? <h2>Loading...</h2> : <Cart cart={cart} checkout={checkout} />}
    </div>
  );
}
