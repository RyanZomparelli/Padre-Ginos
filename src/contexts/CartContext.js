import { createContext } from "react";

//  The [[], function () {}] isn't strictly necessary; it's a default value your
// context would use if no context provider is there (which should never happen.)
// This really only ends up being useful for TypeScript types – the type you give
// here is what TypeScript will use to validate it. In theory it could be helpful
// for testing too. The reason for the weird value is that it's a React hook: an
// array where the first value is an array (like our cart is) and the second value
// is a function (the setCart function).
const CartContext = createContext([[], function () {}]);

export default CartContext;
