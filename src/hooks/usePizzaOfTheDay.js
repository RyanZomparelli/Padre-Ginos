import { useState, useEffect, useDebugValue } from "react";
import { apiUrl } from "../utils/apiConfig";

const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);

  // Debugging technique made especially for custom hooks:
  useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.name}` : "Loading...");
  // Now open your React Dev Tools and inspect our PizzaOfTheDay component.
  // You'll see our debug value there. This is helpful when you have lots of custom
  // hooks and in particular lots of reused custom hooks that have differing values.
  // It can help at a glance to discern which hook has which data inside of it.

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      const res = await fetch(`${apiUrl}/api/pizza-of-the-day`);
      const data = await res.json();
      setPizzaOfTheDay(data);
    }

    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
};

export default usePizzaOfTheDay;
