
import {
  Home,
  FileText,
  Calendar,
  User,
  Star,
  Settings,
  LogOut,
  Bell,
  Search,
  Briefcase,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState("/candidate");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: "Trang chủ", path: "/candidate", icon: Home },
    { name: "Việc làm của tôi", path: "/candidate/applications", icon: FileText },
    { name: "Lịch làm việc", path: "/candidate/calendar", icon: Calendar },
    { name: "Hồ sơ cá nhân", path: "/candidate/profile", icon: User },
    { name: "Đánh giá từ agency", path: "/candidate/reviews", icon: Star },
    { name: "Cài đặt", path: "/candidate/settings", icon: Settings },
  ];

  const handleLogout = () => {
    console.log("Logout clicked - redirect to /login/candidate");
    // In real app: window.location.href = "/login/candidate";
  };

  const handleNavClick = (path) => {
    setActiveTab(path);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  // Get current page name for header
  const getCurrentPageName = () => {
    const currentItem = navItems.find(item => item.path === activeTab);
    return currentItem ? currentItem.name : "Dashboard";
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 to-slate-100 relative">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl flex flex-col overflow-hidden transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-600/8 to-emerald-500/5 rounded-full -translate-y-8 translate-x-8"></div>
        
        {/* Mobile close button */}
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-slate-500 hover:text-orange-600 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo section */}
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

        {/* Navigation */}
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
              <div className={`p-2 rounded-lg transition-colors ${
                activeTab === path
                  ? "bg-white/20"
                  : "bg-slate-100 group-hover:bg-orange-50"
              }`}>
                <Icon className={`w-4 h-4 ${
                  activeTab === path 
                    ? "text-white" 
                    : "text-slate-500 group-hover:text-orange-600"
                }`} />
              </div>
              <span className="ml-3 font-medium text-sm">{name}</span>
              {activeTab === path && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </nav>

        {/* User info & logout */}
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

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-30">
          <div className="px-4 lg:px-8 py-4 lg:py-6">
            <div className="flex items-center justify-between">
              {/* Mobile menu button & title */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 text-slate-600 hover:text-orange-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
                
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
                    {getCurrentPageName()}
                  </h2>
                  <p className="text-xs lg:text-sm text-slate-500 hidden sm:block">
                    Tìm kiếm và quản lý công việc event part-time
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 lg:space-x-4">
                {/* Search bar - hidden on small mobile */}
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm job, sự kiện..."
                    className="pl-10 pr-4 py-2 w-32 sm:w-48 lg:w-64 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                  />
                </div>
                
                {/* Mobile search button */}
                <button className="sm:hidden p-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                  <Search className="w-5 h-5 text-slate-600" />
                </button>
                
                {/* Notifications */}
                <button className="relative p-2 lg:p-3 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 rounded-xl transition-colors group">
                  <Bell className="w-5 h-5 text-slate-600 group-hover:text-orange-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                </button>
                
                {/* Quick stats - only on larger screens */}
                <div className="hidden xl:flex items-center space-x-4 pl-4 border-l border-slate-200">
                  <div className="text-center">
                    <div className="text-lg lg:text-xl font-bold text-orange-600">5</div>
                    <div className="text-xs text-slate-500">Job đã ứng tuyển</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg lg:text-xl font-bold text-emerald-600">2</div>
                    <div className="text-xs text-slate-500">Job đã nhận</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile stats bar */}
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-3">
          <div className="flex justify-around text-center">
            <div>
              <div className="text-lg font-bold text-orange-600">5</div>
              <div className="text-xs text-slate-500">Đã ứng tuyển</div>
            </div>
            <div className="w-px bg-slate-200"></div>
            <div>
              <div className="text-lg font-bold text-emerald-600">2</div>
              <div className="text-xs text-slate-500">Đã nhận</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Demo content - replace with <Outlet /> in real app */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:p-8">
              <div className="text-center py-8 lg:py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {getCurrentPageName()}
                </h3>
                <p className="text-slate-500 max-w-md mx-auto text-sm lg:text-base">
                  Nội dung của trang <strong>{getCurrentPageName()}</strong> sẽ được hiển thị ở đây. 
                  Trong ứng dụng thực tế, đây sẽ là vị trí của component <code>&lt;Outlet /&gt;</code>.
                </p>
                <div className="mt-6 px-4 py-2 bg-slate-100 rounded-lg inline-block">
                  <code className="text-sm text-slate-600">Route: {activeTab}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}