import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Camera,
  Upload,
  X,
  Edit2,
  Save,
  Plus,
  Image,
} from "lucide-react";

export default function CandidateProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // States cho chỉnh sửa
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editSkills, setEditSkills] = useState("");
  const [saving, setSaving] = useState(false);

  // Portfolio images
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [uploadingPortfolio, setUploadingPortfolio] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setProfile(data);
        setEditBio(data.bio || "");
        setEditSkills(data.skills || "");

        if (data.portfolio) {
          try {
            const parsed =
              typeof data.portfolio === "string"
                ? JSON.parse(data.portfolio)
                : data.portfolio;
            setPortfolioImages(Array.isArray(parsed) ? parsed : []);
          } catch {
            setPortfolioImages([]);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ================= UPLOAD AVATAR =================
  const handleAvatarUpload = async (event) => {
    try {
      setUploading(true);
      setUploadError(null);

      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setUploadError("Vui lòng chọn file hình ảnh");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Kích thước file không được vượt quá 5MB");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Chưa đăng nhập");

      const fileExt = file.name.split(".").pop();
      const fileName = `avatar_${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setProfile((prev) => ({ ...prev, avatar_url: publicUrl }));
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // ================= REMOVE AVATAR =================
  const removeAvatar = async () => {
    try {
      setUploading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Chưa đăng nhập");

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: null })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setProfile((prev) => ({ ...prev, avatar_url: null }));
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // ================= UPLOAD PORTFOLIO =================
  const handlePortfolioUpload = async (event) => {
    try {
      setUploadingPortfolio(true);
      setUploadError(null);

      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setUploadError("Vui lòng chọn file hình ảnh");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Kích thước file không được vượt quá 5MB");
        return;
      }

      if (portfolioImages.length >= 4) {
        setUploadError("Chỉ được upload tối đa 4 ảnh portfolio");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Chưa đăng nhập");

      const fileExt = file.name.split(".").pop();
      const fileName = `portfolio_${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      const newPortfolio = [...portfolioImages, publicUrl];

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ portfolio: JSON.stringify(newPortfolio) })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setPortfolioImages(newPortfolio);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploadingPortfolio(false);
    }
  };

  const removePortfolioImage = async (imageUrl) => {
    try {
      setUploadingPortfolio(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Chưa đăng nhập");

      const newPortfolio = portfolioImages.filter((img) => img !== imageUrl);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ portfolio: JSON.stringify(newPortfolio) })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setPortfolioImages(newPortfolio);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploadingPortfolio(false);
    }
  };

  // ================= SAVE BIO =================
  const saveBio = async () => {
    try {
      setSaving(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Chưa đăng nhập");

      const { error } = await supabase
        .from("profiles")
        .update({ bio: editBio })
        .eq("id", user.id);

      if (error) throw error;

      setProfile((prev) => ({ ...prev, bio: editBio }));
      setIsEditingBio(false);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ================= SAVE SKILLS =================
  const saveSkills = async () => {
    try {
      setSaving(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Chưa đăng nhập");

      const { error } = await supabase
        .from("profiles")
        .update({ skills: editSkills })
        .eq("id", user.id);

      if (error) throw error;

      setProfile((prev) => ({ ...prev, skills: editSkills }));
      setIsEditingSkills(false);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ================= UI =================
  if (loading) {
    return <p className="p-4 text-slate-500">Đang tải hồ sơ...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">Lỗi: {error}</p>;
  }

  if (!profile) {
    return <p className="p-4 text-slate-500">Chưa có hồ sơ.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden border-2 border-orange-200">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-orange-600" />
            )}
          </div>

          {/* Upload Button */}
          <div className="absolute -bottom-1 -right-1">
            <label className="w-6 h-6 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center cursor-pointer transition-colors">
              <Camera className="w-3 h-3 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          {/* Remove Avatar */}
          {profile.avatar_url && (
            <button
              onClick={removeAvatar}
              disabled={uploading}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-xl font-bold text-slate-800">
            {profile.full_name}
          </h1>
          <p className="text-slate-500">Ứng viên</p>

          {(uploading || uploadingPortfolio) && (
            <p className="text-orange-600 text-sm mt-1 flex items-center gap-1">
              <Upload className="w-3 h-3 animate-pulse" />
              Đang tải ảnh...
            </p>
          )}

          {uploadError && (
            <p className="text-red-500 text-sm mt-1">{uploadError}</p>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 text-slate-700">
        <p className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-slate-400" />
          {profile.email || "Chưa có email"}
        </p>
        <p className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-slate-400" />
          {profile.phone || "Chưa có số điện thoại"}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-400" />
          {profile.location || "Chưa cập nhật địa điểm"}
        </p>
      </div>

      {/* Bio */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-slate-800">Giới thiệu</h2>
          {!isEditingBio ? (
            <button
              onClick={() => setIsEditingBio(true)}
              className="p-1 hover:bg-slate-100 rounded-md transition-colors"
            >
              <Edit2 className="w-4 h-4 text-slate-500" />
            </button>
          ) : (
            <div className="flex gap-1">
              <button
                onClick={saveBio}
                disabled={saving}
                className="p-1 hover:bg-green-100 rounded-md transition-colors"
              >
                <Save className="w-4 h-4 text-green-600" />
              </button>
              <button
                onClick={() => {
                  setIsEditingBio(false);
                  setEditBio(profile.bio || "");
                }}
                className="p-1 hover:bg-red-100 rounded-md transition-colors"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
            </div>
          )}
        </div>

        {isEditingBio ? (
          <textarea
            value={editBio}
            onChange={(e) => setEditBio(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            rows="4"
            placeholder="Viết giới thiệu về bản thân..."
          />
        ) : (
          <p className="text-slate-600">{profile.bio || "Chưa có mô tả."}</p>
        )}
      </div>

      {/* Skills */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-slate-800">Kỹ năng</h2>
          {!isEditingSkills ? (
            <button
              onClick={() => setIsEditingSkills(true)}
              className="p-1 hover:bg-slate-100 rounded-md transition-colors"
            >
              <Edit2 className="w-4 h-4 text-slate-500" />
            </button>
          ) : (
            <div className="flex gap-1">
              <button
                onClick={saveSkills}
                disabled={saving}
                className="p-1 hover:bg-green-100 rounded-md transition-colors"
              >
                <Save className="w-4 h-4 text-green-600" />
              </button>
              <button
                onClick={() => {
                  setIsEditingSkills(false);
                  setEditSkills(profile.skills || "");
                }}
                className="p-1 hover:bg-red-100 rounded-md transition-colors"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
            </div>
          )}
        </div>

        {isEditingSkills ? (
          <div className="space-y-2">
            <input
              value={editSkills}
              onChange={(e) => setEditSkills(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Nhập kỹ năng, cách nhau bởi dấu phẩy (VD: React, Node.js, Python)"
            />
            <p className="text-sm text-slate-500">Phân cách bằng dấu phẩy</p>
          </div>
        ) : (
          <>
            {profile.skills ? (
              <div className="flex flex-wrap gap-2">
                {profile.skills.split(",").map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">Chưa cập nhật kỹ năng</p>
            )}
          </>
        )}
      </div>

      {/* Portfolio */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800">Portfolio</h2>
          <p className="text-sm text-slate-500">{portfolioImages.length}/4 ảnh</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {portfolioImages.map((imageUrl, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group"
            >
              <img
                src={imageUrl}
                alt={`Portfolio ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removePortfolioImage(imageUrl)}
                disabled={uploadingPortfolio}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}

          {/* Add new image button */}
          {portfolioImages.length < 4 && (
            <label className="aspect-square border-2 border-dashed border-orange-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors">
              <Plus className="w-8 h-8 text-orange-400 mb-1" />
              <Image className="w-4 h-4 text-orange-400 mb-1" />
              <span className="text-xs text-orange-600">Thêm ảnh</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePortfolioUpload}
                className="hidden"
                disabled={uploadingPortfolio}
              />
            </label>
          )}
        </div>

        {portfolioImages.length === 0 && (
          <p className="text-slate-500 text-center py-8">
            Chưa có ảnh portfolio
          </p>
        )}
      </div>
    </div>
  );
}
