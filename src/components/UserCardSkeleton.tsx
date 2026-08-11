function UserCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* User identity */}
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-slate-200" />

        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="h-3 w-20 rounded bg-slate-200" />
        </div>
      </div>

      {/* Information */}
      <div className="mt-5 space-y-3">
        <div className="h-4 w-full rounded bg-slate-200" />
        <div className="h-4 w-2/3 rounded bg-slate-200" />
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-2 border-t border-slate-100 pt-4">
        <div className="h-9 flex-1 rounded-xl bg-slate-200" />
        <div className="h-9 w-9 rounded-xl bg-slate-200" />
        <div className="h-9 w-9 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

export default UserCardSkeleton;