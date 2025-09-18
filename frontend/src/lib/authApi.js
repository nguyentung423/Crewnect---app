import { supabase } from "../supabaseClient";

// ================= CANDIDATE =================
export async function signupCandidate({ email, password, fullName, phone }) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  const user = data.user;
  if (user) {
    const { error: pErr } = await supabase.from("profiles").insert({
      id: user.id,
      role: "candidate",
      full_name: fullName,
      phone,
    });
    if (pErr) throw pErr;
  }
  return data;
}

export async function loginCandidate({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;

  const user = data.user;
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "candidate") {
    throw new Error("Tài khoản này không phải Candidate");
  }
  return { user, profile };
}

// ================= AGENCY =================
export async function signupAgency({ email, password, companyName, contactPerson, phone, companyType, website, address }) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  const user = data.user;
  if (user) {
    const { error: pErr } = await supabase.from("profiles").insert({
      id: user.id,
      role: "agency",
      company_name: companyName,
      contact_person: contactPerson,
      phone,
      company_type: companyType,
      website,
      address
    });
    if (pErr) throw pErr;
  }
  return data;
}

export async function loginAgency({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;

  const user = data.user;
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "agency") {
    throw new Error("Tài khoản này không phải Agency");
  }
  return { user, profile };
}

// ================= LOGOUT =================
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}