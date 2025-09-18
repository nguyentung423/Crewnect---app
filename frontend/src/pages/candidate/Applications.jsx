export default function CandidateApplications() {
  const applications = [
    { id: 1, title: "PG Booth - Tech Expo 2025", status: "Đang xem xét" },
    { id: 2, title: "Mascot Lễ Hội Mùa Thu", status: "Được chấp nhận" },
  ];

  const statusColors = {
    "Đang xem xét": "text-amber-600 bg-amber-100",
    "Được chấp nhận": "text-emerald-600 bg-emerald-100",
    "Bị từ chối": "text-red-600 bg-red-100",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Đơn ứng tuyển của tôi</h1>
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
            <span className="font-medium text-slate-700">{app.title}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[app.status]}`}>
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
