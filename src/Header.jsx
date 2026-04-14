import { useContext } from "react";
import CartContext from "./contexts/CartContext";

export default function Header() {
  // Subscribe to the context provider. Here we only need cart to keep track of
  // the length.
  const [cart] = useContext(CartContext);
  return (
    <nav>
      <h1 className="logo">Padre Gino's Pizza</h1>
      <div className="nav-cart">
        🛒<span className="nav-cart-number">{cart.length}</span>
      </div>
    </nav>
  );
}
