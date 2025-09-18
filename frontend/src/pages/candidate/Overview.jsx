import { Briefcase, FileText, CheckCircle2, XCircle } from "lucide-react";

export default function CandidateOverview() {
  // Tạm hardcode dữ liệu thống kê
  const stats = {
    totalApplications: 12,
    underReview: 5,
    accepted: 3,
    rejected: 4,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        Tổng quan ứng viên
      </h1>
      <p className="text-slate-600">
        Xem nhanh trạng thái các đơn ứng tuyển của bạn
      </p>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Tổng số đơn</p>
              <p className="text-2xl font-bold text-slate-800">
                {stats.totalApplications}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Đang xem xét</p>
              <p className="text-2xl font-bold text-amber-600">
                {stats.underReview}
              </p>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <Briefcase className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Được chấp nhận</p>
              <p className="text-2xl font-bold text-emerald-600">
                {stats.accepted}
              </p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Bị từ chối</p>
              <p className="text-2xl font-bold text-red-600">
                {stats.rejected}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
