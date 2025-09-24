import {
  Home, FileText, Calendar, User, Star, Settings, LogOut,
  Bell, Search, Briefcase, Menu, X
} from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Giữ trạng thái tab hiện tại theo URL (đúng highlight khi F5/điều hướng)
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ ID ứng viên (user.id của Supabase)
  const [candidateId, setCandidateId] = useState(null);

  useEffect(() => {
    // Lấy user hiện tại
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) setCandidateId(data?.user?.id || null);
    })();

    // Theo dõi thay đổi session
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setCandidateId(session?.user?.id || null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Cập nhật activeTab khi URL thay đổi (Back/Forward…)
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const navItems = [
    { name: "Trang chủ", path: "/candidate", icon: Home },
    { name: "Việc làm", path: "/candidate/jobs", icon: Briefcase },
    { name: "Việc làm của tôi", path: "/candidate/applications", icon: FileText },
    { name: "Lịch làm việc", path: "/candidate/calendar", icon: Calendar },
    { name: "Hồ sơ cá nhân", path: "/candidate/profile", icon: User },
    { name: "Đánh giá từ agency", path: "/candidate/reviews", icon: Star },
    { name: "Cài đặt", path: "/candidate/settings", icon: Settings },
  ];

  const handleLogout = () => {
    console.log("Logout clicked - redirect to /login/candidate");
    // Thực tế: await supabase.auth.signOut(); navigate("/login/candidate");
  };

  const handleNavClick = (path) => {
    navigate(path);
    setSidebarOpen(false); // auto-close trên mobile
  };

  const getCurrentPageName = () => {
    const currentItem = navItems.find((item) => item.path === activeTab);
    return currentItem ? currentItem.name : "Dashboard";
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 to-slate-100 relative">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl flex flex-col overflow-hidden transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-slate-500 hover:text-orange-600 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="p-4 lg:p-6 border-b border-slate-200 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Crewnect
              </h1>
              <p className="text-xs text-slate-500 font-medium">Event Jobs</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 lg:p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ name, path, icon: Icon }) => (
            <button
              key={path}
              onClick={() => handleNavClick(path)}
              className={`group flex items-center w-full px-3 lg:px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === path
                  ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-600/25 transform scale-[1.02]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-orange-600 active:bg-slate-100"
              }`}
            >
              <div
                className={`p-2 rounded-lg transition-colors ${
                  activeTab === path ? "bg-white/20" : "bg-slate-100 group-hover:bg-orange-50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${activeTab === path ? "text-white" : "text-slate-500 group-hover:text-orange-600"}`}
                />
              </div>
              <span className="ml-3 font-medium text-sm">{name}</span>
            </button>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-3 lg:p-4 border-t border-slate-200 bg-slate-50/50">
          <div className="flex items-center space-x-3 px-3 lg:px-4 py-3 bg-white rounded-xl shadow-sm mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">Nguyễn Văn A</p>
              <p className="text-xs text-slate-500">Ứng viên PG/PB</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 lg:px-4 py-3 text-red-600 hover:bg-red-50 active:bg-red-100 rounded-xl transition-all duration-200 hover:shadow-sm group"
          >
            <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="ml-3 font-medium text-sm">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-30">
          <div className="px-4 lg:px-8 py-4 lg:py-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-orange-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-slate-800">{getCurrentPageName()}</h2>
                <p className="text-xs lg:text-sm text-slate-500 hidden sm:block">
                  Tìm kiếm và quản lý công việc event part-time
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm job, sự kiện..."
                  className="pl-10 pr-4 py-2 w-32 sm:w-48 lg:w-64 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>
              <button className="relative p-2 lg:p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-slate-600 hover:text-orange-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Nội dung động: ✅ TRUYỀN candidateId xuống các route con */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet context={{ candidateId }} />
          </div>
        </div>
      </main>
    </div>
  );
}
