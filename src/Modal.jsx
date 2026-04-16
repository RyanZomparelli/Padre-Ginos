import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  // useRef creates a persistant element across renders. Create it once and only once.
  // A ref is a reference to something that need to be exactly the same between renders.
  // A hook would get regenerated / recreated so we need a ref because it'll create
  // a div and then it hand back the same div every render. It's important that it's
  // the same div because it'll be the one we use to render the portal.
  // Gives you an object: {current: null}
  const elRef = useRef(null);
  if (!elRef.current) {
    // elRef {current: <div>}
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
