import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { MapPin, DollarSign, Calendar, Briefcase, Loader2, CheckCircle } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";

export default function CandidateJobs() {
  const session = useSession();
  const candidateId = session?.user?.id; // lấy user id từ session
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(null);

  // Fetch jobs từ Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setJobs(data || []);
      } catch (err) {
        console.error("❌ Lỗi fetch jobs:", err);
        setError("Không thể tải danh sách việc làm.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Hàm ứng tuyển job
  const handleApply = async (jobId) => {
    if (!candidateId) {
      alert("Bạn cần đăng nhập trước khi ứng tuyển.");
      return;
    }

    try {
      setApplying(jobId);
      const { error } = await supabase.from("applications").insert([
        {
          candidate_id: candidateId,
          job_id: jobId,
          status: "Đang xem xét",
        },
      ]);
      if (error) throw error;
      alert("Ứng tuyển thành công! 🎉");
    } catch (err) {
      console.error("❌ Lỗi apply job:", err);
      alert("Không thể ứng tuyển. Vui lòng thử lại.");
    } finally {
      setApplying(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Việc làm sự kiện</h1>
      {jobs.length === 0 ? (
        <p className="text-slate-600">Hiện chưa có job nào được đăng.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-orange-600" /> {job.title}
              </h2>
              <p className="text-slate-600 mt-1">{job.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" /> {job.salary}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {job.deadline}
                </div>
              </div>

              {/* Nút ứng tuyển */}
              <button
                onClick={() => handleApply(job.id)}
                disabled={applying === job.id}
                className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 disabled:opacity-50"
              >
                {applying === job.id ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Đang ứng tuyển...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" /> Ứng tuyển
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
