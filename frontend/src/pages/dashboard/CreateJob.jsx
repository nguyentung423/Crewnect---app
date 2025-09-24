import { useState } from "react";
import {
  ArrowLeft,
  Users,
  Plus,
  X,
  AlertCircle,
  CheckCircle,
  Briefcase,
  Info,
  Copy,
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

export default function CreateJobForm() {
  const session = useSession();
  const agencyId = session?.user?.id; // ✅ lấy agency_id từ user đang login

  const [formData, setFormData] = useState({
    company: "",
    location: "",
    eventType: "",
    startDate: "",
    endDate: "",
    workingHours: "",
    description: "",
    isUrgent: false,
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    positions: [
      {
        id: 1,
        title: "",
        quantity: 1,
        salary: "",
        salaryType: "per_day",
        requirements: [],
        benefits: [],
      },
    ],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const eventTypes = ["Triển lãm", "Hội nghị", "Lễ hội", "Roadshow", "Concert", "Khác"];
  const quickReqs = ["Năng động", "Giao tiếp tốt", "Ngoại hình khá"];
  const quickBenefits = ["Trả lương ngay", "Hỗ trợ ăn uống", "Hỗ trợ di chuyển"];

  // Helpers
  const handleChange = (field, value) => setFormData((p) => ({ ...p, [field]: value }));
  const handlePosChange = (id, field, value) =>
    setFormData((p) => ({
      ...p,
      positions: p.positions.map((pos) =>
        pos.id === id ? { ...pos, [field]: value } : pos
      ),
    }));

  const addPosition = () =>
    setFormData((p) => ({
      ...p,
      positions: [
        ...p.positions,
        {
          id: Date.now(),
          title: "",
          quantity: 1,
          salary: "",
          salaryType: "per_day",
          requirements: [],
          benefits: [],
        },
      ],
    }));

  const removePosition = (id) =>
    setFormData((p) => ({ ...p, positions: p.positions.filter((pos) => pos.id !== id) }));

  const duplicatePosition = (id) => {
    const pos = formData.positions.find((p) => p.id === id);
    if (pos) {
      setFormData((p) => ({
        ...p,
        positions: [...p.positions, { ...pos, id: Date.now(), title: pos.title + " (copy)" }],
      }));
    }
  };

  const addTag = (id, field, value) => {
    if (!value) return;
    setFormData((p) => ({
      ...p,
      positions: p.positions.map((pos) =>
        pos.id === id && !pos[field].includes(value)
          ? { ...pos, [field]: [...pos[field], value] }
          : pos
      ),
    }));
  };

  const removeTag = (id, field, index) =>
    setFormData((p) => ({
      ...p,
      positions: p.positions.map((pos) =>
        pos.id === id
          ? { ...pos, [field]: pos[field].filter((_, i) => i !== index) }
          : pos
      ),
    }));

  // Submit to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Validate bắt buộc
    const required = [
      "company",
      "location",
      "eventType",
      "startDate",
      "endDate",
      "workingHours",
      "description",
      "contactPerson",
      "contactPhone",
      "contactEmail",
    ];
    for (const f of required) if (!formData[f]) return setError(`Vui lòng điền ${f}`);

    if (formData.positions.some((p) => !p.title || !p.salary))
      return setError("Vui lòng điền đầy đủ thông tin cho tất cả các vị trí.");

    try {
      setLoading(true);

      // ✅ Map đúng schema bảng jobs
      const { data, error: insertErr } = await supabase.from("jobs").insert([
        {
          title: `${formData.eventType} - ${formData.company}`,
          description: formData.description,
          location: formData.location,
          salary: parseFloat(formData.positions[0].salary) || 0,
          deadline: formData.endDate, // deadline = ngày kết thúc
          agency_id: agencyId,
          event_type: formData.eventType,
          working_hours: formData.workingHours,
          is_urgent: formData.isUrgent,
          contact_person: formData.contactPerson,
          contact_phone: formData.contactPhone,
          contact_email: formData.contactEmail,
          positions: formData.positions, // JSONB
        },
      ]);

      if (insertErr) throw insertErr;

      alert("✅ Đăng job thành công!");
      console.log("Job created:", data);
    } catch (err) {
      console.error("❌ Insert error:", err);
      setError("Không thể đăng job. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6 flex items-center gap-3">
        <ArrowLeft className="w-5 h-5 text-slate-600" />
        <h1 className="text-2xl font-bold text-slate-800">Đăng job mới</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company + Event */}
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-green-700" /> Thông tin chung
          </h2>
          <input
            placeholder="Tên công ty *"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
          <select
            value={formData.eventType}
            onChange={(e) => handleChange("eventType", e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Loại sự kiện *</option>
            {eventTypes.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
          <input
            placeholder="Địa điểm *"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Dates */}
        <div className="bg-white p-6 rounded-xl shadow-sm grid md:grid-cols-3 gap-4">
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
            className="p-3 border rounded-lg"
          />
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
            className="p-3 border rounded-lg"
          />
          <input
            placeholder="Giờ làm việc *"
            value={formData.workingHours}
            onChange={(e) => handleChange("workingHours", e.target.value)}
            className="p-3 border rounded-lg"
          />
        </div>

        {/* Description */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <textarea
            rows={4}
            placeholder="Mô tả sự kiện *"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Positions */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-green-700" /> Vị trí ({formData.positions.length})
            </h2>
            <button
              type="button"
              onClick={addPosition}
              className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Thêm
            </button>
          </div>

          {formData.positions.map((pos, i) => (
            <div key={pos.id} className="bg-white p-4 rounded-xl shadow-sm space-y-3">
              <div className="flex justify-between">
                <h3 className="font-semibold">Vị trí #{i + 1}</h3>
                <div className="flex gap-2">
                  <button type="button" onClick={() => duplicatePosition(pos.id)}>
                    <Copy className="w-4 h-4 text-blue-600" />
                  </button>
                  {formData.positions.length > 1 && (
                    <button type="button" onClick={() => removePosition(pos.id)}>
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  )}
                </div>
              </div>

              <input
                placeholder="Tên vị trí *"
                value={pos.title}
                onChange={(e) => handlePosChange(pos.id, "title", e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="number"
                min="1"
                value={pos.quantity}
                onChange={(e) => handlePosChange(pos.id, "quantity", parseInt(e.target.value))}
                className="w-full p-2 border rounded-lg"
              />
              <input
                placeholder="Mức lương *"
                value={pos.salary}
                onChange={(e) => handlePosChange(pos.id, "salary", e.target.value)}
                className="w-full p-2 border rounded-lg"
              />

              {/* Quick add requirements */}
              <div className="flex gap-2 flex-wrap">
                {quickReqs.map((req, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => addTag(pos.id, "requirements", req)}
                    className="px-2 py-1 bg-slate-100 rounded"
                  >
                    {req}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {pos.requirements.map((r, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-green-100 rounded flex items-center gap-1"
                  >
                    {r}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeTag(pos.id, "requirements", idx)}
                    />
                  </span>
                ))}
              </div>

              {/* Quick add benefits */}
              <div className="flex gap-2 flex-wrap">
                {quickBenefits.map((b, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => addTag(pos.id, "benefits", b)}
                    className="px-2 py-1 bg-slate-100 rounded"
                  >
                    {b}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {pos.benefits.map((b, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-orange-100 rounded flex items-center gap-1"
                  >
                    {b}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeTag(pos.id, "benefits", idx)}
                    />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="bg-white p-6 rounded-xl shadow-sm grid md:grid-cols-3 gap-4">
          <input
            placeholder="Người liên hệ *"
            value={formData.contactPerson}
            onChange={(e) => handleChange("contactPerson", e.target.value)}
            className="p-3 border rounded-lg"
          />
          <input
            placeholder="Số điện thoại *"
            value={formData.contactPhone}
            onChange={(e) => handleChange("contactPhone", e.target.value)}
            className="p-3 border rounded-lg"
          />
          <input
            placeholder="Email *"
            value={formData.contactEmail}
            onChange={(e) => handleChange("contactEmail", e.target.value)}
            className="p-3 border rounded-lg"
          />
        </div>

        {/* Urgent */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isUrgent}
            onChange={(e) => handleChange("isUrgent", e.target.checked)}
          />
          <span>Đây là job khẩn cấp</span>
          {formData.isUrgent && <AlertCircle className="w-4 h-4 text-red-600" />}
        </div>

        {/* Error */}
        {error && <div className="bg-red-50 p-4 rounded-lg text-red-700">{error}</div>}

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-green-700 text-white rounded-lg flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" /> {loading ? "Đang đăng..." : "Đăng job ngay"}
          </button>
        </div>
      </form>
    </div>
  );
}
