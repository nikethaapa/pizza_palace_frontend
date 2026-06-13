import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://pizza-palace-backend-qi5u.onrender.com/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setUser(response.data);
    } catch (err) {
      console.log(err);
      alert("Unauthorized");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-orange-600 text-white p-5 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">🍕 Pizza Palace</h1>
          <p className="text-sm">Fresh • Hot • Delicious</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/home")}
            className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold"
          >
            Orders
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold"
          >
            Cart
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Profile Card */}
      <div className="flex justify-center items-center mt-10">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
            👤 My Profile
          </h1>

          {user ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Name</h3>
                <p>{user.name}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Email</h3>
                <p>{user.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-center">Loading profile...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;