import { forwardRef, useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const ErrorModal = forwardRef(function ErrorModal({ error }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current.showModal();
    },
  }));

  return createPortal(
    <dialog ref={dialog}>
      <form className="mt-4 text-right" method="dialog">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid input</h2>
        <p className="text-stone-600 mb-4">{error}</p>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default ErrorModal;
