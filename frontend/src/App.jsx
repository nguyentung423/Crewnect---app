import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import About from "./pages/about"; // ✅ import About

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} /> {/* ✅ thêm About */}
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
