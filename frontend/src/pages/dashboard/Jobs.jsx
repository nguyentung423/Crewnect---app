import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Users,
  MapPin,
  Clock,
  DollarSign,
  MoreVertical,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Star,
  Loader2,
} from "lucide-react";
import { getAgencyJobs, deleteJob, countApplications } from "../../lib/jobsApi";


export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Mock agency_id (replace with actual authentication context)
  const agencyId = "your-agency-id"; // TODO: Replace with actual agency ID from auth context

  const statusColors = {
    "Đang tuyển": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Chờ duyệt": "bg-amber-100 text-amber-700 border-amber-200",
    "Đã duyệt": "bg-blue-100 text-blue-700 border-blue-200",
    "Đã đóng": "bg-gray-100 text-gray-600 border-gray-200",
  };

  const urgencyColors = {
    high: "border-l-red-500 bg-red-50/30",
    medium: "border-l-amber-500 bg-amber-50/30",
    low: "border-l-green-500 bg-green-50/30",
  };

  // Fetch jobs and their application counts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch agency jobs
        const jobsData = await getAgencyJobs(agencyId);
        
        // Fetch application counts for each job
        const jobsWithCounts = await Promise.all(
          jobsData.map(async (job) => {
            const count = await countApplications(job.id);
            return { ...job, applicants: count };
          })
        );
        
        setJobs(jobsWithCounts);
      } catch (err) {
        setError("Không thể tải danh sách công việc. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [agencyId]);

  // Handle job deletion
  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Bạn có chắc muốn xóa công việc này?")) {
      try {
        await deleteJob(jobId);
        setJobs(jobs.filter((job) => job.id !== jobId));
      } catch (err) {
        setError("Không thể xóa công việc. Vui lòng thử lại.");
      }
    }
  };

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Tất cả" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats data
  const statsData = {
    total: jobs.length,
    active: jobs.filter((job) => job.status === "Đang tuyển").length,
    pending: jobs.filter((job) => job.status === "Chờ duyệt").length,
    totalApplicants: jobs.reduce((sum, job) => sum + (job.applicants || 0), 0),
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-green-700 hover:text-green-800 font-medium"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats Cards */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Quản lý Jobs Event
          </h1>
          <p className="text-slate-600">
            Quản lý và theo dõi các công việc part-time trong sự kiện
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng jobs</p>
                <p className="text-2xl font-bold text-slate-800">{statsData.total}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 text-green-700" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Đang tuyển</p>
                <p className="text-2xl font-bold text-emerald-600">{statsData.active}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-emerald-700" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Chờ duyệt</p>
                <p className="text-2xl font-bold text-amber-600">{statsData.pending}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-700" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Ứng viên</p>
                <p className="text-2xl font-bold text-blue-600">{statsData.totalApplicants}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm job, công ty..."
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
                <option value="Đang tuyển">Đang tuyển</option>
                <option value="Chờ duyệt">Chờ duyệt</option>
                <option value="Đã duyệt">Đã duyệt</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm hover:bg-slate-100 transition-colors"
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Create Job Button */}
          <Link
            to="/agency/jobs/new"
            className="bg-gradient-to-r from-green-800 to-green-700 hover:from-green-900 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-green-800/25 transition-all duration-200 flex items-center gap-2 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Đăng job mới
          </Link>
        </div>
      </div>

      {/* Jobs Grid */}
      {jobs.length === 0 && !loading && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Chưa có job nào
          </h3>
          <p className="text-slate-600 mb-4">
            Hãy đăng job mới để bắt đầu tuyển dụng
          </p>
          <Link
            to="/agency/jobs/new"
            className="text-green-700 hover:text-green-800 font-medium"
          >
            Đăng job mới
          </Link>
        </div>
      )}

      {jobs.length > 0 && (
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className={`bg-white rounded-xl shadow-sm border-l-4 border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200 ${urgencyColors[job.urgency] || urgencyColors.low}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Job Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-slate-800">{job.title}</h3>
                        {job.featured && (
                          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                        )}
                      </div>
                      <p className="text-slate-600 font-medium">{job.company_name}</p>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[job.status]}`}>
                      {job.status}
                    </span>
                  </div>

                  {/* Job Details */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>{job.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>{job.created_at.split("T")[0]}</span>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="flex flex-wrap gap-2">
                    {job.requirements?.slice(0, 3).map((req, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs"
                      >
                        {req}
                      </span>
                    ))}
                    {job.requirements?.length > 3 && (
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs">
                        +{job.requirements.length - 3} khác
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats & Actions */}
                <div className="flex lg:flex-col items-center lg:items-end gap-4">
                  <div className="text-center lg:text-right space-y-1">
                    <div className="text-2xl font-bold text-slate-800">{job.applicants || 0}</div>
                    <div className="text-xs text-slate-500">ứng viên</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/agency/jobs/${job.id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
                    >
                      <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                    <Link
                      to={`/agency/jobs/edit/${job.id}`}
                      className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors group"
                    >
                      <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </Link>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                    >
                      <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                    <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State for Filtered Results */}
      {filteredJobs.length === 0 && jobs.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Không tìm thấy job nào
          </h3>
          <p className="text-slate-600 mb-4">
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("Tất cả");
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