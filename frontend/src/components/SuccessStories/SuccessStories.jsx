import React, { useState } from 'react';
import { Quote, Star, Users, Briefcase, Award } from "lucide-react";

const pgStories = [
  {
    id: 1,
    name: "Ngọc Anh",
    role: "PG tại Tech Expo",
    feedback: "Cviro giúp mình tìm ca làm chỉ trong vài phút. Thanh toán nhanh chóng và cực kỳ minh bạch.",
    image: "https://via.placeholder.com/80x80/ab3f20/FFFFFF?text=NA",
    rating: 5,
    location: "TP.HCM",
    jobCount: "12+ ca"
  },
  {
    id: 2,
    name: "Thu Hà", 
    role: "Mascot tại Food Fest",
    feedback: "Ứng tuyển siêu nhanh, chỉ vài cú click là có việc. Giao diện gọn gàng, dễ dùng kể cả trên điện thoại.",
    image: "https://via.placeholder.com/80x80/f0b33a/FFFFFF?text=TH",
    rating: 5,
    location: "Hà Nội",
    jobCount: "8+ ca"
  },
  {
    id: 3,
    name: "Minh Khôi",
    role: "MC tại Auto Show",
    feedback: "Platform rất chuyên nghiệp, thông tin rõ ràng. Team support nhiệt tình, giải đáp nhanh chóng.",
    image: "https://via.placeholder.com/80x80/536b4e/FFFFFF?text=MK",
    rating: 5,
    location: "Đà Nẵng",
    jobCount: "15+ ca"
  }
];

const clientStories = [
  {
    id: 1,
    name: "Hoàng Long",
    role: "Supervisor - Event Corp",
    feedback: "Trước đây phải tuyển qua group rất mất thời gian. Nhờ CREWNEXT, mình quản lý nhân sự dễ dàng và tiết kiệm chi phí.",
    image: "https://via.placeholder.com/80x80/ab3f20/FFFFFF?text=HL",
    rating: 5,
    company: "Event Corp",
    projectSize: "50+ nhân sự"
  },
  {
    id: 2,
    name: "Mai Linh",
    role: "Event Manager - Brand X",
    feedback: "Chất lượng nhân sự rất tốt, đúng yêu cầu. Hệ thống quản lý giúp theo dõi hiệu quả công việc real-time.",
    image: "https://via.placeholder.com/80x80/f0b33a/FFFFFF?text=ML",
    rating: 5,
    company: "Brand X",
    projectSize: "30+ nhân sự"
  },
  {
    id: 3,
    name: "Đức Thành",
    role: "Marketing Director - Expo Agency",
    feedback: "Cviro đã thay đổi cách chúng tôi tuyển dụng. Tiết kiệm 70% thời gian và chi phí so với trước đây.",
    image: "https://via.placeholder.com/80x80/536b4e/FFFFFF?text=DT",
    rating: 5,
    company: "Expo Agency",
    projectSize: "100+ nhân sự"
  }
];

const TabButton = ({ active, onClick, children, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      active 
        ? 'bg-[#ab3f20] text-white' 
        : 'bg-white text-gray-700 hover:bg-[#536b4e] hover:text-white'
    }`}
  >
    <Icon className="w-4 h-4" />
    {children}
  </button>
);

const StoryCard = ({ story, type }) => (
  <div className="group bg-white rounded-xl border border-[#E0E0E0] p-6 hover:shadow-lg hover:border-[#ab3f20] transition-all duration-300">
    {/* Quote icon */}
    <div className="mb-4">
      <Quote className="w-6 h-6 text-[#ab3f20] opacity-60" />
    </div>
    
    {/* Feedback */}
    <p className="text-gray-700 mb-6 leading-relaxed">
      "{story.feedback}"
    </p>
    
    {/* Rating */}
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#f0b33a] text-[#f0b33a]" />
      ))}
    </div>
    
    {/* User info */}
    <div className="flex items-center gap-4">
      <img
        src={story.image}
        alt={story.name}
        className="w-12 h-12 rounded-full border-2 border-[#F5F5F5] object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{story.name}</h3>
        <p className="text-sm text-[#ab3f20] font-medium">{story.role}</p>
        <div className="flex items-center gap-3 mt-1">
          {type === 'pg' ? (
            <>
              <span className="text-xs text-gray-500">{story.location}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{story.jobCount}</span>
            </>
          ) : (
            <>
              <span className="text-xs text-gray-500">{story.company}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{story.projectSize}</span>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);

const StatCard = ({ icon: Icon, number, label, color }) => (
  <div className="text-center">
    <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-${color}/10 flex items-center justify-center`}>
      <Icon className={`w-6 h-6 text-${color}`} />
    </div>
    <div className={`text-2xl font-bold text-${color} mb-1`}>{number}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

export default function SuccessStories() {
  const [activeTab, setActiveTab] = useState('pg');

  const currentStories = activeTab === 'pg' ? pgStories : clientStories;

  return (
    <section className="bg-[#F5F5F5] py-16" aria-label="Câu chuyện thành công">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 mx-auto mb-4 bg-[#ab3f20]/10 rounded-full flex items-center justify-center">
            <Quote className="w-6 h-6 text-[#ab3f20]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Câu chuyện <span className="text-[#ab3f20]">thành công</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trải nghiệm thực tế từ nhân sự và đối tác đã đồng hành cùng Cviro
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto">
          <StatCard 
            icon={Users} 
            number="1000+" 
            label="Nhân sự" 
            color="[#ab3f20]"
          />
          <StatCard 
            icon={Briefcase} 
            number="500+" 
            label="Dự án" 
            color="[#f0b33a]"
          />
          <StatCard 
            icon={Award} 
            number="98%" 
            label="Hài lòng" 
            color="[#536b4e]"
          />
          <StatCard 
            icon={Star} 
            number="4.9★" 
            label="Đánh giá" 
            color="[#ab3f20]"
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-[#F5F5F5] border border-[#E0E0E0] p-1 rounded-lg">
            <TabButton
              active={activeTab === 'pg'}
              onClick={() => setActiveTab('pg')}
              icon={Users}
            >
              Nhân sự
            </TabButton>
            <TabButton
              active={activeTab === 'clients'}
              onClick={() => setActiveTab('clients')}
              icon={Briefcase}
            >
              Khách hàng
            </TabButton>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentStories.map((story) => (
            <StoryCard 
              key={story.id} 
              story={story} 
              type={activeTab}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
