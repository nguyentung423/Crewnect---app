export default function CandidateSettings() {
  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-bold text-slate-800">Cài đặt tài khoản</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Mật khẩu mới</label>
          <input type="password" className="w-full border rounded-lg px-3 py-2 mt-1" />
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Đổi mật khẩu
        </button>
      </div>
    </div>
  );
}
