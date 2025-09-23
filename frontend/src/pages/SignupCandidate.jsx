import { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Users,
  Star,
  Briefcase,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";   // ✅ Thêm import Link

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

export default function SignupCandidate() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Họ và tên là bắt buộc';
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Đăng ký thành công!');
      
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        location: ''
      });
    } catch (err) {
      console.error('Signup error:', err);
      setErrors({ email: err.message || 'Đăng ký thất bại, vui lòng kiểm tra lại thông tin' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* ✅ Sửa button thành Link */}
            <Link 
              to="/signup"
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Quay lại</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tạo hồ sơ ứng viên
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Gia nhập Cviro để khám phá cơ hội nghề nghiệp trong ngành sự kiện
          </p>
          <p className="text-gray-500">
            Hoàn toàn miễn phí và chỉ mất vài phút
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <User className="w-6 h-6 text-orange-600" />
                <span>Thông tin cá nhân</span>
              </h3>
              
              <div className="space-y-4">
                <InputField
                  icon={User}
                  name="fullName"
                  placeholder="Họ và tên đầy đủ *"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  error={errors.fullName}
                />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField
                    icon={Mail}
                    name="email"
                    type="email"
                    placeholder="Email của bạn *"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
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

                <InputField
                  icon={MapPin}
                  name="location"
                  placeholder="Thành phố bạn đang sống"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Security */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <Lock className="w-6 h-6 text-orange-600" />
                <span>Mật khẩu</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
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
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang tạo tài khoản...</span>
                </div>
              ) : (
                'Tạo tài khoản'
              )}
            </button>
          </div>

          {/* Terms */}
          <div className="bg-gray-50 rounded-xl p-6 mt-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p className="mb-2">Bằng cách tạo tài khoản, bạn đồng ý với:</p>
                <div className="space-x-4">
                  <button className="text-orange-600 hover:text-orange-700 font-medium">
                    Điều khoản sử dụng
                  </button>
                  <button className="text-orange-600 hover:text-orange-700 font-medium">
                    Chính sách bảo mật
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              Đã có tài khoản?{" "}
              <Link to="/login/candidate" className="text-orange-600 hover:text-orange-700 font-semibold">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </form>

        {/* Benefits */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Việc làm chất lượng</h4>
            <p className="text-sm text-gray-600">Cơ hội từ các công ty uy tín trong ngành sự kiện</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Kết nối trực tiếp</h4>
            <p className="text-sm text-gray-600">Liên hệ trực tiếp với nhà tuyển dụng</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Hồ sơ chuyên nghiệp</h4>
            <p className="text-sm text-gray-600">Công cụ tạo CV và profile ấn tượng</p>
          </div>
        </div>
      </div>
    </div>
  );
}
