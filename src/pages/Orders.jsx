import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN =", token);

      const response = await axios.get(
        "http://localhost:5000/api/order/myorders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data);
    } catch (err) {
      console.log(err.response?.data);
      console.log(err.response?.status);
      console.log(err);
      alert("Failed to fetch orders");
    }
  }

  async function cancelOrder(id) {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/order/cancel/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order Cancelled");
      fetchOrders();
    } catch (err) {
      console.log(err);
      alert("Cannot Cancel Order");
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
            onClick={() => navigate("/")}
            className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold"
          >
            Profile
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

      <div className="p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          📦 My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500">
            No orders found.
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="font-bold">
                  Order ID: {order._id}
                </h3>

                <p>Total: ₹{order.totalAmount}</p>

                <p>Address: {order.address}</p>

                <p>Status: {order.status}</p>

                <p>
                  {new Date(order.createdAt).toLocaleString()}
                </p>

                <h4 className="font-semibold mt-4">
                  Items:
                </h4>

                {order.items.map((item) => (
                  <div key={item._id}>
                    {item.name} × {item.quantity}
                  </div>
                ))}

                {order.status === "Pending" && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;