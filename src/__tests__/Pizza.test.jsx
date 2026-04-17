// Vitest runs the test, but Testing Library helps you test React components more easily.
// happy-dom is the browser-like environment. Node by itself does not have a real
// browser DOM, so happy-dom provides a lightweight fake browser environment so
// your React components can render and interact with a DOM-like API during tests.

// 1. something to run the tests → vitest
// 2. something to render/query React components → @testing-library/react
// 3. something that provides window/document → happy-dom

// The flow is:

// 1. Vitest runs the file and executes each test(...)
// 2. render(...) from Testing Library mounts the Pizza component into a temporary DOM
// 3. You query that rendered output with things like getByRole("img")
// 4. You make assertions with expect(...)
// 5. After each test, cleanup removes the rendered component from the fake DOM so the next test starts fresh

import { render, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "vitest";
import Pizza from "../Pizza";

// Why cleanup is needed

// Because render(...) puts your component into the fake DOM. If you do not clean
// that up, one test can leave old rendered elements behind, and the next test may accidentally see them.

// Why doesn't testing library react automatically know when tests start or finish?

// Because it is a separate library that is usable across different testing
// harnesses like mocha, and is not directly tied to the specific test runner
afterEach(cleanup);

// Make this descriptive of what youre testing.
test("alt text renders on Pizza image", async () => {
  const name = "My Favorite Pizza";
  const src = "https://picsum.photos/200";
  // Screen comes with @testing-library/react. Comes with functions like getByRole.
  const screen = render(
    <Pizza name={name} description="super cool pizza" image={src} />,
  );

  // getByRole queries elements by their accessible role, like "img" or "button".
  const img = screen.getByRole("img");
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});

// async is inculded as a precautionary measure in case async operations are added
// later, and to ensure compatibility with async testing
test("to have default image if none is provided", async () => {
  const screen = render(
    <Pizza name="somthing else" description="super cool pizza" />,
  );

  const img = screen.getByRole("img");
  expect(img.src).not.toBe("");
});
