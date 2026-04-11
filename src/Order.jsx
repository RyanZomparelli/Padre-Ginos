import { useState } from "react";
import Pizza from "./Pizza";

// VS an arrow function or function expression, named functions show up in the
// stack trace.
export default function Order() {
  // React useState Hook.  Never use hooks in loops or conditionals because when
  // React rerenders this component, it relies on the state being called in the
  // same order each time to accurately keep track of what changed and what didn't.
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              name="pizza-type"
              id="pizza-type"
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value)}
            >
              <option value="pepperoni">The Pepperoni Pizza</option>
              <option value="hawaiian">The Hawaiian Pizza</option>
              <option value="big_meat">The Big Meat Pizza</option>
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            {/* Event bubbling works in React much like it does in the DOM.
                The change event from the selected radio input bubbles up to this div,
                so we can attach one onChange handler here instead of one on each input.
                Calling setPizzaSize updates state and causes React to rerender. */}
            <div onChange={(e) => setPizzaSize(e.target.value)}>
              <span>
                <input
                  checked={pizzaSize === "S"}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                  // onChange={(e) => setPizzaSize(e.target.value)}
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
                  // onChange={(e) => setPizzaSize(e.target.value)}
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
                  // onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        <div className="order-pizza">
          <Pizza
            name="pepperoni"
            description="another pep pizza"
            image="/public/pizzas/pepperoni.webp"
          />
          <p>$20.45</p>
        </div>
      </form>
    </div>
  );
}
