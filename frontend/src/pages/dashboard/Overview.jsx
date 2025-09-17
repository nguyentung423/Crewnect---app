export default function Overview() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tổng quan Agency</h1>

      {/* Cards thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Số Job đã đăng</h2>
          <p className="text-3xl font-bold text-green-600">12</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Ứng viên đã ứng tuyển</h2>
          <p className="text-3xl font-bold text-blue-600">47</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Đang chờ duyệt</h2>
          <p className="text-3xl font-bold text-orange-600">5</p>
        </div>
      </div>

      {/* Section gần đây */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Hoạt động gần đây</h2>
        <ul className="space-y-3">
          <li className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span className="font-medium">Ứng viên Nguyễn Văn A</span> đã ứng tuyển vào job <span className="text-green-600 font-medium">PG Booth - Tech Expo</span>.
          </li>
          <li className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span className="font-medium">Job "Mascot Lễ Hội 2025"</span> đã được duyệt thành công.
          </li>
          <li className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span className="font-medium">Ứng viên Trần Thị B</span> đã rút ứng tuyển khỏi job <span className="text-red-600 font-medium">PG Roadshow</span>.
          </li>
        </ul>
      </div>
    </div>
  );
}
