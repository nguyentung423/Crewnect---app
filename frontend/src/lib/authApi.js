import { supabase } from "../supabaseClient";

// ================= LOGIN =================
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

// ================= SIGNUP =================
// Chỉ cần signup, trigger sẽ tự tạo record trong profiles
export async function signup({ email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

// ================= LOGOUT =================
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
