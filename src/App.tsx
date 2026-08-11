import {Routes, Route } from "react-router";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
       <div className="min-h-screen bg-[#f5f9fd]">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;