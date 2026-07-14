import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/routeProtect";
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Home from "./pages/Home"
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import About from "./pages/About";
import ContactPage from "./pages/Contact";
import './App.css';
import AdminDashboard from "./admin/dashboard";
import UserTable from "./admin/Tables/costumerTable";
import EmployeeTable from "./admin/Tables/employeeTable";
import SupplierTable from "./admin/Tables/supplierTable";
import CategoryTable from "./admin/Tables/categories";
import ProductTable from "./admin/Tables/productTable";
import WorkScheduleTable from "./admin/Tables/workScheduleTable";
import ContactTable from "./admin/Tables/contactTable";
import ProductDetails from "./pieces/productDetails";
import ReviewTable from "./admin/Tables/reviewsTable";
import Favorites from "./pages/Favorites";
import Cart from "./pieces/CartPage";
import Success from "./pages/Success";
import Reminders from "./admin/Tables/reminderTable";
import PaymentsTable from "./admin/Tables/paymentTable";
import OrderTable from "./admin/Tables/orderTable";
import DiscountTable from "./admin/Tables/DiscountTable";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/success" element={<Success />} />

      <Route path="/work-Schedules" element={<ProtectedRoute allowedRoles={["admin", "employee"]}><WorkScheduleTable /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute allowedRoles={["admin", "employee"]}><ProductTable /></ProtectedRoute>} />
      <Route path="/discounts" element={<ProtectedRoute allowedRoles={["admin", "employee"]}>< DiscountTable/></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute allowedRoles={["admin", "employee","costumer"]}><AdminDashboard /></ProtectedRoute>} />

      <Route path="/payments" element={<ProtectedRoute allowedRoles={["admin"]}><PaymentsTable /></ProtectedRoute>} />
     
      <Route path="/employees" element={<ProtectedRoute allowedRoles={["admin"]}><EmployeeTable /></ProtectedRoute>} />
      <Route path="/suppliers" element={<ProtectedRoute allowedRoles={["admin"]}><SupplierTable /></ProtectedRoute>} />
      <Route path="/costumers" element={<ProtectedRoute allowedRoles={["admin"]}><UserTable /></ProtectedRoute>} />
      <Route path="/categories" element={<ProtectedRoute allowedRoles={["admin"]}><CategoryTable /></ProtectedRoute>} />

       <Route path="/contacts" element={<ProtectedRoute allowedRoles={["admin","costumer"]}><ContactTable /></ProtectedRoute>} />
      <Route path="/reviews" element={<ProtectedRoute allowedRoles={["admin",,"costumer"]}><ReviewTable /></ProtectedRoute>} />
            <Route path="/reminders" element={<ProtectedRoute allowedRoles={["admin", "employee","costumer"]}><Reminders /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute allowedRoles={["admin", "employee","costumer"]}><OrderTable /></ProtectedRoute>} />

    </Routes>
  );
}

export default App;