import { useState } from "react";
import { 
  Camera, Upload, Star, MapPin, User, Mail, Phone, 
  Edit, Plus, X, Eye, Share2, CheckCircle, Image, 
  Video, FileText, Heart 
} from "lucide-react";

export default function CandidateProfile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1494790108755-2616c0763c14?w=200&h=200&fit=crop&crop=face");
  const [portfolioImages, setPortfolioImages] = useState([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop",
      title: "Tech Expo 2024",
      category: "PG",
      likes: 23,
      views: 156
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1594736797933-d0cce2769cc7?w=400&h=600&fit=crop",
      title: "Fashion Show",
      category: "Model",
      likes: 45,
      views: 289
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
      title: "Corporate Event",
      category: "MC",
      likes: 31,
      views: 201
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=400&h=600&fit=crop",
      title: "Product Launch",
      category: "PG",
      likes: 67,
      views: 445
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=600&fit=crop",
      title: "Concert Event",
      category: "Dancer",
      likes: 89,
      views: 523
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
      title: "Brand Activation",
      category: "Model",
      likes: 34,
      views: 178
    }
  ]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageCategory, setNewImageCategory] = useState("PG");
  const [profile, setProfile] = useState({
    name: "Nguyễn Minh Anh",
    email: "minhanh@example.com",
    phone: "0987654321",
    location: "Hà Nội, Việt Nam",
    bio: "PG/Model chuyên nghiệp với 3+ năm kinh nghiệm trong ngành event. Đam mê tạo ra những trải nghiệm khó quên cho khách hàng.",
    height: "168cm",
    weight: "52kg",
    languages: ["Tiếng Việt", "English", "日本語"],
    skills: ["PG/PB", "MC", "Model", "Dance", "Acting"],
    rating: 4.9,
    completedEvents: 45,
    verified: true
  });
  const [videos] = useState([
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      title: "MC Performance Demo",
      duration: "2:45",
      views: 1240
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
      title: "Dance Routine",
      duration: "1:30",
      views: 892
    }
  ]);
  const [reviews] = useState([
    {
      id: 1,
      client: "TechViet Solutions",
      rating: 5,
      comment: "Anh làm việc rất chuyên nghiệp, tương tác tốt với khách hàng. Sẽ hợp tác lại!",
      event: "Tech Expo 2024",
      date: "2024-08-15"
    },
    {
      id: 2,
      client: "Fashion Week Vietnam",
      rating: 5,
      comment: "Model có thần thái tốt, catwalk ổn. Phù hợp với concept show.",
      event: "Fashion Week",
      date: "2024-07-20"
    }
  ]);

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePortfolioImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + Math.random(),
          url: e.target.result,
          title: newImageTitle || `Ảnh ${portfolioImages.length + 1}`,
          category: newImageCategory,
          likes: 0,
          views: 0
        };
        setPortfolioImages(prev => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
    setShowUploadModal(false);
    setNewImageTitle("");
  };

  const handleAddImage = () => {
    document.getElementById('portfolio-upload')?.click();
  };

  const removeImage = (imageId) => {
    setPortfolioImages(prev => prev.filter(img => img.id !== imageId));
  };

  const TabButton = ({ id, children, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
        activeTab === id 
          ? "bg-orange-600 text-white shadow-md" 
          : "text-gray-600 hover:bg-orange-100 hover:text-orange-600"
      } focus:outline-none focus:ring-2 focus:ring-orange-500`}
    >
      <Icon className="w-5 h-5" />
      {children}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850715649-1d0106293bd1')] opacity-10 bg-cover"></div>
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-28 h-28 bg-white bg-opacity-20 rounded-full flex items-center justify-center overflow-hidden border-4 border-white/30">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-14 h-14 text-white" />
                  )}
                </div>
                <label className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-6 h-6 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden"
                    aria-label="Tải ảnh hồ sơ"
                  />
                </label>
                {profile.verified && (
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-orange-100">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{profile.rating}</span>
                    <span>({profile.completedEvents} sự kiện)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{profile.location}</span>
                  </div>
                </div>
                <p className="text-orange-100 mt-3 max-w-lg text-sm">{profile.bio}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg font-semibold transition-colors duration-200"
              >
                <Share2 className="w-4 h-4 mr-2 inline" />
                Chia sẻ
              </button>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-white text-orange-800 hover:bg-orange-100 rounded-lg font-semibold transition-colors duration-200"
              >
                <Edit className="w-4 h-4 mr-2 inline" />
                {isEditing ? 'Xem' : 'Chỉnh sửa'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { value: profile.completedEvents, label: "Sự kiện", color: "text-orange-600" },
          { value: portfolioImages.length, label: "Ảnh Portfolio", color: "text-green-600" },
          { value: videos.length, label: "Video Demo", color: "text-blue-600" },
          { value: reviews.length, label: "Đánh giá", color: "text-purple-600" }
        ].map((stat, index) => (
          <div 
            key={index}
            className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <TabButton id="overview" icon={User}>Tổng quan</TabButton>
        <TabButton id="portfolio" icon={Image}>Portfolio</TabButton>
        <TabButton id="videos" icon={Video}>Video</TabButton>
        <TabButton id="reviews" icon={Star}>Đánh giá</TabButton>
        <TabButton id="info" icon={FileText}>Thông tin</TabButton>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Kỹ năng chuyên môn</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Thông tin cơ bản</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Chiều cao:</span>
                  <span className="font-medium">{profile.height}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cân nặng:</span>
                  <span className="font-medium">{profile.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngôn ngữ:</span>
                  <span className="font-medium">{profile.languages.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-lg">Portfolio nổi bật</h3>
                <button 
                  onClick={() => setActiveTab('portfolio')}
                  className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                >
                  Xem tất cả →
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {portfolioImages.slice(0, 6).map((image) => (
                  <div 
                    key={image.id}
                    className="relative group cursor-pointer rounded-lg overflow-hidden aspect-[3/4]"
                  >
                    <img 
                      src={image.url} 
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <p className="font-medium text-sm">{image.title}</p>
                        <p className="text-xs opacity-90">{image.category}</p>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 text-xl">Portfolio hình ảnh</h3>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Thêm ảnh mới
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {portfolioImages.map((image) => (
              <div key={image.id} className="group">
                <div className="relative cursor-pointer rounded-xl overflow-hidden aspect-[3/4] mb-3">
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="font-medium text-sm">{image.title}</p>
                      <p className="text-xs opacity-90">{image.category}</p>
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button 
                        onClick={() => removeImage(image.id)}
                        className="w-8 h-8 bg-red-500 bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-colors duration-200"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {image.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {image.views}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    {image.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'videos' && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 text-xl">Video demo</h3>
            <button 
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 transition-colors duration-200"
            >
              <Upload className="w-4 h-4" />
              Thêm video
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden aspect-video mb-3">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-50 transition-colors duration-200">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-6 border-l-gray-800 border-y-4 border-y-transparent ml-1"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <h4 className="font-medium text-gray-900">{video.title}</h4>
                <p className="text-sm text-gray-600">{video.views.toLocaleString()} lượt xem</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 text-xl mb-6">Đánh giá từ khách hàng</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.client}</h4>
                    <p className="text-sm text-gray-600">{review.event}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'info' && isEditing && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 text-xl mb-6">Chỉnh sửa thông tin</h3>
          <div className="space-y-6 max-w-2xl">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200" 
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  aria-label="Họ và tên"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200" 
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  aria-label="Email"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <input 
                  type="tel" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200" 
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  aria-label="Số điện thoại"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200" 
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  aria-label="Địa điểm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Giới thiệu bản thân</label>
              <textarea 
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200" 
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                aria-label="Giới thiệu bản thân"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chiều cao</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200" 
                  value={profile.height}
                  onChange={(e) => setProfile({...profile, height: e.target.value})}
                  aria-label="Chiều cao"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cân nặng</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200" 
                  value={profile.weight}
                  onChange={(e) => setProfile({...profile, weight: e.target.value})}
                  aria-label="Cân nặng"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                type="button"
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors duration-200"
              >
                Lưu thay đổi
              </button>
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors duration-200"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Thêm ảnh mới</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề ảnh</label>
                <input
                  type="text"
                  value={newImageTitle}
                  onChange={(e) => setNewImageTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                  placeholder="VD: Fashion Show 2024"
                  aria-label="Tiêu đề ảnh"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loại sự kiện</label>
                <select
                  value={newImageCategory}
                  onChange={(e) => setNewImageCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                  aria-label="Loại sự kiện"
                >
                  <option value="PG">PG/PB</option>
                  <option value="Model">Model</option>
                  <option value="MC">MC/Host</option>
                  <option value="Dancer">Dancer</option>
                  <option value="Actor">Actor</option>
                  <option value="Other">Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chọn ảnh</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 hover:bg-orange-50 transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePortfolioImageUpload}
                    className="hidden"
                    id="portfolio-upload"
                    aria-label="Chọn ảnh"
                  />
                  <label htmlFor="portfolio-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Click để chọn ảnh</p>
                    <p className="text-sm text-gray-400">PNG, JPG lên đến 10MB</p>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddImage}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
                >
                  Thêm ảnh
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}