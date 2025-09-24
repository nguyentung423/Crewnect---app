import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient"; // ✅ import client

export default function CompanyProfile() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    website: "",
    address: "",
    contactPerson: "",
    phone: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [agencyId, setAgencyId] = useState(null);

  // ✅ Lấy agencyId từ session Supabase
  useEffect(() => {
    const getAgency = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("❌ Lỗi lấy user:", error);
        setLoading(false);
        return;
      }
      if (data?.user) {
        setAgencyId(data.user.id);
      }
    };
    getAgency();
  }, []);

  // ✅ Fetch dữ liệu từ profiles
  useEffect(() => {
    const fetchProfile = async () => {
      if (!agencyId) return;
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select(
            "company_name, company_type, company_website, company_address, contact_person, phone, email"
          )
          .eq("id", agencyId)
          .single();

        if (error) throw error;

        setFormData({
          companyName: data.company_name || "",
          companyType: data.company_type || "",
          website: data.company_website || "",
          address: data.company_address || "",
          contactPerson: data.contact_person || "",
          phone: data.phone || "",
          email: data.email || "",
        });
      } catch (err) {
        console.error("❌ Lỗi fetch profile:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [agencyId]);

  // ✅ Handle form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Lưu về DB
  const handleSave = async () => {
    if (!agencyId) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          company_name: formData.companyName,
          company_type: formData.companyType,
          company_website: formData.website,
          company_address: formData.address,
          contact_person: formData.contactPerson,
          phone: formData.phone,
          email: formData.email,
        })
        .eq("id", agencyId);

      if (error) throw error;

      alert("✅ Cập nhật hồ sơ công ty thành công!");
      setIsEditing(false);
    } catch (err) {
      console.error("❌ Lỗi update profile:", err.message);
      alert("Cập nhật thất bại!");
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Đang tải dữ liệu...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Hồ sơ công ty</h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Company Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Tên công ty
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Loại hình công ty
            </label>
            <input
              type="text"
              name="companyType"
              value={formData.companyType}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Website & Address */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Website
            </label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Địa chỉ
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Người liên hệ
            </label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 border rounded-lg disabled:bg-gray-100"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Chỉnh sửa
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Lưu thay đổi
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
