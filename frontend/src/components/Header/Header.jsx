import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMenuSharp, IoClose } from "react-icons/io5";

const navLinks = [
  { name: "Trang chủ", path: "/" },
  { name: "Tìm việc", path: "/jobs" },
  { name: "Đăng ký nhân sự", path: "/signup" },
  { name: "Liên hệ", path: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/120x40/FFFFFF/333333?text=CREWNEXT"
            alt="CREWNEXT logo"
            className="h-8 object-contain"
          />
        </Link>

        {/* Desktop menu */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-[#ab3f20] ${
                  isActive ? "text-[#ab3f20]" : "text-[#333333]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/signup"
            className="rounded-xl bg-[#ab3f20] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-95"
          >
            Đăng ký ngay
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl text-[#333333] md:hidden"
          aria-label="Menu"
        >
          {isMenuOpen ? <IoClose /> : <IoMenuSharp />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-[#e0e0e0] bg-white md:hidden">
          <nav className="flex flex-col px-4 py-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-[#f5f5f5] ${
                    isActive ? "text-[#ab3f20]" : "text-[#333333]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 rounded-xl bg-[#ab3f20] px-4 py-2 text-center text-sm font-semibold text-white shadow-md transition hover:brightness-95"
            >
              Đăng ký ngay
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
