import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import CategoryPage from "./pages/CategoryPage";
import RestaurantDetail from "./pages/RestaurantDetail";
import "./styles/globals.css";

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
