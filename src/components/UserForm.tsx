import {
    useState,
    type ChangeEvent,
    type SubmitEvent,
} from "react";
import type { CreateUserData } from "../types/user";

// Props required to create or update a user.
interface UserFormProps {
    initialData?: CreateUserData;
    submitLabel?: string;
    onSubmit: (data: CreateUserData) => Promise<void>;
    onCancel: () => void;
    submitting?: boolean;
}

function UserForm({
    initialData,
    submitLabel = "Create User",
    onSubmit,
    onCancel,
    submitting = false,
}: UserFormProps) {

    // Stores the current values entered in the form.
    const [formData, setFormData] = useState<CreateUserData>({
        name: initialData?.name ?? "",
        username: initialData?.username ?? "",
        email: initialData?.email ?? "",
        phone: initialData?.phone ?? "",
        website: initialData?.website ?? "",
    });

    const [formError, setFormError] = useState("");

    // Update the corresponding form field when the user types.
    function handleChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }
// Validate the form and submit the user data.
    async function handleSubmit(
        event: SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setFormError("");

        if (!formData.name.trim()) {
            setFormError("Please enter the user's name.");
            return;
        }

        if (!formData.username.trim()) {
            setFormError("Please enter a username.");
            return;
        }

        if (!formData.email.trim()) {
            setFormError("Please enter an email address.");
            return;
        }

        if (!formData.email.includes("@")) {
            setFormError("Please enter a valid email address.");
            return;
        }

        try {
            // Send the validated form data to the parent component.
            await onSubmit(formData);
        } catch {
            setFormError("Something went wrong. Please try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
                <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                    Full Name
                </label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    disabled={submitting}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
                />
            </div>

            {/* Username */}
            <div>
                <label
                    htmlFor="username"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                    Username
                </label>

                <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="e.g. johndoe"
                    disabled={submitting}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
                />
            </div>

            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                    Email
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    disabled={submitting}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
                />
            </div>

            {/* Phone */}
            <div>
                <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                    Phone
                </label>

                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 9876543210"
                    disabled={submitting}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
                />
            </div>

            {/* Website */}
            <div>
                <label
                    htmlFor="website"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                    Website
                </label>

                <input
                    id="website"
                    name="website"
                    type="text"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="e.g. example.com"
                    disabled={submitting}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
                />
            </div>

            {/* Error */}
            {formError && (
                <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    {formError}
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={submitting}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-primary-dark px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? "Saving..." : submitLabel}
                </button>
            </div>
        </form>
    );
}

export default UserForm;