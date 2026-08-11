import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
  if (!isOpen) {
    return;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      onClose();
    }
  }

  document.addEventListener(
    "keydown",
    handleKeyDown
  );

  return () => {
    document.removeEventListener(
      "keydown",
      handleKeyDown
    );
  };
}, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="text-lg font-semibold text-slate-900">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-5 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;