import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Website/HomePage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Users from "./pages/Dashboard/Users";
import GoogleCallBack from "./pages/Auth/GoogleCallBack";
import Dashboard from "./pages/Dashboard/Dashboard";
import RequireAuth from "./pages/Auth/RequireAuth";
import UserDetails from "./pages/Dashboard/UserDetails";
import AddUser from "./pages/Dashboard/AddUser";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* public Routes  */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        {/* Prptected Routes  */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetails />} />
            <Route path="user/add" element={<AddUser />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
