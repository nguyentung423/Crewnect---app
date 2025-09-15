
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronDown, Users, Target, Heart, Lightbulb, Rocket, HandHeart, Sprout,
  Play, Pause, Volume2, VolumeX, Globe, Award, Zap, Star, ArrowRight,
  MousePointer, Sparkles, Eye, TrendingUp, Shield, Clock
} from 'lucide-react';

// Enhanced Data Configuration
const aboutData = {
  hero: {
    title: "Kết nối nhân sự sự kiện với",
    titleHighlight: "các agency hàng đầu",
    subtitle: "Powered by AI • Trusted Globally • Future-Ready",
    description: "Crewnect là nền tảng kết nối PG, PB, MC, Sup với hàng trăm agency sự kiện uy tín – nhanh chóng, minh bạch và hiệu quả.",
    videoUrl: "/videos/hero-video.mp4",
    achievements: ["ISO Certified", "AI-Powered", "Global Reach"]
  },

  realTimeStats: [
    { number: "5,247", label: "Công việc sự kiện đã đăng", icon: Target, trend: "+12%", live: true },
    { number: "342", label: "Agency tin tưởng", icon: Users, trend: "+8%", live: true },
    { number: "12,438", label: "Ứng viên tham gia", icon: Heart, trend: "+23%", live: true },
  ],

  achievements: [
    { title: "Best Platform 2024", org: "Event Awards", icon: Award },
    { title: "Innovation Leader", org: "Tech Summit", icon: Zap },
    { title: "Top Employer", org: "HR Excellence", icon: Star },
  ],

  mission: {
    title: "Sứ mệnh",
    mainTitle: "Kết nối nhân sự,",
    mainTitleHighlight: "nâng tầm sự kiện",
    description: "Chúng tôi tin rằng mỗi sự kiện đều cần đội ngũ nhân sự chất lượng. Crewnect mang đến giải pháp giúp agency tìm đúng người – đúng việc, đồng thời tạo cơ hội việc làm minh bạch cho ứng viên.",
    quote: "Sứ mệnh của chúng tôi là trở thành cầu nối giúp nhân sự sự kiện phát triển bền vững cùng ngành Event tại Việt Nam và khu vực Đông Nam Á.",
    founder: {
      name: "Tung Nguyen Hoang",
      position: "Founder & CEO",
      image: "/images/founder.jpg",
      linkedin: "https://linkedin.com/in/tungnguyenhoang",
      credentials: "MBA, Tech Entrepreneur"
    },
    metrics: [
      { label: "Tỷ lệ thành công", value: "98.5%" },
      { label: "Thời gian matching", value: "< 2 phút" },
      { label: "Độ hài lòng", value: "4.9/5" }
    ]
  },

  values: {
    title: "Giá trị cốt lõi",
    mainTitle: "Đội ngũ trẻ trung,",
    mainTitleHighlight: "nhiệt huyết & sáng tạo",
    description: "Chúng tôi là một tập thể trẻ trung, năng động và đam mê, luôn hướng đến sự đổi mới để tạo ra trải nghiệm tốt nhất cho cả ứng viên và agency.",
    items: [
      {
        title: "Tận tâm",
        description: "Luôn đặt sự uy tín và chất lượng làm ưu tiên hàng đầu với cam kết 99.9% uptime.",
        icon: HandHeart,
        color: "from-orange-500 to-red-500",
        metrics: "99.9% uptime"
      },
      {
        title: "Tư duy phát triển",
        description: "Không ngừng cải tiến với AI và Machine Learning để mang lại nhiều cơ hội hơn.",
        icon: Rocket,
        color: "from-yellow-500 to-orange-500",
        metrics: "AI-Powered"
      },
      {
        title: "Đổi mới",
        description: "Ứng dụng công nghệ Blockchain và IoT để tối ưu quá trình tuyển dụng sự kiện.",
        icon: Lightbulb,
        color: "from-green-500 to-teal-500",
        metrics: "Blockchain Ready"
      },
      {
        title: "Hợp tác",
        description: "Đồng hành cùng ứng viên và agency với hệ sinh thái toàn diện và bền vững.",
        icon: Sprout,
        color: "from-teal-500 to-blue-500",
        metrics: "Ecosystem"
      },
    ],
  },

  team: {
    title: "Đội ngũ",
    mainTitle: "Trải nghiệm chuyên nghiệp cùng",
    mainTitleHighlight: "đội ngũ Crewnect",
    description: "Crewnect được xây dựng bởi những người trẻ am hiểu ngành sự kiện và công nghệ. Chúng tôi luôn sẵn sàng đồng hành cùng bạn để nâng tầm trải nghiệm tuyển dụng.",
    members: [
      {
        name: "Nguyễn Kim Thư",
        position: "Brand Manager",
        image: "/images/team/a.jpg",
        bio: "Chuyên gia branding với 5+ năm kinh nghiệm",
        skills: ["Brand Strategy", "Digital Marketing", "UX/UI"],
        linkedin: "https://linkedin.com/in/kimthu",
        status: "online"
      },
      {
        name: "Nguyễn Hoàng Bảo Nhật",
        position: "AI Engineer",
        image: "/images/team/b.jpg",
        bio: "Kỹ sư AI đam mê công nghệ và đổi mới",
        skills: ["Machine Learning", "Deep Learning", "Python"],
        linkedin: "https://linkedin.com/in/baonhat",
        status: "online"
      },
      {
        name: "Võ Thành Nhân",
        position: "Finance Manager",
        image: "/images/team/c.jpg",
        bio: "Chuyên gia tài chính với tư duy chiến lược",
        skills: ["Financial Analysis", "Investment", "Strategy"],
        linkedin: "https://linkedin.com/in/thanhnhan",
        status: "away"
      },
    ],
  },

  testimonials: [
    {
      quote: "Crewnect đã thay đổi hoàn toàn cách chúng tôi tuyển dụng nhân sự sự kiện. Nền tảng AI thông minh và hiệu quả tuyệt vời!",
      author: "Sarah Chen",
      position: "Event Director, Galaxy Events",
      avatar: "/images/testimonial-1.jpg",
      company: "Galaxy Events",
      rating: 5
    },
    {
      quote: "Công nghệ matching của Crewnect giúp chúng tôi tìm được đúng người trong thời gian kỷ lục. Truly international standard!",
      author: "Michael Johnson",
      position: "CEO, Premium Productions",
      avatar: "/images/testimonial-2.jpg", 
      company: "Premium Productions",
      rating: 5
    }
  ]
};

// Advanced Hooks
const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowHeight(window.innerHeight);
    
    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { scrollY, windowHeight };
};

const useCountUp = (end, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!shouldStart || isAnimating) return;
    
    setIsAnimating(true);
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [shouldStart, end, duration, isAnimating]);

  return count;
};

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '50px', ...options }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return [setRef, isVisible];
};

const useCursorTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const updateCursor = (e) => setIsPointer(window.getComputedStyle(e.target).cursor === 'pointer');

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateCursor);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateCursor);
    };
  }, []);

  return { position, isPointer };
};

// Advanced Components
const CustomCursor = () => {
  const { position, isPointer } = useCursorTracker();

  return (
    <div 
      className={`fixed pointer-events-none z-50 transition-all duration-200 ${
        isPointer ? 'scale-150' : 'scale-100'
      }`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full opacity-80 blur-sm"></div>
      <div className="absolute inset-0 w-2 h-2 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

const FloatingElements = () => (
  <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-30"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`
        }}
      />
    ))}
    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
    `}</style>
  </div>
);

const VideoPlayer = ({ videoUrl, className = "" }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  return (
    <div className={`relative group ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-4 text-white">
            <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button onClick={toggleMute} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
            <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={togglePlay}
          className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
        >
          {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
        </button>
      </div>
    </div>
  );
};

const HeroSection = ({ hero }) => {
  const { scrollY } = useParallax();
  const [ref, isVisible] = useIntersectionObserver();
  const [currentAchievement, setCurrentAchievement] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAchievement(prev => (prev + 1) % hero.achievements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hero.achievements.length]);

  return (
    <>
      <FloatingElements />
      <CustomCursor />
      <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Animation */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/5 to-green-500/10"></div>
          <div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(171,63,32,0.1)_0%,transparent_50%)] transform"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          ></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          {/* Achievement Badge */}
          <div className={`inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {hero.achievements[currentAchievement]}
            </span>
          </div>

          {/* Main Title */}
          <div 
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-gray-900 leading-none tracking-tight">
              {hero.title}{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-orange-600 via-yellow-500 to-green-600 bg-clip-text text-transparent">
                  {hero.titleHighlight}
                </span>
                <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-yellow-500 to-green-600 transform scale-x-0 animate-pulse"></div>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-orange-600 font-semibold mb-8 tracking-wide">
              {hero.subtitle}
            </p>

            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">
              {hero.description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col md:flex-row gap-6 justify-center items-center transform transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <button className="group relative px-12 py-6 bg-gradient-to-r from-orange-600 to-yellow-500 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-orange-500/25">
              <span className="relative z-10 flex items-center gap-3">
                Khám phá ngay
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </button>
            
            <button className="px-8 py-6 border-2 border-gray-300 text-gray-700 font-semibold text-lg rounded-2xl hover:border-orange-500 hover:text-orange-600 transition-all duration-300 backdrop-blur-md bg-white/80">
              <Play className="w-5 h-5 inline mr-2" />
              Xem demo
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-orange-500 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const RealTimeStatsSection = ({ stats }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div ref={ref} className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-yellow-50 to-green-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Thống kê <span className="text-orange-600">Real-time</span>
          </h2>
          <p className="text-xl text-gray-600">Dữ liệu cập nhật trực tiếp từ hệ thống</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const number = parseInt(stat.number.replace(/[^0-9]/g, ''));
            const count = useCountUp(number, 2500, isVisible);
            const Icon = stat.icon;
            
            return (
              <div 
                key={index}
                className={`relative group transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Live Indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-600">LIVE</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      {stat.trend}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Number */}
                  <div className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                    {isVisible ? `${count.toLocaleString()}${stat.number.includes('+') ? '+' : ''}` : '0'}
                  </div>

                  {/* Label */}
                  <p className="text-lg font-medium text-gray-600">{stat.label}</p>

                  {/* Progress Bar */}
                  <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full transition-all duration-2000"
                      style={{ width: isVisible ? `${75 + index * 10}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const AchievementsSection = ({ achievements }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Thành tựu & <span className="bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">Chứng nhận</span>
          </h2>
          <p className="text-xl text-gray-600">Được công nhận bởi các tổ chức uy tín quốc tế</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={index}
                className={`group text-center transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-orange-600 font-medium">{achievement.org}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = ({ testimonials }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div ref={ref} className="py-24 bg-gradient-to-r from-orange-50 via-yellow-50 to-green-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Khách hàng <span className="text-orange-600">nói gì</span>
          </h2>
        </div>

        <div className="relative">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`transition-all duration-1000 ${
                index === currentTestimonial ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute inset-0'
              }`}
            >
              <div className="bg-white/80 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-white/50">
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-2xl md:text-3xl text-gray-700 leading-relaxed mb-8 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<span class="text-white font-bold text-xl">${testimonial.author.charAt(0)}</span>`;
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{testimonial.author}</h4>
                    <p className="text-orange-600 font-medium">{testimonial.position}</p>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const EnhancedMissionSection = ({ mission }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
          }`}>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold text-sm rounded-full mb-8">
              <Globe className="w-4 h-4" />
              {mission.title}
            </div>
            
            <h3 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
              {mission.mainTitle}{' '}
              <span className="bg-gradient-to-r from-orange-600 via-yellow-500 to-green-600 bg-clip-text text-transparent">
                {mission.mainTitleHighlight}
              </span>
            </h3>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">{mission.description}</p>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {mission.metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-black text-orange-600 mb-2">{metric.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
          }`}>
            <div className="relative">
              {/* Glassmorphism Quote Card */}
              <div className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl border border-white/30 shadow-2xl">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">"</span>
                </div>
                
                <p className="text-xl text-gray-700 leading-relaxed font-medium mb-10 italic">
                  {mission.quote}
                </p>
                
                {/* Enhanced Founder Card */}
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center overflow-hidden">
                      <img
                        src={mission.founder.image}
                        alt={mission.founder.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="text-white text-3xl font-bold">T</div>';
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="ml-6">
                    <h4 className="text-2xl font-bold text-gray-900">{mission.founder.name}</h4>
                    <p className="text-orange-600 font-semibold text-lg">{mission.founder.position}</p>
                    <p className="text-gray-500 text-sm">{mission.founder.credentials}</p>
                    
                    <div className="flex items-center mt-2 gap-2">
                      <a href={mission.founder.linkedin} className="text-blue-600 hover:text-blue-700 transition-colors">
                        <Globe className="w-4 h-4" />
                      </a>
                      <span className="text-green-600 text-xs font-medium">Verified Leader</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-400 to-teal-500 rounded-full opacity-30 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdvancedValuesSection = ({ values }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div ref={ref} className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
          }`}>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold text-sm rounded-full mb-8">
              <Zap className="w-4 h-4" />
              {values.title}
            </div>
            
            <h3 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
              {values.mainTitle}{' '}
              <span className="bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">
                {values.mainTitleHighlight}
              </span>
            </h3>
            
            <p className="text-xl text-gray-600 leading-relaxed">{values.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {values.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 cursor-pointer ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Progress Ring */}
                  <div className="absolute top-4 right-4">
                    <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-200" />
                      <circle 
                        cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" fill="none"
                        className={`text-orange-500 transition-all duration-1000 ${hoveredCard === index ? 'stroke-dasharray-75 stroke-dashoffset-0' : 'stroke-dasharray-0'}`}
                        style={{ strokeDasharray: '75.4', strokeDashoffset: hoveredCard === index ? '0' : '75.4' }}
                      />
                    </svg>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h4 className="font-black text-xl text-gray-900 mb-4">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed text-sm mb-4">{item.description}</p>
                    
                    {/* Tech Badge */}
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                      <Zap className="w-3 h-3" />
                      {item.metrics}
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} transform origin-left transition-transform duration-500 ${
                    hoveredCard === index ? 'scale-x-100' : 'scale-x-0'
                  }`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const PremiumTeamSection = ({ team }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm rounded-full mb-8">
            <Users className="w-4 h-4" />
            {team.title}
          </div>
          
          <h3 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
            {team.mainTitle}{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {team.mainTitleHighlight}
            </span>
          </h3>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {team.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {team.members.map((member, index) => (
            <div 
              key={index}
              className={`group relative transform transition-all duration-700 hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500">
                {/* Member Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-8xl font-bold">${member.name.charAt(0)}</div>`;
                    }}
                  />
                  
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                    <div className={`w-2 h-2 rounded-full ${member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-xs font-medium text-gray-700 capitalize">{member.status}</span>
                  </div>
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {member.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <a href={member.linkedin} className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/30 transition-colors">
                        <Globe className="w-4 h-4" />
                        Connect
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Member Info */}
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-lg font-semibold text-purple-600 mb-3">{member.position}</p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                  
                  {/* Interaction Button */}
                  <button 
                    onClick={() => setSelectedMember(selectedMember === index ? null : index)}
                    className="mt-6 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                    {selectedMember === index ? 'Hide Details' : 'View Details'}
                  </button>
                  
                  {/* Expanded Details */}
                  <div className={`mt-4 overflow-hidden transition-all duration-500 ${
                    selectedMember === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h5 className="font-semibold text-gray-900 mb-2">Core Skills:</h5>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500 to-transparent opacity-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InteractiveVideoSection = () => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div ref={ref} className="py-24 bg-gradient-to-r from-gray-900 to-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Trải nghiệm <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">tương lai</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Khám phá công nghệ AI tiên tiến đang cách mạng hóa ngành sự kiện
          </p>
        </div>
        
        <div className={`transform transition-all duration-1000 delay-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}>
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <VideoPlayer 
              videoUrl="/videos/platform-demo.mp4" 
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function AboutPage() {
  useEffect(() => {
    // Smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Preload critical images
    const criticalImages = [
      '/images/founder.jpg',
      '/images/team/a.jpg', 
      '/images/team/b.jpg',
      '/images/team/c.jpg'
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-white overflow-x-hidden">
      <HeroSection hero={aboutData.hero} />
      <RealTimeStatsSection stats={aboutData.realTimeStats} />
      <AchievementsSection achievements={aboutData.achievements} />
      <InteractiveVideoSection />
      <EnhancedMissionSection mission={aboutData.mission} />
      <AdvancedValuesSection values={aboutData.values} />
      <PremiumTeamSection team={aboutData.team} />
      <TestimonialsSection testimonials={aboutData.testimonials} />
    </div>
  );
}