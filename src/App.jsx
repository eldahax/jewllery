import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Home from "./pages/Home"
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import About from "./pages/About";
import ContactPage from "./pages/Contact";
import './App.css';
import AdminDashboard from "./admin/dashboard";
import Profile from "./pages/Profile";
import UserTable from "./admin/Tables/costumerTable";
import EmployeeTable from "./admin/Tables/employeeTable";
import SupplierTable from "./admin/Tables/supplierTable";
import CategoryTable from "./admin/Tables/categories";
import ProductTable from "./admin/Tables/productTable";
function App() {
  return (
    <Routes>
     
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<ProductTable />} />
      <Route path="/employees" element={<EmployeeTable />} />
      <Route path="/suppliers" element={<SupplierTable />} />
      <Route path="/costumers" element={<UserTable />} />
      <Route path="/categories" element={<CategoryTable />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/Profile" element={<Profile />} />

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