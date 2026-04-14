// It’s a reusable formatter for turning numbers into properly formatted U.S. currency strings.
// Note, this functionality is built in with the browser. No library needed.
export const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
