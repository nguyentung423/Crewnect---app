import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Check,
  X,
  Clock,
  Star,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  Briefcase,
  Award,
  MessageSquare,
  MoreVertical,
  FileText,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

export default function Applications() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      candidate: {
        name: "Nguyễn Văn A",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        email: "nguyenvana@gmail.com",
        phone: "0901234567",
        age: 22,
        location: "Hà Nội",
        rating: 4.8,
        experience: "Sinh viên năm 3 - Chưa có kinh nghiệm"
      },
      job: {
        title: "PG Booth - Tech Expo 2025",
        company: "TechViet Solutions",
        type: "Part-time",
        salary: "300k-400k/ngày"
      },
      status: "Đang xem xét",
      appliedDate: "15/09/2025",
      priority: "high",
      notes: "Sinh viên năng động, ngoại hình khá, sẵn sàng học hỏi",
      documents: ["Đơn ứng tuyển.pdf"],
      skills: ["Giao tiếp tốt", "Năng động", "Học nhanh"],
      availability: "Toàn thời gian"
    },
    {
      id: 2,
      candidate: {
        name: "Trần Thị B",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        email: "tranthib@gmail.com",
        phone: "0912345678",
        age: 24,
        location: "Hà Nội",
        rating: 4.9,
        experience: "Nhân viên văn phòng - Tìm thêm việc cuối tuần"
      },
      job: {
        title: "PB Roadshow Samsung",
        company: "Marketing Hub",
        type: "Part-time",
        salary: "350k-450k/ngày"
      },
      status: "Đã chấp nhận",
      appliedDate: "12/09/2025",
      priority: "medium",
      notes: "Có thể làm cuối tuần, thái độ tích cực",
      documents: ["Đơn ứng tuyển.pdf"],
      skills: ["Nhiệt tình", "Thời gian linh hoạt", "Giao tiếp"],
      availability: "Cuối tuần"
    },
    {
      id: 3,
      candidate: {
        name: "Lê Văn C",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        email: "levanc@gmail.com",
        phone: "0923456789",
        age: 20,
        location: "Hà Nội",
        rating: 4.2,
        experience: "Sinh viên năm 2 - Mới bắt đầu"
      },
      job: {
        title: "Hỗ trợ sự kiện công nghệ",
        company: "Event Pro Agency",
        type: "Part-time",
        salary: "250k-300k/ngày"
      },
      status: "Đã từ chối",
      appliedDate: "10/09/2025",
      priority: "low",
      notes: "Chưa sẵn sàng cam kết thời gian dài hạn",
      documents: ["Đơn ứng tuyển.pdf"],
      skills: ["Trẻ trung", "Sử dụng mạng xã hội", "Ham học hỏi"],
      availability: "Linh hoạt"
    },
    {
      id: 4,
      candidate: {
        name: "Phạm Thị D",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        email: "phamthid@gmail.com",
        phone: "0934567890",
        age: 23,
        location: "Hà Nội",
        rating: 4.7,
        experience: "1.5 năm kinh nghiệm Event"
      },
      job: {
        title: "Mascot Lễ Hội Mùa Thu",
        company: "Event Pro Agency",
        type: "Part-time",
        salary: "500k-600k/ngày"
      },
      status: "Chờ phỏng vấn",
      appliedDate: "08/09/2025",
      priority: "high",
      notes: "Ứng viên tiềm năng, cần phỏng vấn trực tiếp",
      documents: ["CV.pdf", "Video_Demo.mp4"],
      skills: ["Diễn xuất", "Tương tác", "Năng lượng cao"],
      availability: "Toàn thời gian"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [priorityFilter, setPriorityFilter] = useState("Tất cả");
  const [selectedApplications, setSelectedApplications] = useState([]);

  const statusColors = {
    "Đang xem xét": "bg-amber-100 text-amber-700 border-amber-200",
    "Đã chấp nhận": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Đã từ chối": "bg-red-100 text-red-700 border-red-200",
    "Chờ phỏng vấn": "bg-blue-100 text-blue-700 border-blue-200"
  };

  const priorityColors = {
    high: "border-l-red-500",
    medium: "border-l-amber-500",
    low: "border-l-green-500"
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Tất cả" || app.status === statusFilter;
    const matchesPriority = priorityFilter === "Tất cả" || app.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const statsData = {
    total: applications.length,
    pending: applications.filter(app => app.status === "Đang xem xét").length,
    accepted: applications.filter(app => app.status === "Đã chấp nhận").length,
    interview: applications.filter(app => app.status === "Chờ phỏng vấn").length,
    rejected: applications.filter(app => app.status === "Đã từ chối").length
  };

  const handleStatusChange = (applicationId, newStatus) => {
    setApplications(apps => apps.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Quản lý Ứng viên
          </h1>
          <p className="text-slate-600">
            Theo dõi và quản lý các đơn ứng tuyển cho jobs event
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng số</p>
                <p className="text-2xl font-bold text-slate-800">{statsData.total}</p>
              </div>
              <Users className="w-5 h-5 text-slate-600" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Đang xét</p>
                <p className="text-2xl font-bold text-amber-600">{statsData.pending}</p>
              </div>
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Chấp nhận</p>
                <p className="text-2xl font-bold text-emerald-600">{statsData.accepted}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Phỏng vấn</p>
                <p className="text-2xl font-bold text-blue-600">{statsData.interview}</p>
              </div>
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Từ chối</p>
                <p className="text-2xl font-bold text-red-600">{statsData.rejected}</p>
              </div>
              <X className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-3xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm ứng viên, vị trí..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              >
                <option value="Tất cả">Tất cả trạng thái</option>
                <option value="Đang xem xét">Đang xem xét</option>
                <option value="Chờ phỏng vấn">Chờ phỏng vấn</option>
                <option value="Đã chấp nhận">Đã chấp nhận</option>
                <option value="Đã từ chối">Đã từ chối</option>
              </select>
              
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              >
                <option value="Tất cả">Tất cả mức độ</option>
                <option value="high">Ưu tiên cao</option>
                <option value="medium">Ưu tiên trung bình</option>
                <option value="low">Ưu tiên thấp</option>
              </select>
            </div>
          </div>
          
          {/* Export Button */}
          <button className="bg-gradient-to-r from-green-800 to-green-700 hover:from-green-900 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-green-800/25 transition-all duration-200 flex items-center gap-2 hover:scale-105">
            <Download className="w-5 h-5" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid gap-6">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className={`bg-white rounded-xl shadow-sm border-l-4 border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200 ${priorityColors[application.priority]}`}
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Candidate Info */}
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={application.candidate.avatar}
                  alt={application.candidate.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-800">
                      {application.candidate.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-medium text-slate-600">
                        {application.candidate.rating}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {application.candidate.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {application.candidate.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {application.candidate.location}, {application.candidate.age} tuổi
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      {application.candidate.experience}
                    </div>
                  </div>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {application.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Notes */}
                  {application.notes && (
                    <p className="text-sm text-slate-600 italic">
                      "{application.notes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Job Info & Status */}
              <div className="lg:w-80 space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-600">Vị trí ứng tuyển</span>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1">{application.job.title}</h4>
                  <p className="text-sm text-slate-600">{application.job.company}</p>
                  <div className="flex items-center justify-between mt-2 text-sm">
                    <span className="text-slate-600">{application.job.type}</span>
                    <span className="font-medium text-green-700">{application.job.salary}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Nộp đơn: {application.appliedDate}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[application.status]}`}>
                    {application.status}
                  </span>
                </div>
                
                {/* Documents */}
                <div className="flex flex-wrap gap-2">
                  {application.documents.map((doc, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs transition-colors"
                    >
                      <FileText className="w-3 h-3" />
                      {doc}
                    </button>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    Chấp nhận
                  </button>
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <X className="w-4 h-4" />
                    Từ chối
                  </button>
                  <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredApplications.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Không có ứng viên nào
          </h3>
          <p className="text-slate-600 mb-4">
            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
          </p>
          <button 
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("Tất cả");
              setPriorityFilter("Tất cả");
            }}
            className="text-green-700 hover:text-green-800 font-medium"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}
