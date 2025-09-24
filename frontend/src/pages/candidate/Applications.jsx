import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { AlertCircle, Users } from "lucide-react";

export default function CandidateApplications() {
  const { candidateId } = useOutletContext(); // ✅ Nhận từ CandidateDashboard
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch applications từ supabase
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!candidateId) {
        setError("Không tìm thấy candidateId. Vui lòng đăng nhập lại.");
        return;
      }

      // lấy applications kèm job title
      const { data, error } = await supabase
        .from("applications")
        .select("id, status, created_at, jobs(title)")
        .eq("candidate_id", candidateId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setApplications(data || []);
    } catch (err) {
      console.error("❌ fetchApplications error:", err);
      setError("Không thể tải danh sách ứng tuyển.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [candidateId]);

  const statusColors = {
    pending: "text-amber-600 bg-amber-100",
    accepted: "text-emerald-600 bg-emerald-100",
    rejected: "text-red-600 bg-red-100",
  };

  // ===== UI =====
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <p className="text-slate-700">{error}</p>
        <button
          onClick={fetchApplications}
          className="mt-3 text-orange-600 hover:underline"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
        <Users className="w-10 h-10 text-slate-400 mx-auto mb-4" />
        <p className="text-slate-600">Bạn chưa ứng tuyển công việc nào.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold mb-4">Đơn ứng tuyển của tôi</h1>
      <ul className="space-y-3">
        {applications.map((app) => (
          <li
            key={app.id}
            className="bg-white rounded-xl shadow-sm border p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-slate-800">
                {app.jobs?.title || "Công việc không xác định"}
              </p>
              <p className="text-xs text-slate-500">
                Ngày nộp:{" "}
                {new Date(app.created_at).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[app.status] || "bg-slate-100 text-slate-600"
              }`}
            >
              {app.status === "pending"
                ? "Đang xem xét"
                : app.status === "accepted"
                ? "Được chấp nhận"
                : app.status === "rejected"
                ? "Bị từ chối"
                : app.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
