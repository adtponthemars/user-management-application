import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Building2,
    Globe,
    Mail,
    MapPin,
    Phone,
    UserRound,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { getUser } from "../services/userService";
import type { User } from "../types/user";
import type { ReactNode } from "react";

function UserDetails() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

// Fetch the user whenever the ID in the URL changes.
    useEffect(() => {
        async function fetchUser() {
            if (!id) {
                setError("User ID is missing.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const data = await getUser(Number(id));

                setUser(data);
            } catch (error) {
                console.error(error);
                setError("Unable to load this user.");
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [id]);
    
// Show a skeleton while user data is loading.
    if (loading) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
                <div className="animate-pulse space-y-6">
                    <div className="h-5 w-32 rounded bg-slate-200" />
                    <div className="rounded-3xl border border-slate-200 bg-white p-8">
                        <div className="h-20 w-20 rounded-full bg-slate-200" />

                        <div className="mt-5 h-7 w-48 rounded bg-slate-200" />

                        <div className="mt-3 h-4 w-64 rounded bg-slate-200" />

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="h-20 rounded-xl bg-slate-100" />
                            <div className="h-20 rounded-xl bg-slate-100" />
                            <div className="h-20 rounded-xl bg-slate-100" />
                            <div className="h-20 rounded-xl bg-slate-100" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
// Show an error message if the user couldn't be loaded.
    if (error || !user) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                    <ArrowLeft size={17} />
                    Back to users
                </Link>

                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
                    <h1 className="font-semibold text-red-900">
                        Something went wrong
                    </h1>

                    <p className="mt-1 text-sm text-red-700">
                        {error || "User could not be found."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Back button */}
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
                <ArrowLeft size={17} />
                Back to users
            </Link>

            {/* Profile card */}
            <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <div className="bg-primary-dark px-6 py-10 sm:px-8">
                    <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl font-bold text-slate-900">
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="mt-5 sm:ml-5 sm:mt-0">
                            <h1 className="text-2xl font-bold text-white sm:text-3xl">
                                {user.name}
                            </h1>

                            <p className="mt-1 text-sm text-slate-300">
                                @{user.username}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact information */}
                <div className="p-6 sm:p-8">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Contact Information
                    </h2>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <InfoItem
                            icon={<Mail size={18} />}
                            label="Email"
                            value={user.email}
                        />

                        <InfoItem
                            icon={<Phone size={18} />}
                            label="Phone"
                            value={user.phone}
                        />

                        <InfoItem
                            icon={<Globe size={18} />}
                            label="Website"
                            value={user.website}
                        />

                        <InfoItem
                            icon={<UserRound size={18} />}
                            label="Username"
                            value={`@${user.username}`}
                        />
                    </div>

                    {/* Address */}
                    <div className="mt-10">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Address
                        </h2>

                        <div className="mt-5 flex gap-4 rounded-2xl bg-slate-50 p-5">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
                                <MapPin size={19} />
                            </div>

                            <div>
                                <p className="font-medium text-slate-900">
                                    {user.address
                                        ? `${user.address.street}, ${user.address.suite}`
                                        : "Address unavailable"}
                                </p>

                                {user.address && (
                                    <p className="mt-1 text-sm text-slate-500">
                                        {user.address.city}, {user.address.zipcode}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Company */}
                    <div className="mt-10">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Company
                        </h2>

                        <div className="mt-5 rounded-2xl border border-slate-200 p-5">
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                    <Building2 size={19} />
                                </div>

                                <div>
                                    {user.company ? (
                                        <>
                                            <p className="font-medium text-slate-900">
                                                {user.company.name}
                                            </p>

                                            <p className="mt-1 text-sm italic text-slate-500">
                                                "{user.company.catchPhrase}"
                                            </p>

                                            <p className="mt-2 text-xs uppercase tracking-wide text-slate-400">
                                                {user.company.bs}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-sm text-slate-500">
                                            Company information unavailable.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

interface InfoItemProps {
    icon: ReactNode;
    label: string;
    value: string;
}

function InfoItem({
    icon,
    label,
    value,
}: InfoItemProps) {
    return (
        <div className="rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-slate-400">
                {icon}

                <span className="text-xs font-medium uppercase tracking-wide">
                    {label}
                </span>
            </div>

            <p className="mt-2 truncate text-sm font-medium text-slate-900">
                {value}
            </p>
        </div>
    );
}

export default UserDetails;