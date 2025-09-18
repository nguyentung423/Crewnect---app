import { useState } from "react";
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Calendar, 
  Search,
  Filter,
  Star,
  Users,
  Briefcase,
  Heart,
  Eye,
  ChevronDown,

  Building2,
  Award,
  Bookmark
} from "lucide-react";

export default function CandidateJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set([1, 3]));
  
  const [jobs] = useState([
    {
      id: 1,
      title: "PG Booth - Tech Expo 2025",
      company: "TechViet Solutions",
      companyLogo: "🏢",
      location: "TTTM Vincom Bà Triệu, Hà Nội",
      salary: "300k-400k/ngày",
      duration: "3 ngày",
      startDate: "2025-09-15",
      endDate: "2025-09-17",
      category: "pg",
      requirements: ["Ngoại hình khá", "Giao tiếp tốt", "Kinh nghiệm PG"],
      benefits: ["Ăn trưa miễn phí", "Xe đưa đón", "Thưởng hiệu suất"],
      urgency: "high",
      applicants: 23,
      rating: 4.8,
      description: "Tuyển PG cho gian hàng công nghệ tại triển lãm lớn nhất năm. Cần có kinh nghiệm và kỹ năng giao tiếp tốt.",
      tags: ["Tech", "Triển lãm", "Full-time"]
    },
    {
      id: 2,
      title: "Mascot Lễ Hội Mùa Thu",
      company: "Event Pro Agency",
      companyLogo: "🎭",
      location: "Công viên Thống Nhất, Hà Nội",
      salary: "500k-600k/ngày",
      duration: "2 ngày",
      startDate: "2025-10-01",
      endDate: "2025-10-02",
      category: "mascot",
      requirements: ["Cao từ 1m65", "Hoạt bát", "Chịu được trang phục"],
      benefits: ["Lương cao", "Bữa ăn", "Trang phục được cung cấp"],
      urgency: "medium",
      applicants: 45,
      rating: 4.5,
      description: "Vào vai mascot cho lễ hội mùa thu, cần người hoạt bát và có thể mặc trang phục mascot trong thời gian dài.",
      tags: ["Lễ hội", "Outdoor", "Weekend"]
    },
    {
      id: 3,
      title: "MC Chương trình âm nhạc",
      company: "Music Events Co.",
      companyLogo: "🎵",
      location: "Nhà hát Lớn, Hà Nội",
      salary: "800k-1.2tr/buổi",
      duration: "1 buổi",
      startDate: "2025-09-25",
      endDate: "2025-09-25",
      category: "mc",
      requirements: ["Kinh nghiệm MC", "Giọng hay", "Trang phục lịch sự"],
      benefits: ["Lương cao", "Networking", "Kinh nghiệm quý báu"],
      urgency: "high",
      applicants: 12,
      rating: 4.9,
      description: "Tìm MC có kinh nghiệm để dẫn chương trình âm nhạc cổ điển tại Nhà hát Lớn.",
      tags: ["MC", "Âm nhạc", "Cao cấp"]
    },
    {
      id: 4,
      title: "Nhân viên Setup sự kiện",
      company: "Pro Setup Team",
      companyLogo: "🔧",
      location: "JW Marriott Hanoi",
      salary: "250k-300k/ngày",
      duration: "1 ngày",
      startDate: "2025-09-20",
      endDate: "2025-09-20",
      category: "setup",
      requirements: ["Khỏe mạnh", "Làm việc nhóm", "Có kinh nghiệm setup"],
      benefits: ["Làm việc tại khách sạn 5*", "Team trẻ", "Ăn trưa miễn phí"],
      urgency: "low",
      applicants: 67,
      rating: 4.3,
      description: "Setup và dọn dẹp cho sự kiện công ty tại khách sạn 5 sao. Cần thể lực tốt.",
      tags: ["Setup", "Khách sạn", "Team work"]
    }
  ]);

  const categories = [
    { id: "all", name: "Tất cả", count: jobs.length },
    { id: "pg", name: "PG/PB", count: jobs.filter(j => j.category === "pg").length },
    { id: "mascot", name: "Mascot", count: jobs.filter(j => j.category === "mascot").length },
    { id: "mc", name: "MC/Host", count: jobs.filter(j => j.category === "mc").length },
    { id: "setup", name: "Setup", count: jobs.filter(j => j.category === "setup").length }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default: return "text-green-600 bg-green-50 border-green-200";
    }
  };

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case "high": return "Gấp";
      case "medium": return "Bình thường";
      default: return "Không gấp";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-800 to-orange-700 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Tìm việc làm sự kiện</h1>
        <p className="text-orange-100">Khám phá {jobs.length} cơ hội part-time hấp dẫn</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm theo tên việc, công ty hoặc địa điểm..."
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Lọc
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-orange-800 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-800"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center text-2xl">
                      {job.companyLogo}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Building2 className="w-4 h-4" />
                        <span>{job.company}</span>
                        <div className="flex items-center gap-1 ml-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{job.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full">
                        {tag}
                      </span>
                    ))}
                    <span className={`px-2 py-1 text-xs rounded-full border ${getUrgencyColor(job.urgency)}`}>
                      {getUrgencyText(job.urgency)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      savedJobs.has(job.id)
                        ? "bg-orange-50 border-orange-200 text-orange-600"
                        : "bg-white border-slate-200 text-slate-400 hover:text-orange-600"
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 font-medium transition-all transform hover:scale-105">
                    Ứng tuyển ngay
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-slate-700 mb-4">{job.description}</p>
              
              {/* Job Details Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Địa điểm</p>
                    <p className="text-sm">{job.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-slate-600">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Lương</p>
                    <p className="text-sm font-bold text-green-600">{job.salary}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Thời gian</p>
                    <p className="text-sm">{job.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-slate-600">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Ứng viên</p>
                    <p className="text-sm">{job.applicants} người</p>
                  </div>
                </div>
              </div>

              {/* Requirements and Benefits */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-orange-600" />
                    Yêu cầu
                  </h4>
                  <ul className="space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-slate-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 text-green-600" />
                    Quyền lợi
                  </h4>
                  <ul className="space-y-1">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-slate-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Bắt đầu: {new Date(job.startDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>156 lượt xem</span>
                  </div>
                </div>
                
                <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                  Xem chi tiết →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">Không tìm thấy việc làm</h3>
          <p className="text-slate-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
        </div>
      )}
    </div>
  );
}