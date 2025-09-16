import { useState } from "react";
import { Link } from "react-router-dom";

import { 
  Building2, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  MapPin,
  Globe
} from "lucide-react";


export default function SignupAgency() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyType: '',
    website: '',
    address: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const companyTypes = [
    'Công ty tổ chức sự kiện',
    'Công ty quảng cáo & Marketing',
    'Khách sạn & Resort',
    'Nhà hàng & Catering',
    'Công ty MICE',
    'Freelancer/Cá nhân',
    'Khác'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName.trim()) newErrors.companyName = 'Tên công ty là bắt buộc';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Tên người liên hệ là bắt buộc';
    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Số điện thoại là bắt buộc';
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    if (!formData.companyType) newErrors.companyType = 'Loại hình công ty là bắt buộc';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      alert('Đăng ký thành công!');
    }, 2000);
  };

  const InputField = ({ icon: Icon, error, type = "text", ...props }) => (
    <div className="space-y-1">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
            error 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-200 bg-white hover:border-gray-300 focus:bg-white'
          }`}
          {...props}
        />
      </div>
      {error && (
        <div className="flex items-center space-x-1 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );

  const PasswordField = ({ icon: Icon, error, show, onToggle, ...props }) => (
    <div className="space-y-1">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={show ? "text" : "password"}
          className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
            error 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-200 bg-white hover:border-gray-300 focus:bg-white'
          }`}
          {...props}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={onToggle}
        >
          {show ? (
            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>
      </div>
      {error && (
        <div className="flex items-center space-x-1 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/signup" className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Quay lại</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">Crewnect</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Đăng ký Nhà tuyển dụng
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Tham gia Crewnect để tìm kiếm nhân tài cho dự án sự kiện của bạn
          </p>
          <p className="text-gray-500">
            Miễn phí đăng ký và sử dụng các tính năng cơ bản
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="space-y-6">
            {/* Company Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <Building2 className="w-6 h-6 text-orange-600" />
                <span>Thông tin công ty</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  icon={Building2}
                  name="companyName"
                  placeholder="Tên công ty *"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  error={errors.companyName}
                />
                
                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="companyType"
                      value={formData.companyType}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.companyType 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <option value="">Chọn loại hình công ty *</option>
                      {companyTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  {errors.companyType && (
                    <div className="flex items-center space-x-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.companyType}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <InputField
                  icon={Globe}
                  name="website"
                  placeholder="Website công ty"
                  value={formData.website}
                  onChange={handleInputChange}
                />
                
                <InputField
                  icon={MapPin}
                  name="address"
                  placeholder="Địa chỉ công ty"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <User className="w-6 h-6 text-orange-600" />
                <span>Thông tin liên hệ</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  icon={User}
                  name="contactPerson"
                  placeholder="Tên người liên hệ *"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  error={errors.contactPerson}
                />
                
                <InputField
                  icon={Phone}
                  name="phone"
                  type="tel"
                  placeholder="Số điện thoại *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                />
              </div>

              <div className="mt-6">
                <InputField
                  icon={Mail}
                  name="email"
                  type="email"
                  placeholder="Email công ty *"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
              </div>
            </div>

            {/* Security */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <Lock className="w-6 h-6 text-orange-600" />
                <span>Bảo mật</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <PasswordField
                  icon={Lock}
                  name="password"
                  placeholder="Mật khẩu *"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  show={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                />
                
                <PasswordField
                  icon={Lock}
                  name="confirmPassword"
                  placeholder="Xác nhận mật khẩu *"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                  show={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </div>
            </div>

            {/* Terms */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-700">
                  <p className="mb-2">Bằng cách đăng ký, bạn đồng ý với:</p>
                  <div className="space-x-4">
                    <Link to="/terms" className="text-orange-600 hover:text-orange-700 font-medium">
                      Điều khoản sử dụng
                    </Link>
                    <Link to="/privacy" className="text-orange-600 hover:text-orange-700 font-medium">
                      Chính sách bảo mật
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang đăng ký...</span>
                </div>
              ) : (
                'Đăng ký ngay'
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              Đã có tài khoản?{" "}
              <Link to="/login/agency" className="text-orange-600 hover:text-orange-700 font-semibold">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Miễn phí đăng tin</h4>
            <p className="text-sm text-gray-600">Đăng tin tuyển dụng miễn phí cho 3 vị trí đầu tiên</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Quản lý ứng viên</h4>
            <p className="text-sm text-gray-600">Công cụ quản lý ứng viên chuyên nghiệp</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Hỗ trợ 24/7</h4>
            <p className="text-sm text-gray-600">Đội ngũ hỗ trợ chuyên nghiệp luôn sẵn sàng</p>
          </div>
        </div>
      </div>
    </div>
  );
}