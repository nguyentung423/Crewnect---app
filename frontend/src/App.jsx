import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import About from "./pages/about"; // ✅ import About

// import thêm các trang mới
import Signup from "./pages/Signup";
import SignupCandidate from "./pages/SignupCandidate";
import SignupAgency from "./pages/SignupAgency";
import LoginCandidate from "./pages/LoginCandidate";
import LoginAgency from "./pages/LoginAgency";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Signup flow */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/candidate" element={<SignupCandidate />} />
          <Route path="/signup/agency" element={<SignupAgency />} />

          {/* Login flow */}
          <Route path="/login/candidate" element={<LoginCandidate />} />
          <Route path="/login/agency" element={<LoginAgency />} />

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
