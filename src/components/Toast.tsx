import { CheckCircle2, X, XCircle } from "lucide-react";
export type ToastType = "success" | "error";

// Props required by the Toast component.
interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

function Toast({
  message,
  type,
  onClose,
}: ToastProps) {
  const isSuccess = type === "success";

  return (
    <div
      role="alert"
      className="fixed bottom-5 right-5 z-60 w-[calc(100%-2rem)] max-w-sm animate-in slide-in-from-bottom-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:bottom-6 sm:right-6"
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isSuccess
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-600"
            }`}
        >
          {isSuccess ? (
            <CheckCircle2 size={19} />
          ) : (
            <XCircle size={19} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-900">
            {isSuccess ? "Success" : "Something went wrong"}
          </p>

          <p className="mt-0.5 text-sm text-slate-500">
            {message}
          </p>
        </div>
        {/* Button*/}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={17} />
        </button>
      </div>
    </div>
  );
}

export default Toast;