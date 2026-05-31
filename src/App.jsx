import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home"
import Profile from "./pages/Profile";
import Cart from "./pages/Cart"
import Orders from "./pages/Orders";
import AdminOrders from "./pages/AdminOrders"
import AdminPizza from "./pages/AdminPizza";
import AdminRoute from "../src/routes/AdminRoute";
import UserRoute from "./routes/UserRoute";

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/home" element={<UserRoute><Home /></UserRoute>} />
        <Route path="/orders" element={<UserRoute><Orders /></UserRoute>} />
        <Route path="/cart" element={<UserRoute><Cart /></UserRoute>} />
        <Route path="/profile" element={<UserRoute><Profile /></UserRoute>} />

        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/admin/pizzas" element={<AdminRoute><AdminPizza /></AdminRoute>} />
      </Routes>
    </BrowserRouter>

  );

}

export default App;