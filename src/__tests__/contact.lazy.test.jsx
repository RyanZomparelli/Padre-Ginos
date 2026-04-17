import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy";

// React Query hooks need a QueryClientProvider to work in tests.
const queryClient = new QueryClient();

// vitest-fetch-mock wraps Vitest's mocking tools so we can fake fetch requests.
// vi is Vitest's mock/spy utility object. createFetchMock uses it to build a
// mocked version of fetch and track how fetch was called during the test.
const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("can submit contatct form", async () => {
  // Fake a successful API response instead of calling the real backend.
  fetchMocker.mockResponse(JSON.stringify({ status: "ok" }));

  // Render the route component inside the React Query provider it depends on.
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>,
  );

  // Find the form fields by their placeholder text.
  const nameInput = screen.getByPlaceholderText("Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const msgTextArea = screen.getByPlaceholderText("Message");

  // Test values we want to submit through the form.
  const testData = {
    name: "Ryan",
    email: "Whathaha@email.com",
    message: "Good stuff man!",
  };

  // Simulate the user filling out the uncontrolled form fields.
  nameInput.value = testData.name;
  emailInput.value = testData.email;
  msgTextArea.value = testData.message;

  // Find and click the submit button.
  const btn = screen.getByRole("button");
  btn.click();

  // Wait for the async success UI to appear after the mutation finishes.
  // options object, heading lvl 3 (h3)
  const h3 = await screen.findByRole("heading", { level: 3 });

  // Assert that the success message is shown.
  expect(h3.innerText).toContain("Submitted");

  // Inspect the mocked fetch calls.
  const requests = fetchMocker.requests();

  // Assert the request happened once and hit the expected endpoint.
  expect(requests.length).toBe(1);
  expect(requests[0].url).toBe("/api/contact");
  // Assert the request payload and options match what the component should send.
  expect(fetchMocker).toHaveBeenCalledWith("/api/contact", {
    body: JSON.stringify(testData),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
});

// What this file is testing:
// This test checks the Contact page's main user flow:
// 1. render the form
// 2. fill in the inputs
// 3. submit the form
// 4. mock a successful API response
// 5. verify the success UI appears
// 6. verify the POST request was sent correctly

// Why we need QueryClientProvider:
// ContactRoute uses React Query's useMutation hook.
// React Query hooks only work when wrapped in a QueryClientProvider.

// Why we use vitest-fetch-mock:
// We do not want tests to call the real backend.
// fetch is mocked so the test stays fast, deterministic, and isolated.
// This lets us verify the request details without depending on the server.

// What Route.options.component means:
// The route file exports a TanStack Router Route object.
// Route.options.component gives us the actual React component function for that route,
// so we can render it directly in the test.

// Why the test is async:
// Submitting the form triggers an async mutation.
// The UI updates only after that async work finishes, so the test waits for the
// "Submitted!" heading to appear with findByRole().

// What kind of test this is:
// This is a component-level behavior test.
// It checks both the visible user result and the network request shape.
// It is slightly implementation-aware because it inspects fetch details directly,
// but that is acceptable here since the API call is simple and not abstracted behind
// a separate API client layer.
