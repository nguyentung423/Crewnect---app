import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

export default function TestSupabase() {
  const [status, setStatus] = useState("⏳ Đang kiểm tra...");

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from("profiles").select("*").limit(1);
        if (error) {
          setStatus("❌ Lỗi: " + error.message);
        } else {
          setStatus("✅ Kết nối Supabase thành công!");
        }
      } catch (err) {
        setStatus("❌ Không thể kết nối: " + err.message);
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Test Supabase</h1>
      <p className="mt-4">{status}</p>
    </div>
  );
}
