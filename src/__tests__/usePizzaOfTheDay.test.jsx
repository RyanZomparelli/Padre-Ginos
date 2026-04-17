// Let's say we needs tests for our custom hook, usePizzaOfTheDay. Testing custom
// hooks is a bit of a trick because they are inherently tied to the internal
// workings of React: they can't be called outside of a component. So how we do
// we get around that? We fake a component!

import { expect, test, vi } from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import usePizzaOfTheDay from "../hooks/usePizzaOfTheDay";
import { redirect } from "@tanstack/react-router";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testPizza = {
  id: "calabrese",
  name: "The Calabrese Pizza",
  category: "Supreme",
  description:
    "Salami, Pancetta, Tomatoes, Red Onions, Friggitello Peppers, Garlic",
  image: "/public/pizzas/calabrese.webp",
  sizes: { S: 12.25, M: 16.25, L: 20.25 },
};

// The easier way to do this is to use renderHook()
// function getPizzaOfTheDay() {
//   let pizza;

//   function TestComponent() {
//     pizza = usePizzaOfTheDay();
//     return null;
//   }

//   render(<TestComponent />);

//   return pizza;
// }

test("gives null when first called", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza));
  // Instead of..
  //   const pizza = getPizzaOfTheDay();
  //   expect(pizza).toBeNull();
  // use:
  const { result } = renderHook(() => usePizzaOfTheDay());
  expect(result.current).toBeNull();
});

// The waitFor function runs an expectation repeatedly until it no longer throws
// an error. It continually attempts to run a test assertion, waiting several
// seconds before ultimately failing if the condition is not met.
test("to call the API and give back the pizza of the day", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay(""));
  await waitFor(() => {
    expect(result.current).toEqual(testPizza);
  });
  expect(fetchMocker).toBeCalledWith("/api/pizza-of-the-day");
});
