import { useContext } from "react";
import CartContext from "./contexts/CartContext";
import { Link } from "@tanstack/react-router";

export default function Header() {
  // Subscribe to the context provider. Here we only need cart to keep track of
  // the length.
  const [cart] = useContext(CartContext);
  return (
    <nav>
      <Link to="/">
        <h1 className="logo">Padre Gino's Pizza</h1>
      </Link>
      <div className="nav-cart">
        🛒<span className="nav-cart-number">{cart.length}</span>
      </div>
    </nav>
  );
}
