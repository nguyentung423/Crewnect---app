import { supabase } from "./supabaseClient";

/* ================== JOBS ================== */

// 1. Agency đăng job mới
export async function createJob({
  title,
  description,
  location,
  salary,
  deadline,
  agency_id,
  requirements,
  urgency,
  featured,
}) {
  const { data, error } = await supabase
    .from("jobs")
    .insert([
      {
        title,
        description,
        location,
        salary,
        deadline,
        agency_id,
        requirements: requirements || [],
        urgency: urgency || "low",
        featured: featured || false,
        status: "Chờ duyệt",
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("❌ createJob error:", error);
    throw error;
  }
  return data;
}

// 2. Lấy tất cả jobs (cho Candidate xem)
export async function getAllJobs() {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ getAllJobs error:", error);
    throw error;
  }
  return data;
}

// 3. Lấy jobs của 1 Agency (dashboard Agency)
export async function getAgencyJobs(agencyId) {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("agency_id", agencyId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ getAgencyJobs error:", error);
    throw error;
  }
  return data;
}

// 4. Xoá job
export async function deleteJob(jobId) {
  const { error } = await supabase.from("jobs").delete().eq("id", jobId);

  if (error) {
    console.error("❌ deleteJob error:", error);
    throw error;
  }
  return true;
}

// 5. Đếm số lượng ứng viên cho job
export async function countApplications(jobId) {
  const { count, error } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("job_id", jobId);

  if (error) {
    console.error("❌ countApplications error:", error);
    throw error;
  }
  return count;
}

// 6. Cập nhật job
export async function updateJob(jobId, data) {
  const { data: updatedData, error } = await supabase
    .from("jobs")
    .update({
      ...data,
      requirements: data.requirements || [],
      urgency: data.urgency || "low",
      featured: data.featured || false,
    })
    .eq("id", jobId)
    .select()
    .single();

  if (error) {
    console.error("❌ updateJob error:", error);
    throw error;
  }
  return updatedData;
}

/* ================== APPLICATIONS ================== */

// 7. Ứng viên nộp đơn
export async function applyJob({ job_id, candidate_id, cover_letter }) {
  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        job_id,
        candidate_id,
        cover_letter,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("❌ applyJob error:", error);
    throw error;
  }
  return data;
}

// 8. Lấy danh sách ứng viên ứng tuyển vào 1 job (cho Agency xem)
export async function getJobApplications(jobId) {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("job_id", jobId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ getJobApplications error:", error);
    throw error;
  }
  return data;
}

// 9. Lấy danh sách đơn ứng tuyển của Candidate
export async function getCandidateApplications(candidateId) {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("candidate_id", candidateId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ getCandidateApplications error:", error);
    throw error;
  }
  return data;
}

// 10. Agency cập nhật trạng thái đơn ứng tuyển
export async function updateApplicationStatus(applicationId, status) {
  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", applicationId)
    .select()
    .single();

  if (error) {
    console.error("❌ updateApplicationStatus error:", error);
    throw error;
  }
  return data;
}

/* ================== REALTIME SUBSCRIPTION ================== */

// 11. Lắng nghe thay đổi trên bảng applications (INSERT/UPDATE/DELETE)
export function subscribeApplications(onChange) {
  const channel = supabase
    .channel("applications-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "applications" },
      (payload) => {
        console.log("🔔 Realtime update:", payload);
        if (onChange) onChange(payload);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel); // cleanup khi unmount
  };
}
