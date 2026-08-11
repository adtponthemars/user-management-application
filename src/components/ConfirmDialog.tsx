import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

// Props required to control and display the confirmation dialog.
interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

// Displays a confirmation dialog 
function ConfirmDialog({
    isOpen,
    title,
    message,
    confirmText = "Delete",
    loading = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {

    // Allows the dialog to be closed with the Escape key.
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape" && !loading) {
                onCancel();
            }
        }

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        // Remove the keyboard event listener when the dialog closes.
        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };  
    }, [isOpen, loading, onCancel]);
    
    // Don't render the dialog when it is closed.
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            onMouseDown={onCancel}
        >
            <div
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                onMouseDown={(event) => event.stopPropagation()}
            >
                {/* Icon */}
                <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <AlertTriangle size={21} />
                    </div>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        aria-label="Close confirmation dialog"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* Dialog title and message */}
                <div className="mt-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        {title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        {message}
                    </p>
                </div>

                {/* Cancel and confirm buttons */}
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Deleting..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;