import { UserPlus, ClipboardCheck, Rocket, ArrowRight, CheckCircle, Clock, Users, Building2, Star, Zap, Search, CreditCard, Settings } from "lucide-react";
import { useState } from "react";

const staffSteps = [
  {
    id: 1,
    title: "Đăng ký tài khoản",
    shortTitle: "Đăng ký",
    description: "Tạo hồ sơ cá nhân với thông tin cơ bản và kỹ năng của bạn. Hoàn toàn miễn phí.",
    detailedDescription: "Chỉ mất 2 phút để tạo tài khoản với thông tin cơ bản, upload CV và ảnh đại diện. Xác thực qua email và số điện thoại để đảm bảo an toàn.",
    icon: <UserPlus className="h-6 w-6" />,
    color: "#ab3f20",
    gradient: "from-[#ab3f20] to-[#8b2f15]",
    bgGradient: "from-[#ab3f20]/5 to-[#ab3f20]/15",
    features: [
      "Đăng ký miễn phí 100%",
      "Upload CV & portfolio",
      "Xác thực danh tính",
      "Tạo hồ sơ kỹ năng"
    ],
    duration: "2 phút",
    completion: "99%"
  },
  {
    id: 2,
    title: "Tìm & ứng tuyển ca làm",
    shortTitle: "Ứng tuyển",
    description: "Duyệt và ứng tuyển các ca làm việc phù hợp với kỹ năng và thời gian của bạn.",
    detailedDescription: "Hệ thống AI thông minh gợi ý các ca làm phù hợp nhất với profile của bạn. Ứng tuyển nhanh chỉ với 1 click và theo dõi trạng thái real-time.",
    icon: <Search className="h-6 w-6" />,
    color: "#536b4e",
    gradient: "from-[#536b4e] to-[#3d5037]",
    bgGradient: "from-[#536b4e]/5 to-[#536b4e]/15",
    features: [
      "AI matching thông minh",
      "Ứng tuyển 1-click",
      "Theo dõi trạng thái",
      "Thông báo real-time"
    ],
    duration: "30 giây",
    completion: "95%"
  },
  {
    id: 3,
    title: "Làm việc & nhận lương",
    shortTitle: "Làm việc",
    description: "Check-in tại sự kiện, hoàn thành công việc và nhận thanh toán tự động.",
    detailedDescription: "Check-in bằng QR Code, làm việc theo hướng dẫn chi tiết, và nhận thanh toán tự động ngay sau khi hoàn thành. Được đánh giá để tăng uy tín.",
    icon: <CreditCard className="h-6 w-6" />,
    color: "#f0b33a",
    gradient: "from-[#f0b33a] to-[#d49520]",
    bgGradient: "from-[#f0b33a]/5 to-[#f0b33a]/15",
    features: [
      "Check-in QR Code",
      "Hướng dẫn chi tiết",
      "Thanh toán tự động",
      "Tăng rating cá nhân"
    ],
    duration: "Theo ca làm",
    completion: "98%"
  },
];

const agencySteps = [
  {
    id: 1,
    title: "Đăng ký doanh nghiệp",
    shortTitle: "Đăng ký",
    description: "Tạo tài khoản doanh nghiệp và xác thực thông tin pháp lý của công ty.",
    detailedDescription: "Đăng ký với thông tin doanh nghiệp, upload giấy phép kinh doanh và các giấy tờ pháp lý. Team CREWNEXT sẽ xác minh trong 24h.",
    icon: <Building2 className="h-6 w-6" />,
    color: "#ab3f20",
    gradient: "from-[#ab3f20] to-[#8b2f15]",
    bgGradient: "from-[#ab3f20]/5 to-[#ab3f20]/15",
    features: [
      "Xác minh pháp lý",
      "Tài khoản doanh nghiệp",
      "Hỗ trợ setup",
      "Dashboard quản lý"
    ],
    duration: "24 giờ",
    completion: "97%"
  },
  {
    id: 2,
    title: "Đăng ca & quản lý",
    shortTitle: "Đăng ca",
    description: "Tạo job posting, thiết lập yêu cầu và quản lý quy trình tuyển dụng.",
    detailedDescription: "Đăng tin tuyển dụng với mô tả chi tiết, thiết lập tiêu chí lọc ứng viên, và sử dụng dashboard để quản lý toàn bộ quy trình.",
    icon: <ClipboardCheck className="h-6 w-6" />,
    color: "#536b4e",
    gradient: "from-[#536b4e] to-[#3d5037]",
    bgGradient: "from-[#536b4e]/5 to-[#536b4e]/15",
    features: [
      "Tạo job posting",
      "Thiết lập tiêu chí",
      "Lọc ứng viên AI",
      "Dashboard quản lý"
    ],
    duration: "5 phút",
    completion: "94%"
  },
  {
    id: 3,
    title: "Vận hành & thanh toán",
    shortTitle: "Vận hành",
    description: "Theo dõi sự kiện real-time, quản lý team và xử lý thanh toán tự động.",
    detailedDescription: "Monitor sự kiện theo thời gian thực, quản lý check-in/check-out của nhân sự, và hệ thống tự động xử lý thanh toán cho toàn bộ team.",
    icon: <Settings className="h-6 w-6" />,
    color: "#f0b33a",
    gradient: "from-[#f0b33a] to-[#d49520]",
    bgGradient: "from-[#f0b33a]/5 to-[#f0b33a]/15",
    features: [
      "Monitor real-time",
      "Quản lý check-in/out",
      "Thanh toán tự động",
      "Báo cáo chi tiết"
    ],
    duration: "Tự động",
    completion: "96%"
  },
];

const userTypes = [
  {
    type: "staff",
    label: "Nhân sự",
    icon: <Users className="h-5 w-5" />,
    color: "#ab3f20",
    description: "Dành cho freelancer, part-time",
    subtitle: "Tìm việc & kiếm tiền"
  },
  {
    type: "agency",
    label: "Agency",
    icon: <Building2 className="h-5 w-5" />,
    color: "#536b4e", 
    description: "Dành cho công ty, đối tác",
    subtitle: "Tuyển dụng & quản lý"
  }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);
  const [viewType, setViewType] = useState("staff");
  const [isAnimating, setIsAnimating] = useState(false);

  const currentSteps = viewType === "staff" ? staffSteps : agencySteps;
  const currentUserType = userTypes.find(type => type.type === viewType);

  const handleStepClick = (stepId) => {
    if (stepId !== activeStep) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveStep(stepId);
        setIsAnimating(false);
      }, 150);
    }
  };

  const handleViewTypeChange = (newType) => {
    if (newType !== viewType) {
      setIsAnimating(true);
      setTimeout(() => {
        setViewType(newType);
        setActiveStep(1);
        setIsAnimating(false);
      }, 150);
    }
  };

  return (
    <section className="bg-gradient-to-br from-white via-[#fafbfc] to-[#f8f9fa] py-20" aria-label="Cách Crewnect hoạt động">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ab3f20] to-[#8b2f15] text-white shadow-lg">
            <Zap className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold text-[#1a1a1a] mb-3">
            Cách CREWNEXT hoạt động
          </h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed mb-8">
            Quy trình được tối ưu riêng biệt cho từng đối tượng sử dụng, đảm bảo trải nghiệm tốt nhất
          </p>

          {/* User type selector */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-xl bg-white p-1 shadow-lg border border-[#e0e0e0]">
              {userTypes.map(({ type, label, icon, color, description, subtitle }) => (
                <button
                  key={type}
                  onClick={() => handleViewTypeChange(type)}
                  className={`flex flex-col items-center gap-1 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 min-w-[140px] ${
                    viewType === type
                      ? `bg-[#ab3f20] text-white shadow-md`
                      : "text-[#666666] hover:text-[#ab3f20] hover:bg-[#ab3f20]/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {icon}
                    <span className="font-bold">{label}</span>
                  </div>
                  <span className="text-xs opacity-80">{subtitle}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Current user type description */}
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ${
            viewType === "staff" ? "bg-[#ab3f20]/10 text-[#ab3f20]" : "bg-[#536b4e]/10 text-[#536b4e]"
          }`}>
            {currentUserType?.icon}
            <span className="text-sm font-medium">{currentUserType?.description}</span>
          </div>
        </div>

        {/* Interactive Steps Flow */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            {currentSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => handleStepClick(step.id)}
                  className={`group relative flex items-center justify-center w-16 h-16 rounded-2xl border-2 transition-all duration-300 ${
                    activeStep === step.id
                      ? "border-[#ab3f20] bg-gradient-to-br from-[#ab3f20] to-[#8b2f15] text-white shadow-lg scale-110"
                      : "border-[#e0e0e0] bg-white text-[#666666] hover:border-[#ab3f20] hover:text-[#ab3f20]"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {activeStep > step.id ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <span className="text-lg font-bold">{step.id}</span>
                    )}
                  </div>
                  
                  {/* Step label */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      activeStep === step.id ? "text-[#ab3f20]" : "text-[#666666]"
                    }`}>
                      {step.shortTitle}
                    </span>
                  </div>
                </button>
                
                {index < currentSteps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-colors duration-300 ${
                    activeStep > step.id ? "bg-[#ab3f20]" : "bg-[#e0e0e0]"
                  }`}>
                    <ArrowRight className={`h-4 w-4 -mt-2 ml-6 transition-colors duration-300 ${
                      activeStep > step.id ? "text-[#ab3f20]" : "text-[#e0e0e0]"
                    }`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Step Detail */}
        <div className="mb-16">
          {currentSteps.map((step) => (
            activeStep === step.id && (
              <div
                key={`${viewType}-${step.id}`}
                className={`rounded-3xl bg-gradient-to-br ${step.bgGradient} border-2 border-[#e0e0e0] p-8 transition-all duration-500 ${
                  isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white shadow-lg`}>
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#1a1a1a]">{step.title}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-sm text-[#666666]">
                            <Clock className="h-4 w-4" />
                            {step.duration}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            {step.completion} thành công
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-[#666666] mb-6 leading-relaxed">
                      {step.detailedDescription}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {step.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-[#666666]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Visual representation */}
                  <div className="flex justify-center">
                    <div className={`relative w-64 h-64 rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-2xl`}>
                      <div className="text-center">
                        <div className="mb-4 flex justify-center">
                          <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <div className="h-12 w-12 text-white">
                              {step.icon}
                            </div>
                          </div>
                        </div>
                        <h4 className="text-xl font-bold mb-2">{step.shortTitle}</h4>
                        <p className="text-white/80 text-sm px-4">
                          {viewType === "staff" ? "Nhân sự" : "Agency"}
                        </p>
                        <div className="mt-2 text-xs text-white/60">
                          Bước {step.id}/3
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/20 rounded-full"></div>
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white/30 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* All Steps Overview Grid */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {currentSteps.map((step) => (
            <div
              key={`${viewType}-overview-${step.id}`}
              className={`group cursor-pointer rounded-3xl bg-white border-2 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                activeStep === step.id 
                  ? "border-[#ab3f20] bg-gradient-to-br from-white to-[#ab3f20]/5" 
                  : "border-[#e0e0e0] hover:border-[#ab3f20]/50"
              }`}
              onClick={() => handleStepClick(step.id)}
            >
              <div className="text-center">
                <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ${
                  activeStep === step.id
                    ? `bg-gradient-to-br ${step.gradient} text-white shadow-lg scale-110`
                    : `bg-gradient-to-br ${step.bgGradient} text-[${step.color}] group-hover:scale-105`
                }`}>
                  {step.icon}
                </div>
                
                <h3 className={`text-xl font-bold mb-3 transition-colors duration-200 ${
                  activeStep === step.id ? "text-[#ab3f20]" : "text-[#1a1a1a] group-hover:text-[#ab3f20]"
                }`}>
                  {step.title}
                </h3>
                
                <p className="text-[#666666] mb-4 text-sm leading-relaxed">
                  {step.description}
                </p>
                
                <div className="flex items-center justify-center gap-2 text-xs text-[#999999]">
                  <Clock className="h-3 w-3" />
                  <span>{step.duration}</span>
                  <span>•</span>
                  <span>{step.completion} thành công</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className={`inline-flex flex-col items-center gap-6 rounded-3xl p-8 text-white shadow-2xl max-w-2xl mx-auto transition-all duration-300 ${
            viewType === "staff" 
              ? "bg-gradient-to-r from-[#ab3f20] to-[#8b2f15]"
              : "bg-gradient-to-r from-[#536b4e] to-[#3d5037]"
          }`}>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">
                {viewType === "staff" ? "Sẵn sàng tìm việc?" : "Sẵn sàng tuyển dụng?"}
              </h3>
              <p className="text-white/90 mb-6">
                {viewType === "staff" 
                  ? "Tham gia Crewnect ngay hôm nay và khám phá hàng nghìn cơ hội việc làm hấp dẫn trong ngành sự kiện."
                  : "Đăng ký Crewnect để tiếp cận nguồn nhân lực chất lượng cao và quản lý sự kiện một cách chuyên nghiệp."
                }
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <button className={`flex-1 rounded-xl bg-white px-6 py-3 text-sm font-bold shadow-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 ${
                viewType === "staff" ? "text-[#ab3f20]" : "text-[#536b4e]"
              }`}>
                {viewType === "staff" ? <Users className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                {viewType === "staff" ? "Đăng ký nhân sự" : "Đăng ký Agency"}
              </button>
              <button className="flex-1 rounded-xl border-2 border-white/30 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2">
                <Star className="h-4 w-4" />
                Tìm hiểu thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}