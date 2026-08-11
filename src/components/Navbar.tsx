import { Users } from "lucide-react";
import { Link } from "react-router";

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-primary/30 bg-primary-dark backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white  text-primary-dark">
            <Users size={20} />
          </div>

          <span className="text-lg font-bold tracking-tight text-white">
            UserHub
          </span>
        </Link>

        <div className="text-sm text-accent-light">
          User Management
        </div>
      </div>
    </header>
  );
}

export default Navbar;