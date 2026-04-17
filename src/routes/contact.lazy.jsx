import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";

// Register the '/contact' route with TanStack Router.
export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

// An uncontrolled form using TanStack Query and the FormData API
function ContactRoute() {
  // useMutation manages a POST/write request and gives us mutation state
  // like isSuccess, isError, and pending/loading.
  const mutation = useMutation({
    // mutationFn is the function TanStack Query runs when mutate() is called.
    mutationFn: function (e) {
      e.preventDefault();
      // FormData is a browser Web API that reads named form fields from the form element.
      // This is an uncontrolled form, so the DOM holds the input values until submit.
      const formData = new FormData(e.target);

      // Send the collected form values to the API helper.
      return postContact(
        formData.get("name"),
        formData.get("email"),
        formData.get("message"),
      );
    },
  });

  // If the mutation fails, mutation.isError can be used to render an error message
  // or fallback UI for the form submission.

  return (
    <div className="contact">
      <h2>Contact</h2>

      {/* After a successful mutation, swap the form for a success message. */}
      {mutation.isSuccess ? (
        <h3>Submitted!</h3>
      ) : (
        // mutation.mutate triggers the mutationFn above and lets TanStack Query
        // manage the async request state for this submission.
        <form onSubmit={mutation.mutate}>
          <input name="name" placeholder="Name" />
          <input name="email" placeholder="Email" type="email" />
          <textarea placeholder="Message" name="message"></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
