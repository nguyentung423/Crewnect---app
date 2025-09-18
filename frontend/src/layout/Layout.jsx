import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Layout = ({ children }) => {
  const location = useLocation();

  // ✅ kiểm tra nếu đang ở trong dashboard thì ẩn Header/Footer
  const isDashboard =
    location.pathname.startsWith("/agency") ||
    location.pathname.startsWith("/candidate");

  return (
    <>
      {!isDashboard && <Header />}
      <main>{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
};

export default Layout;
