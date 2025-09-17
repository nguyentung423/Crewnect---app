import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

// Trang chính
import Home from "./pages/Home";
import About from "./pages/about";

// Signup & Login
import Signup from "./pages/Signup";
import SignupCandidate from "./pages/SignupCandidate";
import SignupAgency from "./pages/SignupAgency";
import LoginCandidate from "./pages/LoginCandidate";
import LoginAgency from "./pages/LoginAgency";

// Test Supabase
import TestSupabase from "./TestSupabase";

// Dashboard cho Agency
import AgencyDashboard from "./pages/dashboard/AgencyDashboard";
import Overview from "./pages/dashboard/Overview";
import Jobs from "./pages/dashboard/Jobs";
import Applications from "./pages/dashboard/Applications";
import CompanyProfile from "./pages/dashboard/CompanyProfile";
import Settings from "./pages/dashboard/Settings";
import CreateJob from "./pages/dashboard/CreateJob"; // ✅ Đăng job mới

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Signup */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/candidate" element={<SignupCandidate />} />
          <Route path="/signup/agency" element={<SignupAgency />} />

          {/* Login */}
          <Route path="/login/candidate" element={<LoginCandidate />} />
          <Route path="/login/agency" element={<LoginAgency />} />

          {/* Test Supabase */}
          <Route path="/test-supabase" element={<TestSupabase />} />

          {/* ✅ Agency Dashboard (đã rút gọn URL) */}
          <Route path="/agency" element={<AgencyDashboard />}>
            <Route index element={<Overview />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/new" element={<CreateJob />} />
            <Route path="applications" element={<Applications />} />
            <Route path="profile" element={<CompanyProfile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* 404 */}
          <Route
            path="*"
            element={
              <h1 className="text-center mt-10 text-2xl font-bold text-red-500">
                404 Not Found
              </h1>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
