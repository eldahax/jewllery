import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Home from "./pages/Home"
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import About from "./pages/About";
import ContactPage from "./pages/Contact";
import './App.css';

function App() {
  return (
    <Routes>
     
      <Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/home" element={<Home />} />
<Route path="/shop" element={<Shop />} />
<Route path="/blog" element={<Blog />} />
   <Route path="/about" element={<About />} />
    <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;