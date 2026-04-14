import { intl } from "./utils/helpers";

const Cart = ({ cart, checkout }) => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let current = cart[i];
    // We calculate the total from current.pizza.sizes[current.size]
    // because item.price is a formatted string like "$15.99",
    // while current.pizza.sizes[current.size] is the raw number.
    total += current.pizza.sizes[current.size];
  }
  console.log(cart);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size}</span> -
            <span className="type">{item.pizza.name}</span> -
            <span className="price">{item.price}</span>
          </li>
        ))}
      </ul>
      <p>Total: {intl.format(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
};

export default Cart;
