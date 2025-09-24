import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { AlertCircle, Users } from "lucide-react";
import {
  getAgencyJobs,
  getJobApplications,
  updateApplicationStatus,
  subscribeApplications,
} from "../../lib/jobsApi";

export default function Applications() {
  // ✅ Lấy agencyId từ AgencyDashboard
  const { agencyId } = useOutletContext();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm fetch toàn bộ applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!agencyId) {
        setLoading(false);
        return;
      }

      const jobs = await getAgencyJobs(agencyId);
      let allApplications = [];

      for (const job of jobs) {
        // ✅ join sang bảng profiles để lấy tên ứng viên
        const jobApplications = await getJobApplications(job.id);
        const mapped = jobApplications.map((app) => ({
          ...app,
          jobTitle: job.title,
        }));
        allApplications = [...allApplications, ...mapped];
      }

      setApplications(allApplications);
    } catch (err) {
      console.error("❌ fetchApplications error:", err);
      setError("Không thể tải danh sách ứng viên.");
    } finally {
      setLoading(false);
    }
  };

  // Update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateApplicationStatus(id, newStatus);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error("❌ updateApplicationStatus error:", err);
      setError("Không thể cập nhật trạng thái.");
    }
  };

  useEffect(() => {
    if (!agencyId) return;

    // Fetch lần đầu
    fetchApplications();

    // Subscribe realtime
    const unsubscribe = subscribeApplications(() => {
      console.log("🔔 Applications thay đổi → refetch");
      fetchApplications();
    });

    return () => {
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [agencyId]);

  // ========== UI ==========
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
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
          className="mt-3 text-green-700 hover:underline"
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
        <p className="text-slate-600">Chưa có ứng viên nào</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold mb-4">Quản lý ứng viên</h1>
      <ul className="space-y-3">
        {applications.map((app) => (
          <li
            key={app.id}
            className="bg-white rounded-xl shadow-sm border p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {app.profiles?.full_name || "Ứng viên ẩn danh"}
              </p>
              <p className="text-sm text-slate-600">
                Job: {app.jobTitle || "N/A"}
              </p>
              <p className="text-xs text-slate-500">
                {new Date(app.created_at).toLocaleDateString("vi-VN")}
              </p>
              <p className="text-xs text-slate-500 italic">
                {app.status}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleStatusChange(app.id, "accepted")}
                className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg"
              >
                Chấp nhận
              </button>
              <button
                onClick={() => handleStatusChange(app.id, "rejected")}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg"
              >
                Từ chối
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
