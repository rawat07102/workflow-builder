import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("root");

const Drawer = ({ open, onClose, children, className, ...props }) => {
  const [shouldRender, setShouldRender] = React.useState(open);

  const keyHandler = React.useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  const onAnimationEnd = () => {
    if (!open) {
      setShouldRender(false);
    }
  };

  React.useEffect(() => {
    if (open) setShouldRender(true);
  }, [open]);

  React.useEffect(() => {
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [keyHandler]);

  return (
    shouldRender &&
    ReactDOM.createPortal(
      <div
        className={`z-50 fixed right-0 top-0 h-screen ${
          open ? "animate-slideIn" : "animate-slideOut"
        } 
        ${className}`}
        onAnimationEnd={onAnimationEnd}
        {...props}
      >
        {children}
      </div>,
      root
    )
  );
};

export default Drawer;
