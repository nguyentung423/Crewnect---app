import { supabase } from "./supabaseClient";

/* ================= CANDIDATE ================= */

// Đăng ký Candidate
export async function signupCandidate({ email, password, fullName, phone }) {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    const user = data.user;
    if (user) {
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
  } catch (err) {
    console.error("❌ signupCandidate error:", err);
    throw err;
  }
}

// Đăng nhập Candidate
export async function loginCandidate({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
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
  } catch (err) {
    console.error("❌ loginCandidate error:", err);
    throw err;
  }
}

/* ================= AGENCY ================= */

// Đăng ký Agency
export async function signupAgency({
  email,
  password,
  companyName,
  contactPerson,
  phone,
  companyType,
  website,
  address,
}) {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    const user = data.user;
    if (user) {
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
  } catch (err) {
    console.error("❌ signupAgency error:", err);
    throw err;
  }
}

// Đăng nhập Agency
export async function loginAgency({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
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
  } catch (err) {
    console.error("❌ loginAgency error:", err);
    throw err;
  }
}

/* ================= LOGOUT ================= */

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (err) {
    console.error("❌ logout error:", err);
    throw err;
  }
}
