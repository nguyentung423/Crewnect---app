import { useState } from "react";
import { Link } from "react-router-dom";

import { 
  Calendar, 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Users,
  Star,
  Briefcase,
  TrendingUp,
  Award,
  Target
} from "lucide-react";

export default function LoginAgency() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login submitted:', formData);
      setIsLoading(false);
      alert('Đăng nhập thành công!');
    }, 1500);
  };

  const InputField = ({ icon: Icon, error, type = "text", ...props }) => (
    <div className="space-y-1">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
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
          className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
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
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Content */}
          <div className="space-y-8">
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Quản lý tuyển dụng hiệu quả
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Đăng nhập để tìm kiếm nhân tài hàng đầu cho dự án sự kiện của bạn
              </p>
            </div>

            {/* Features for Agencies */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tuyển dụng chất lượng</h3>
                  <p className="text-gray-600">Tiếp cận hàng ngàn ứng viên tài năng trong ngành tổ chức sự kiện</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Quản lý thông minh</h3>
                  <p className="text-gray-600">Dashboard chuyên nghiệp để theo dõi và quản lý quy trình tuyển dụng</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu uy tín</h3>
                  <p className="text-gray-600">Xây dựng thương hiệu nhà tuyển dụng chuyên nghiệp trong ngành</p>
                </div>
              </div>
            </div>

            {/* Agency Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">98%</div>
                <div className="text-sm text-gray-600">Thành công</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">72h</div>
                <div className="text-sm text-gray-600">Thời gian TB</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">5★</div>
                <div className="text-sm text-gray-600">Đánh giá</div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">VT</span>
                </div>
                <div>
                  <p className="text-gray-700 mb-3 italic">
                    "Crewnect giúp chúng tôi tìm được những ứng viên chất lượng cao cho các dự án lớn. 
                    Quy trình đơn giản và hiệu quả."
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">Việt Tuấn</p>
                    <p className="text-sm text-gray-600">CEO - VT Events</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="max-w-md mx-auto w-full">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Đăng nhập</h2>
                <p className="text-gray-600">Nhà tuyển dụng</p>
              </div>

              <div className="space-y-6">
                <InputField
                  icon={Mail}
                  name="email"
                  type="email"
                  placeholder="Email công ty"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />

                <PasswordField
                  icon={Lock}
                  name="password"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  show={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-700">Ghi nhớ đăng nhập</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
                    Quên mật khẩu?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang đăng nhập...</span>
                    </div>
                  ) : (
                    'Đăng nhập'
                  )}
                </button>

                {/* Enterprise Login */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Dành cho doanh nghiệp lớn</span>
                  </div>
                </div>

                <Link to="/enterprise-login" className="w-full">
                  <button className="w-full flex items-center justify-center px-4 py-3 border-2 border-green-200 rounded-xl hover:bg-green-50 transition-colors duration-200 text-green-700 font-medium">
                    <Building2 className="w-5 h-5 mr-2" />
                    <span>Đăng nhập Enterprise</span>
                  </button>
                </Link>
              </div>

              {/* Sign Up Link */}
              <div className="text-center mt-8 pt-8 border-t border-gray-200">
                <p className="text-gray-600">
                  Chưa có tài khoản?{" "}
                  <Link to="/signup/agency" className="text-green-600 hover:text-green-700 font-semibold">
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </div>

            {/* Switch Role */}
            <div className="text-center mt-6">
              <p className="text-gray-600 mb-2">Bạn là ứng viên?</p>
              <Link to="/login/candidate" className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium">
                <span>Đăng nhập với vai trò Ứng viên</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>

            {/* Quick Access */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Truy cập nhanh</h4>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/post-job" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600 p-2 rounded-lg hover:bg-green-50">
                  <Briefcase className="w-4 h-4" />
                  <span>Đăng tin</span>
                </Link>
                <Link to="/candidates" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600 p-2 rounded-lg hover:bg-green-50">
                  <Users className="w-4 h-4" />
                  <span>Tìm ứng viên</span>
                </Link>
                <Link to="/analytics" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600 p-2 rounded-lg hover:bg-green-50">
                  <TrendingUp className="w-4 h-4" />
                  <span>Thống kê</span>
                </Link>
                <Link to="/support" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600 p-2 rounded-lg hover:bg-green-50">
                  <CheckCircle className="w-4 h-4" />
                  <span>Hỗ trợ</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}