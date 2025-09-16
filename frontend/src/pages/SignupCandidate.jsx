
import { useState } from "react";
import { Link } from "react-router-dom";

import { 
  Calendar, 
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
  MapPin,
  GraduationCap,
  Award,
  Upload,
  FileText
} from "lucide-react";


export default function SignupCandidate() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    experience: '',
    skills: '',
    portfolio: '',
    bio: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const experienceLevels = [
    'Mới bắt đầu (0-1 năm)',
    'Có kinh nghiệm (1-3 năm)',
    'Chuyên nghiệp (3-5 năm)', 
    'Chuyên gia (5-10 năm)',
    'Cấp cao (10+ năm)'
  ];

  const skillCategories = [
    'Event Planning & Coordination',
    'Technical Production',
    'Marketing & Communications',
    'Venue Management',
    'Catering & Hospitality',
    'Audio/Visual Production',
    'Photography & Videography',
    'Stage Design & Setup',
    'Security & Logistics',
    'Customer Service'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
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

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.experience) newErrors.experience = 'Kinh nghiệm là bắt buộc';
    if (!formData.skills.trim()) newErrors.skills = 'Kỹ năng là bắt buộc';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
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

  const TextareaField = ({ icon: Icon, error, ...props }) => (
    <div className="space-y-1">
      <div className="relative">
        <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <textarea
          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-[100px] resize-vertical ${
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
          <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tạo hồ sơ ứng viên
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Gia nhập Crewnect để khám phá cơ hội nghề nghiệp trong ngành sự kiện
          </p>
          <p className="text-gray-500">
            Hoàn toàn miễn phí và chỉ mất vài phút
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">
              Bước {currentStep} / 2
            </span>
            <span className="text-sm text-gray-500">
              {currentStep === 1 ? 'Thông tin cơ bản' : 'Kinh nghiệm & Kỹ năng'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {currentStep === 1 ? (
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
          ) : (
            <div className="space-y-6">
              {/* Experience */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                  <GraduationCap className="w-6 h-6 text-orange-600" />
                  <span>Kinh nghiệm & Kỹ năng</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Award className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                          errors.experience 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <option value="">Chọn mức độ kinh nghiệm *</option>
                        {experienceLevels.map((level) => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    {errors.experience && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.experience}</span>
                      </div>
                    )}
                  </div>

                  <TextareaField
                    icon={Star}
                    name="skills"
                    placeholder="Mô tả kỹ năng và chuyên môn của bạn trong ngành sự kiện *"
                    value={formData.skills}
                    onChange={handleInputChange}
                    error={errors.skills}
                    rows={4}
                  />

                  <InputField
                    icon={FileText}
                    name="portfolio"
                    placeholder="Link portfolio/website cá nhân (nếu có)"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                  />

                  <TextareaField
                    icon={User}
                    name="bio"
                    placeholder="Giới thiệu ngắn về bản thân và mục tiêu nghề nghiệp"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
              </div>

              {/* Skills Categories */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Lĩnh vực chuyên môn phổ biến:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {skillCategories.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                ← Quay lại
              </button>
            )}
            
            <button
              type="button"
              onClick={handleNextStep}
              disabled={isSubmitting}
              className="ml-auto bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang tạo tài khoản...</span>
                </div>
              ) : currentStep === 1 ? (
                'Tiếp theo →'
              ) : (
                'Hoàn tất đăng ký'
              )}
            </button>
          </div>

          {/* Terms */}
          {currentStep === 2 && (
            <div className="bg-gray-50 rounded-xl p-6 mt-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-700">
                  <p className="mb-2">Bằng cách hoàn tất đăng ký, bạn đồng ý với:</p>
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
          )}

          {/* Login Link */}
          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              Đã có tài khoản?{" "}
              <Link to="/login/candidate" className="text-orange-600 hover:text-orange-700 font-semibold">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>

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