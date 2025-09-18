import { supabase } from "../supabaseClient";

/* ================== JOBS ================== */

// 1. Agency đăng job mới
export async function createJob({ title, description, location, salary, deadline, agency_id, requirements, urgency, featured }) {
  const { data, error } = await supabase
    .from("jobs")
    .insert([{ 
      title, 
      description, 
      location, 
      salary, 
      deadline, 
      agency_id,
      requirements: requirements || [], // Ensure requirements is an array
      urgency: urgency || 'low', // Default to 'low' if not provided
      featured: featured || false, // Default to false if not provided
      status: 'Chờ duyệt' // Default status
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 2. Lấy tất cả jobs (cho Candidate xem)
export async function getAllJobs() {
  const { data, error } = await supabase
    .from("jobs")
    .select(`
      id, 
      title, 
      description, 
      location, 
      salary, 
      deadline, 
      created_at, 
      status, 
      requirements, 
      urgency, 
      featured,
      profiles:agency_id (company_name, company_type, company_website)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// 3. Lấy jobs của Agency (dashboard Agency)
export async function getAgencyJobs(agencyId) {
  const { data, error } = await supabase
    .from("jobs")
    .select(`
      id, 
      title, 
      description, 
      location, 
      salary, 
      deadline, 
      created_at, 
      status, 
      requirements, 
      urgency, 
      featured,
      profiles:agency_id (company_name),
      applications(count)
    `)
    .eq("agency_id", agencyId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// 4. Xoá job
export async function deleteJob(jobId) {
  const { error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", jobId);

  if (error) throw error;
  return true;
}

// 5. Đếm số lượng ứng viên cho job
export async function countApplications(jobId) {
  const { count, error } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("job_id", jobId);

  if (error) throw error;
  return count;
}

// 6. Cập nhật job
export async function updateJob(jobId, data) {
  const { data: updatedData, error } = await supabase
    .from("jobs")
    .update({
      ...data,
      requirements: data.requirements || [], // Ensure requirements is an array
      urgency: data.urgency || 'low', // Default to 'low' if not provided
      featured: data.featured || false // Default to false if not provided
    })
    .eq("id", jobId)
    .select()
    .single();

  if (error) throw error;
  return updatedData;
}

/* ================== APPLICATIONS ================== */

// 7. Ứng viên nộp đơn
export async function applyJob({ job_id, candidate_id, cover_letter }) {
  const { data, error } = await supabase
    .from("applications")
    .insert([{ job_id, candidate_id, cover_letter, status: "pending" }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 8. Lấy danh sách ứng viên ứng tuyển vào 1 job (cho Agency xem)
export async function getJobApplications(jobId) {
  const { data, error } = await supabase
    .from("applications")
    .select(`
      id, 
      status, 
      created_at, 
      cover_letter,
      profiles:candidate_id (id, full_name, phone, skills, portfolio)
    `)
    .eq("job_id", jobId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// 9. Lấy danh sách đơn ứng tuyển của Candidate (dashboard Candidate)
export async function getCandidateApplications(candidateId) {
  const { data, error } = await supabase
    .from("applications")
    .select(`
      id, 
      status, 
      created_at,
      jobs(id, title, location, salary, deadline, profiles:agency_id(company_name))
    `)
    .eq("candidate_id", candidateId)
    .order("created_at", { ascending: false });

  if (error) throw error;
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

  if (error) throw error;
  return data;
}