import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleCart = () => {
    if (!token) {
      alert("You need to Login First");
      navigate("/login");
      return;
    }

    navigate("/cart");
  };

  const handleOrders = () => {
    if (!token) {
      alert("You need to Login First");
      navigate("/login");
      return;
    }

    navigate("/orders");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged Out Successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1C1C1C]">
      {/* Header */}
      <header className="bg-[#C0392B] text-white p-5 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">🍕 Pizza Palace</h1>
            <p className="text-sm">Fresh • Hot • Delicious</p>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 font-medium items-center">
            <li
              className="cursor-pointer hover:text-[#E67E22]"
              onClick={() => navigate("/")}
            >
              Home
            </li>

            <li
              className="cursor-pointer hover:text-[#E67E22]"
              onClick={handleCart}
            >
              Cart
            </li>

            <li
              className="cursor-pointer hover:text-[#E67E22]"
              onClick={handleOrders}
            >
              Orders
            </li>

            {!token ? (
              <li
                className="cursor-pointer hover:text-[#E67E22]"
                onClick={() => navigate("/login")}
              >
                Login
              </li>
            ) : (
              <li
                className="cursor-pointer hover:text-[#E67E22]"
                onClick={handleLogout}
              >
                Logout
              </li>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="text-3xl md:hidden"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="fixed top-0 left-0 h-full w-64 bg-black text-white z-50">
            <button
              className="absolute top-8 right-8 text-4xl"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <div className="flex flex-col justify-center h-full pl-10 space-y-10 text-2xl font-semibold">

              <button
                className="text-left hover:text-[#E67E22]"
                onClick={() => {
                  navigate("/home");
                  setOpen(false);
                }}
              >
                Home
              </button>

              <button
                className="text-left hover:text-[#E67E22]"
                onClick={() => {
                  handleCart();
                  setOpen(false);
                }}
              >
                Cart
              </button>

              <button
                className="text-left hover:text-[#E67E22]"
                onClick={() => {
                  handleOrders();
                  setOpen(false);
                }}
              >
                Orders
              </button>

              {!token ? (
                <button
                  className="text-left hover:text-[#E67E22]"
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                >
                  Login
                </button>
              ) : (
                <button
                  className="text-left hover:text-[#E67E22]"
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                >
                  Logout
                </button>
              )}

            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold">
          Welcome to Pizza Palace 👋
        </h2>

        <p className="mt-2 text-gray-600">
          Order your favorite pizza in seconds.
        </p>

        {!token && (
          <button
            onClick={() => navigate("/login")}
            className="mt-6 bg-[#C0392B] hover:bg-[#E67E22] text-white px-5 py-2 rounded-lg transition duration-300"
          >
            Go to Login
          </button>
        )}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold text-[#C0392B]">
            Quick Delivery
          </h3>
          <p className="text-gray-600">30 to 40 min</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold text-[#C0392B]">
            Fresh Ingredients
          </h3>
          <p className="text-gray-600">100% Fresh</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold text-[#C0392B]">
            One Payment method 
          </h3>
          <p className="text-gray-600">Cash on delivery only</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold text-[#C0392B]">
            Customer Satisfaction
          </h3>
          <p className="text-gray-600">⭐⭐⭐⭐⭐</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1C1C1C] text-white text-center p-4 mt-10">
        © 2026 Pizza Palace
      </footer>
    </div>
  );
}

export default Menu;