import { NavLink, Outlet } from "react-router-dom";
import { 
  Briefcase, FileText, User, Settings, LayoutDashboard, 
  Bell, LogOut, Calendar, Star, TrendingUp 
} from "lucide-react";

export default function CandidateDashboard() {
  const NavButton = ({ to, icon: Icon, children, badge }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left ${
          isActive
            ? "bg-gradient-to-r from-orange-800 to-orange-700 text-white shadow-lg transform scale-[1.02]"
            : "text-slate-600 hover:bg-orange-50 hover:text-orange-800 hover:transform hover:scale-[1.01]"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium flex-1">{children}</span>
      {badge && (
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            badge.type === "success"
              ? "bg-green-600 text-white"
              : "bg-orange-600 text-white"
          }`}
        >
          {badge.text}
        </span>
      )}
      {badge?.dot && <div className="ml-auto w-2 h-2 bg-green-600 rounded-full"></div>}
    </NavLink>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl border-r border-slate-200 flex flex-col relative">
        {/* Header */}
        <div className="px-6 py-6 border-b border-slate-200 bg-gradient-to-r from-orange-800 to-orange-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">EventWork</h1>
              <p className="text-orange-200 text-sm">Candidate Portal</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-800 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              N
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">Nguyễn Văn A</h3>
              <p className="text-sm text-slate-500 flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                4.8 (12 reviews)
              </p>
            </div>
            <Bell className="w-5 h-5 text-slate-400 hover:text-orange-800 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <NavButton to="/candidate" icon={LayoutDashboard} badge={{ text: <TrendingUp className="w-4 h-4" />, type: "icon" }}>
            Tổng quan
          </NavButton>
          <NavButton to="/candidate/jobs" icon={Briefcase} badge={{ text: "42", type: "success" }}>
            Việc làm sự kiện
          </NavButton>
          <NavButton to="/candidate/applications" icon={FileText} badge={{ text: "3", type: "warning" }}>
            Đơn ứng tuyển
          </NavButton>
          <NavButton to="/candidate/profile" icon={User} badge={{ dot: true }}>
            Hồ sơ cá nhân
          </NavButton>
          <NavButton to="/candidate/settings" icon={Settings}>
            Cài đặt
          </NavButton>
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-slate-200">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-4 text-white mb-3">
            <h4 className="font-semibold text-sm mb-1">Nâng cấp Premium</h4>
            <p className="text-xs text-green-100 mb-2">Truy cập không giới hạn các sự kiện</p>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-xs px-3 py-1 rounded-lg transition-colors">
              Tìm hiểu thêm
            </button>
          </div>
          <button className="flex items-center gap-2 w-full px-4 py-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
