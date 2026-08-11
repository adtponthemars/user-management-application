import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import UserCard from "../components/UserCard";
import UserCardSkeleton from "../components/UserCardSkeleton";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast, {
    type ToastType,
} from "../components/Toast";

import {
    createUser,
    deleteUser,
    getUsers,
    updateUser,
} from "../services/userService";

import type {
    CreateUserData,
    User,
} from "../types/user";

function Home() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [toast, setToast] = useState<{
        message: string;
        type: ToastType;
    } | null>(null);

    // Fetch users when the page first loads.
    useEffect(() => {
        async function fetchUsers() {
            try {
                setLoading(true);
                setError("");

                const data = await getUsers();

                setUsers(data);
            } catch (error) {
                console.error(error);
                setError("Unable to load users. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    //Hide the toast
    useEffect(() => {
        if (!toast) {
            return;
        }

        const timer = window.setTimeout(() => {
            setToast(null);
        }, 3500);

        return () => {
            window.clearTimeout(timer);
        };
    }, [toast]);

    // Filter users by name based on the search input.
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );
    //Function to create new Users
    async function handleCreateUser(
        userData: CreateUserData
    ) {
        try {
            setSubmitting(true);
            setError("");

            const newUser = await createUser(userData);

            setUsers((currentUsers) => [
                ...currentUsers,
                newUser,
            ]);

            setIsAddModalOpen(false);

            setToast({
                type: "success",
                message: `${newUser.name} was added successfully.`,
            });


        } catch (error) {
            console.error(error);
            setError("Unable to create user. Please try again.");

            setToast({
                type: "error",
                message: "Unable to create the user. Please try again.",
            });
            throw error;
        } finally {
            setSubmitting(false);
        }
    }
    //Function to update user
    async function handleUpdateUser(
        userData: CreateUserData
    ) {
        if (!editingUser) {
            return;
        }

        try {
            setSubmitting(true);
            setError("");

            const updatedUser = await updateUser(
                editingUser.id,
                userData
            );

            setUsers((currentUsers) =>
                currentUsers.map((user) =>
                    user.id === editingUser.id
                        ? {
                            ...user,
                            ...updatedUser,
                        }
                        : user
                )
            );

            setEditingUser(null);

            setToast({
                type: "success",
                message: `${updatedUser.name} was updated successfully.`,
            });
        } catch (error) {
            console.error(error);

            setError(
                "Unable to update user. Please try again."
            );

            setToast({
                type: "error",
                message: "Unable to update the user. Please try again.",
            });

            throw error;
        } finally {
            setSubmitting(false);
        }
    }
    //Function to delete user
    async function handleDeleteUser() {
        if (!deletingUser) {
            return;
        }
        try {
            setDeleting(true);
            setError("");

            await deleteUser(deletingUser.id);

            setUsers((currentUsers) =>
                currentUsers.filter(
                    (user) => user.id !== deletingUser.id
                )
            );

            setToast({
                type: "success",
                message: `${deletingUser.name} was deleted successfully.`,
            });
            setDeletingUser(null);
        } catch (error) {
            console.error(error);

            setError(
                "Unable to delete user. Please try again."
            );

            setToast({
                type: "error",
                message: "Unable to delete the user. Please try again.",
            })
        } finally {
            setDeleting(false);
        }
    }
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Page heading */}
            <section className="mb-8 from-primary-dark
via-primary
to-accent">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-medium text-slate-500">
                            Dashboard
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Users
                        </h1>

                        <p className="mt-2 max-w-xl text-sm text-slate-500 sm:text-base">
                            Manage your users and view their information in one place.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsAddModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-dark px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-md active:translate-y-0"
                    >
                        <Plus size={18} />
                        Add User
                    </button>
                </div>
            </section>

            {/* Search & count */}
            <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                    <label
                        htmlFor="user-search"
                        className="sr-only"
                    >
                        Search users
                    </label>

                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        id="user-search"
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search users..."
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    />
                </div>
            </section>

            {/* Error state */}
            {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Loading state */}
            {loading && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <UserCardSkeleton key={index} />
                    ))}
                </div>
            )}

            {/* User cards */}
            {!loading && !error && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredUsers.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onEdit={(selectedUser) =>
                                setEditingUser(selectedUser)
                            }
                            onDelete={(selectedUser) =>
                                setDeletingUser(selectedUser)
                            }
                        />
                    ))}
                </div>
            )}

            {/* Empty search state */}
            {!loading &&
                !error &&
                filteredUsers.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                        <h2 className="font-semibold text-slate-900">
                            No users found
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Try searching with a different name.
                        </p>
                    </div>
                )}
            {/* Add User modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New User"
            >
                <UserForm
                    onSubmit={handleCreateUser}
                    onCancel={() => setIsAddModalOpen(false)}
                    submitting={submitting}
                />
                {/* Edit User modal */}
            </Modal>
            {editingUser && (
                <Modal
                    isOpen={true}
                    onClose={() => setEditingUser(null)}
                    title="Edit User"
                >
                    <UserForm
                        initialData={{
                            name: editingUser.name,
                            username: editingUser.username,
                            email: editingUser.email,
                            phone: editingUser.phone,
                            website: editingUser.website,
                        }}
                        submitLabel="Save Changes"
                        onSubmit={handleUpdateUser}
                        onCancel={() => setEditingUser(null)}
                        submitting={submitting}
                    />
                </Modal>
            )}
            {/* Delete confirmation dialog */}
            <ConfirmDialog
                isOpen={deletingUser !== null}
                title="Delete user?"
                message={
                    deletingUser
                        ? `Are you sure you want to delete ${deletingUser.name}? This action cannot be undone.`
                        : ""
                }
                confirmText="Delete User"
                loading={deleting}
                onConfirm={handleDeleteUser}
                onCancel={() => setDeletingUser(null)}
            />
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}

export default Home;