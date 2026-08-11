import { Mail, MapPin, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";
import type { User } from "../types/user";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

function UserCard({
  user,
  onEdit,
  onDelete,
}: UserCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 ease-out  hover:-translate-y-1 hover:shadow-lg">
      {/* User identity */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white shadow-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <h2 className="truncate font-semibold text-slate-900">
            {user.name}
          </h2>

          <p className="truncate text-sm text-slate-500">
            @{user.username}
          </p>
        </div>
      </div>

      {/* User information */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Mail size={17} className="shrink-0 text-slate-400" />

          <span className="truncate">
            {user.email}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <MapPin size={17} className="shrink-0 text-slate-400" />

          <span className="truncate">
            {user.address?.city ?? "Location unavailable"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4">
        <Link
          to={`/users/${user.id}`}
          className="flex-1 rounded-xl bg-primary-dark px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-slate-700"
        >
          View Profile
        </Link>

        <button
          type="button"
          onClick={() => onEdit(user)}
          aria-label={`Edit ${user.name}`}
          className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Pencil size={17} />
        </button>

        <button
          type="button"
          onClick={() => onDelete(user)}
          aria-label={`Delete ${user.name}`}
          className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
}

export default UserCard;