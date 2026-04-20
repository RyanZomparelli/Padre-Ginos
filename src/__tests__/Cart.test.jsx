import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";

test("snapshot with nothing in cart", () => {
  // Render Cart in its "empty cart" state.
  const { asFragment } = render(<Cart cart={[]} />);
  // asFragment() returns the rendered DOM fragment for snapshot comparison.
  expect(asFragment()).toMatchSnapshot();
});

test("snapshot with some stuff in cart", () => {
  const { asFragment } = render(
    <Cart
      // Fake but realistic cart data used to test Cart's rendered output.
      // This does not need to match the user's real live cart.
      cart={[
        {
          pizza: {
            id: "pepperoni",
            name: "The Pepperoni Pizza",
            category: "Classic",
            description: "Mozzarella Cheese, Pepperoni",
            image: "/public/pizzas/pepperoni.webp",
            sizes: {
              S: 9.75,
              M: 12.5,
              L: 15.25,
            },
          },
          size: "M",
          price: "$12.50",
        },
        {
          pizza: {
            id: "ckn_pesto",
            name: "The Chicken Pesto Pizza",
            category: "Chicken",
            description:
              "Chicken, Tomatoes, Red Peppers, Spinach, Garlic, Pesto Sauce",
            image: "/public/pizzas/ckn_pesto.webp",
            sizes: {
              S: 12.75,
              M: 16.75,
              L: 20.75,
            },
          },
          size: "L",
          price: "$20.75",
        },
        {
          pizza: {
            id: "bbq_ckn",
            name: "The Barbecue Chicken Pizza",
            category: "Chicken",
            description:
              "Barbecued Chicken, Red Peppers, Green Peppers, Tomatoes, Red Onions, Barbecue Sauce",
            image: "/public/pizzas/bbq_ckn.webp",
            sizes: {
              S: 12.75,
              M: 16.75,
              L: 20.75,
            },
          },
          size: "S",
          price: "$12.75",
        },
      ]}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});

// Snapshot test notes:
// - A snapshot test saves the rendered markup output of this component.
// - Later test runs compare the current output to the saved snapshot file.
// - If the rendered output changes, the snapshot test fails.
//
// What this is testing:
// - Given a specific `cart` prop, does Cart render the same markup as before?
//
// What this is NOT testing:
// - It is not testing the real live cart state in the running app.
// - It is not testing user interactions like adding/removing items.
// - It is not testing the full app flow end-to-end.
//
// Why we pass fake pizza/cart data:
// - Cart is just a React component that renders based on its props.
// - In tests, we can give it realistic fake props to simulate different states,
//   like an empty cart or a cart with items.
//
// Tradeoff of snapshot tests:
// - They are quick and low-effort regression checks.
// - They can become noisy if child components change and affect the snapshot.
