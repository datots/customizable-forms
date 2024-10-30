// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Login from "./components/Authentication/Login";
// import Register from "./components/Authentication/Registration";
// import UserDashboard from "./components/User/UserDashboard.jsx";
// import AdminDashboard from "./components/Admin/AdminDashboard";
// import NotFound from "./components/NotFound";
// import PrivateRoute from "./components/routes/PrivateRoute.jsx";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/userdashboard"
//             element={
//               <PrivateRoute allowedRoles={["user"]}>
//                 <UserDashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin"
//             element={
//               <Private>
//                 <AdminDashboard />
//               </Private>
//             }
//           />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Registration";
import UserDashboard from "./components/User/UserDashboard.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/routes/PrivateRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/userdashboard"
            element={
              <PrivateRoute allowedRoles={["user"]}>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
