import { useState } from "react";

export default function Settings() {
  const [formData, setFormData] = useState({
    companyName: "Công ty Sự kiện ABC",
    contactPerson: "Nguyễn Văn A",
    email: "agency@example.com",
    phone: "0987654321",
    address: "Hà Nội, Việt Nam",
    website: "https://abc-event.vn",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      alert("Lưu thông tin thành công!");
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Cài đặt tài khoản</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        {/* Company Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Tên công ty</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Contact Person */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Người liên hệ</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </div>
  );
}
