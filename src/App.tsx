import "./App.css";
import Login from "./components/Auth/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminRoute from "./components/Auth/AdminRoute";
import TemplateList from "./components/FormTemplates/TemplateList";
import CreateTemplate from "./components/FormTemplates/CreateTemplate";
import TemplateDetails from "./components/FormTemplates/TemplateDetails";
import EditTemplate from "./components/FormTemplates/EditTemplate";
import UserManagement from "./components/Admin/UserManagement";
import UserDashboard from "./components/Admin/AdminDashboard";
import UserRoute from "./components/Auth/UserRoute";
// import ProtectedRoute from "./components/Auth/ProtectedRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/reset" element={<ForgotPassword />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Route>
        <Route element={<UserRoute />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Route>
        <Route path="/templates" element={<TemplateList />} />
        <Route path="/create" element={<CreateTemplate />} />
        <Route path="/templates/:id" element={<TemplateDetails />} />
        <Route path="/edit/:id" element={<EditTemplate />} />
      </Routes>
    </Router>
  );
}

export default App;
