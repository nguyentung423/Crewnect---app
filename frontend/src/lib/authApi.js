import { supabase } from "../supabaseClient";

// ================= CANDIDATE =================
export async function signupCandidate({ email, password, fullName, phone }) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  const user = data.user;
  if (user) {
    // Update profile sau khi Supabase đã tự insert
    const { error: pErr } = await supabase
      .from("profiles")
      .update({
        role: "candidate",
        full_name: fullName,
        phone,
      })
      .eq("id", user.id);

    if (pErr) throw pErr;
  }
  return data;
}

export async function loginCandidate({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;

  const user = data.user;
  const { data: profile, error: pErr } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (pErr) throw pErr;
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
    // Update profile sau khi Supabase đã tự insert
    const { error: pErr } = await supabase
      .from("profiles")
      .update({
        role: "agency",
        company_name: companyName,
        contact_person: contactPerson,
        phone,
        company_type: companyType,
        company_website: website,
        company_address: address,
      })
      .eq("id", user.id);

    if (pErr) throw pErr;
  }
  return data;
}

export async function loginAgency({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;

  const user = data.user;
  const { data: profile, error: pErr } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (pErr) throw pErr;
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
