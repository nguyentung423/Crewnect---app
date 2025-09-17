import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Plus,
  X,
  AlertCircle,
  CheckCircle,
  Briefcase,
  Info,
  Copy,
  Edit3
} from "lucide-react";

export default function CreateJobForm() {
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
        benefits: []
      }
    ]
  });

  const [currentRequirement, setCurrentRequirement] = useState({});
  const [currentBenefit, setCurrentBenefit] = useState({});
  const [error, setError] = useState("");

  const eventTypes = [
    "Triển lãm - Exhibition",
    "Hội nghị - Conference", 
    "Lễ hội - Festival",
    "Roadshow - Sampling",
    "Grand Opening",
    "Thể thao - Sport Event",
    "Âm nhạc - Concert",
    "Thời trang - Fashion Show",
    "Ra mắt sản phẩm",
    "Khác"
  ];

  const commonPositions = [
    "PG (Promotion Girl)",
    "PB (Promotion Boy)", 
    "Mascot",
    "MC",
    "Staff hỗ trợ",
    "Nhân viên bán hàng",
    "Người mẫu",
    "Nhân viên setup",
    "Bảo vệ",
    "Phục vụ"
  ];

  const commonRequirements = [
    "Năng động, nhiệt tình",
    "Giao tiếp tốt",
    "Ngoại hình khá", 
    "Thời gian linh hoạt",
    "Không ngại đông người",
    "Biết sử dụng smartphone",
    "Từ 18-30 tuổi",
    "Sinh viên ưu tiên",
    "Có thể đi lại trong thành phố",
    "Không cần kinh nghiệm"
  ];

  const commonBenefits = [
    "Lương trả ngay sau event",
    "Có cơm trưa miễn phí",
    "Hỗ trợ di chuyển",
    "Môi trường trẻ trung",
    "Được đào tạo trước khi làm",
    "Cơ hội học hỏi kinh nghiệm", 
    "Thời gian làm việc linh hoạt",
    "Được làm việc nhóm",
    "Trang phục được cung cấp",
    "Bonus thêm nếu làm tốt"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePositionChange = (positionId, field, value) => {
    if (field === "quantity") {
      const numValue = parseInt(value);
      value = isNaN(numValue) ? 1 : Math.max(1, Math.min(100, numValue));
    }
    
    setFormData(prev => ({
      ...prev,
      positions: prev.positions.map(pos => 
        pos.id === positionId ? { ...pos, [field]: value } : pos
      )
    }));
  };

  const addPosition = () => {
    const newPosition = {
      id: Date.now(),
      title: "",
      quantity: 1,
      salary: "",
      salaryType: "per_day",
      requirements: [],
      benefits: []
    };
    setFormData(prev => ({
      ...prev,
      positions: [...prev.positions, newPosition]
    }));
  };

  const removePosition = (positionId) => {
    if (formData.positions.length > 1) {
      setFormData(prev => ({
        ...prev,
        positions: prev.positions.filter(pos => pos.id !== positionId)
      }));
    }
  };

  const duplicatePosition = (positionId) => {
    const positionToCopy = formData.positions.find(pos => pos.id === positionId);
    if (positionToCopy) {
      const newPosition = {
        ...positionToCopy,
        id: Date.now(),
        title: positionToCopy.title + " (Copy)"
      };
      setFormData(prev => ({
        ...prev,
        positions: [...prev.positions, newPosition]
      }));
    }
  };

  const addRequirement = (positionId, requirement) => {
    if (!requirement) return;
    
    setFormData(prev => ({
      ...prev,
      positions: prev.positions.map(pos => 
        pos.id === positionId && !pos.requirements.includes(requirement)
          ? { ...pos, requirements: [...pos.requirements, requirement] }
          : pos
      )
    }));
    setCurrentRequirement(prev => ({ ...prev, [positionId]: "" }));
  };

  const removeRequirement = (positionId, index) => {
    setFormData(prev => ({
      ...prev,
      positions: prev.positions.map(pos => 
        pos.id === positionId
          ? { ...pos, requirements: pos.requirements.filter((_, i) => i !== index) }
          : pos
      )
    }));
  };

  const addBenefit = (positionId, benefit) => {
    if (!benefit) return;
    
    setFormData(prev => ({
      ...prev,
      positions: prev.positions.map(pos => 
        pos.id === positionId && !pos.benefits.includes(benefit)
          ? { ...pos, benefits: [...pos.benefits, benefit] }
          : pos
      )
    }));
    setCurrentBenefit(prev => ({ ...prev, [positionId]: "" }));
  };

  const removeBenefit = (positionId, index) => {
    setFormData(prev => ({
      ...prev,
      positions: prev.positions.map(pos => 
        pos.id === positionId
          ? { ...pos, benefits: pos.benefits.filter((_, i) => i !== index) }
          : pos
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const requiredGeneralFields = [
      "company", "location", "eventType", "startDate", 
      "endDate", "workingHours", "description", 
      "contactPerson", "contactPhone", "contactEmail"
    ];
    
    for (const field of requiredGeneralFields) {
      if (!formData[field]) {
        setError(`Vui lòng điền ${field} trước khi đăng.`);
        return;
      }
    }

    // Validate positions
    for (const position of formData.positions) {
      if (!position.title || !position.salary) {
        setError("Vui lòng điền đầy đủ thông tin cho tất cả các vị trí.");
        return;
      }
    }
    
    setError("");
    console.log("Form submitted:", formData);
    // Handle form submission (e.g., send to API)
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Đăng job mới</h1>
            <p className="text-slate-600">Tạo cơ hội việc làm part-time cho bạn trẻ</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <Info className="w-5 h-5 text-blue-600" />
          <p className="text-sm text-blue-800">
            <strong>Lưu ý:</strong> Jobs part-time thường thu hút sinh viên và người trẻ không có nhiều kinh nghiệm. 
            Hãy tập trung vào thái độ và sự nhiệt tình thay vì yêu cầu kỹ năng phức tạp.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-green-700" />
            Thông tin chung
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                Tên công ty *
              </label>
              <input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Tên công ty hoặc nhãn hàng"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="eventType" className="block text-sm font-medium text-slate-700 mb-2">
                Loại sự kiện *
              </label>
              <select
                id="eventType"
                value={formData.eventType}
                onChange={(e) => handleInputChange("eventType", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                required
              >
                <option value="">Chọn loại sự kiện</option>
                {eventTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">
                Địa điểm *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="VD: TTTM Vincom Bà Triệu, Công viên Thống Nhất..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Time & Schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-700" />
            Thời gian làm việc
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-2">
                Ngày bắt đầu *
              </label>
              <input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-2">
                Ngày kết thúc *
              </label>
              <input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="workingHours" className="block text-sm font-medium text-slate-700 mb-2">
                Giờ làm việc *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="workingHours"
                  type="text"
                  value={formData.workingHours}
                  onChange={(e) => handleInputChange("workingHours", e.target.value)}
                  placeholder="VD: 8h-17h, 9h-18h"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Mô tả sự kiện
          </h2>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
              Mô tả chung về sự kiện *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Mô tả chi tiết về sự kiện, quy mô, không khí làm việc..."
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 resize-none"
              required
            />
          </div>
        </div>

        {/* Multiple Positions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-green-700" />
              Các vị trí tuyển dụng ({formData.positions.length})
            </h2>
            <button
              type="button"
              onClick={addPosition}
              className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Thêm vị trí
            </button>
          </div>

          {formData.positions.map((position, index) => (
            <div key={position.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  Vị trí #{index + 1}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => duplicatePosition(position.id)}
                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Sao chép vị trí"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {formData.positions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePosition(position.id)}
                      className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa vị trí"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Position Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tên vị trí *
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={position.title}
                      onChange={(e) => handlePositionChange(position.id, "title", e.target.value)}
                      placeholder="Nhập tên vị trí..."
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                      required
                    />
                    <div className="flex flex-wrap gap-2">
                      {commonPositions.map((pos, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handlePositionChange(position.id, "title", pos)}
                          className="px-2 py-1 bg-slate-100 hover:bg-green-100 text-slate-700 hover:text-green-800 rounded text-xs transition-colors"
                        >
                          {pos}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Số lượng *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={position.quantity}
                      onChange={(e) => handlePositionChange(position.id, "quantity", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Đơn vị tính lương *
                  </label>
                  <select
                    value={position.salaryType}
                    onChange={(e) => handlePositionChange(position.id, "salaryType", e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                    required
                  >
                    <option value="per_day">/ ngày</option>
                    <option value="per_hour">/ giờ</option>
                    <option value="per_event">/ sự kiện</option>
                    <option value="fixed">Cố định</option>
                  </select>
                </div>
              </div>

              {/* Salary */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mức lương *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={position.salary}
                    onChange={(e) => handlePositionChange(position.id, "salary", e.target.value)}
                    placeholder="VD: 300k-400k, 250k, 500k"
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              {/* Requirements for this position */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">
                  Yêu cầu cho vị trí này
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Thêm yêu cầu nhanh:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {commonRequirements.map((req, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => addRequirement(position.id, req)}
                          className="px-3 py-1 bg-slate-100 hover:bg-green-100 text-slate-700 hover:text-green-800 rounded-lg text-sm transition-colors"
                        >
                          + {req}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={currentRequirement[position.id] || ""}
                        onChange={(e) => setCurrentRequirement(prev => ({
                          ...prev,
                          [position.id]: e.target.value
                        }))}
                        placeholder="Nhập yêu cầu tùy chỉnh..."
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                      />
                      <button
                        type="button"
                        onClick={() => addRequirement(position.id, currentRequirement[position.id])}
                        className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {position.requirements.length > 0 && (
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {position.requirements.map((req, idx) => (
                          <span
                            key={idx}
                            className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm"
                          >
                            {req}
                            <button
                              type="button"
                              onClick={() => removeRequirement(position.id, idx)}
                              className="text-green-600 hover:text-green-800"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Benefits for this position */}
              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-3">
                  Quyền lợi cho vị trí này
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Thêm quyền lợi nhanh:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {commonBenefits.map((benefit, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => addBenefit(position.id, benefit)}
                          className="px-3 py-1 bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-800 rounded-lg text-sm transition-colors"
                        >
                          + {benefit}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={currentBenefit[position.id] || ""}
                        onChange={(e) => setCurrentBenefit(prev => ({
                          ...prev,
                          [position.id]: e.target.value
                        }))}
                        placeholder="Nhập quyền lợi tùy chỉnh..."
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                      />
                      <button
                        type="button"
                        onClick={() => addBenefit(position.id, currentBenefit[position.id])}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {position.benefits.length > 0 && (
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {position.benefits.map((benefit, idx) => (
                          <span
                            key={idx}
                            className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-lg text-sm"
                          >
                            {benefit}
                            <button
                              type="button"
                              onClick={() => removeBenefit(position.id, idx)}
                              className="text-orange-600 hover:text-orange-800"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Thông tin liên hệ
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="contactPerson" className="block text-sm font-medium text-slate-700 mb-2">
                Người liên hệ *
              </label>
              <input
                id="contactPerson"
                type="text"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                placeholder="Tên người phụ trách tuyển dụng"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-slate-700 mb-2">
                Số điện thoại *
              </label>
              <input
                id="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                placeholder="0901234567"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-slate-700 mb-2">
                Email liên hệ *
              </label>
              <input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                placeholder="contact@company.com"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Urgent Job Option */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="urgent"
                checked={formData.isUrgent}
                onChange={(e) => handleInputChange("isUrgent", e.target.checked)}
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="urgent" className="ml-2 text-sm font-medium text-slate-700">
                Đây là job khẩn cấp (sẽ được ưu tiên hiển thị)
              </label>
            </div>
            {formData.isUrgent && (
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Job sẽ được đánh dấu ưu tiên cao</span>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            {error}
          </div>
        )}

        {/* Job Summary */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-green-700" />
            Tổng quan job
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/60 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-700">
                {formData.positions.length}
              </div>
              <div className="text-sm text-slate-600">Vị trí</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-700">
                {formData.positions.reduce((sum, pos) => sum + pos.quantity, 0)}
              </div>
              <div className="text-sm text-slate-600">Tổng người cần</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <div className="text-2xl font-bold text-orange-700">
                {formData.startDate && formData.endDate ? 
                  Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) + 1 
                  : 0}
              </div>
              <div className="text-sm text-slate-600">Ngày làm việc</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-700">
                {formData.positions.filter(pos => pos.requirements.length > 0 || pos.benefits.length > 0).length}
              </div>
              <div className="text-sm text-slate-600">Vị trí có yêu cầu</div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Lưu nháp
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition-colors"
            >
              Xem trước
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-green-800 to-green-700 hover:from-green-900 hover:to-green-800 text-white rounded-xl shadow-lg shadow-green-800/25 transition-all duration-200 flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Đăng job ngay
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}