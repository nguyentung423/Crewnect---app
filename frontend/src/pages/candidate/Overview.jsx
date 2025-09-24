import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Briefcase, FileText, CheckCircle2, XCircle } from "lucide-react";

export default function CandidateOverview({ candidateId }) {
  const [stats, setStats] = useState({
    totalApplications: 0,
    underReview: 0,
    accepted: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!candidateId) return;

      const { data, error } = await supabase
        .from("applications")
        .select("status")
        .eq("candidate_id", candidateId);

      if (error) {
        console.error("❌ Lỗi lấy applications:", error.message);
        return;
      }

      const total = data.length;
      const underReview = data.filter((a) => a.status === "Đang xem xét").length;
      const accepted = data.filter((a) => a.status === "Được chấp nhận").length;
      const rejected = data.filter((a) => a.status === "Bị từ chối").length;

      setStats({
        totalApplications: total,
        underReview,
        accepted,
        rejected,
      });
    };

    fetchStats();
  }, [candidateId]);

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
        <Card
          label="Tổng số đơn"
          value={stats.totalApplications}
          color="text-slate-800"
          bg="bg-blue-100"
          icon={<FileText className="w-5 h-5 text-blue-600" />}
        />
        <Card
          label="Đang xem xét"
          value={stats.underReview}
          color="text-amber-600"
          bg="bg-amber-100"
          icon={<Briefcase className="w-5 h-5 text-amber-600" />}
        />
        <Card
          label="Được chấp nhận"
          value={stats.accepted}
          color="text-emerald-600"
          bg="bg-emerald-100"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
        />
        <Card
          label="Bị từ chối"
          value={stats.rejected}
          color="text-red-600"
          bg="bg-red-100"
          icon={<XCircle className="w-5 h-5 text-red-600" />}
        />
      </div>
    </div>
  );
}

function Card({ label, value, color, bg, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`p-3 ${bg} rounded-lg`}>{icon}</div>
      </div>
    </div>
  );
}
