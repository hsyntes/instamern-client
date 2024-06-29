import { useEffect } from "react";

const Toast = ({ show, setToast, children }) => {
  if (!show) return;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setToast(false);
    }, 2000);

    return () => clearTimeout(identifier);
  }, [setToast]);

  return (
    <div className="fixed bg-white dark:bg-dark px-8 py-2 rounded border dark:border-dark shadow bottom-8 z-50">
      {children}
    </div>
  );
};

export default Toast;
