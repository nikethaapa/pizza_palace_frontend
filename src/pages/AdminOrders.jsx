import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminOrders() {

    const [orders, setorders] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {

        fetchOrders();

    }, []);

    async function fetchOrders() {

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(

                "https://pizza-palace-backend-qi5u.onrender.com/api/order/all",

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );

            setorders(response.data);

        } catch (err) {

            console.log("ERROR:", err);

            console.log("RESPONSE:", err.response);

            console.log("DATA:", err.response?.data);

            console.log("STATUS:", err.response?.status);

            alert("Failed to fetch orders");

        }

    }

    async function updateStatus(id, status) {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(
                `https://pizza-palace-backend-qi5u.onrender.com/api/order/status/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);
            fetchOrders();

        } catch (err) {
            console.log(err);
            alert("Update Failed");
        }
    }
    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-orange-50 to-gray-200 p-6">

            {/* Header */}
            <div className="bg-orange-600 text-white px-6 py-4 shadow-md flex flex-col md:flex-row items-center justify-between gap-3">

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold  md:text-left">
                    🍕 The Pizza Palace
                </h1>

                {/* Button */}
                <div className="flex gap-1">
                    <button
                        onClick={() => navigate("/admin/pizzas")}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold transition duration-200 shadow-md"
                    >
                        Pizza List
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-yellow-400 hover:bg-red-600 text-black px-4 py-2 rounded-lg font-semibold transition shadow"
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className="text-center mb-10">
                <h1 className="text-5xl font-extrabold text-orange-600">
                    Admin Orders Panel
                </h1>
                <p className="text-gray-600 mt-2">
                    Manage all customer orders in real time
                </p>
            </div>

            {/* Orders Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 border border-gray-100"
                    >

                        {/* Order Info */}
                        <div className="mb-4">
                            <h3 className="text-sm text-gray-500">Order ID</h3>
                            <p className="font-bold text-gray-800 break-all">
                                {order._id}
                            </p>
                        </div>
                        <div className="mb-2">
                            <span className="text-gray-600">User Email:</span>
                            <p className="font-medium">{order.user?.email}</p>
                        </div>

                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-bold text-green-600">
                                ₹{order.totalAmount}
                            </span>
                        </div>

                        <div className="mb-2">
                            <span className="text-gray-600">Address:</span>
                            <p className="font-medium">{order.address}</p>
                        </div>

                        <div className="mb-3">
                            <span className="text-gray-600">Date:</span>
                            <p className="text-sm">
                                {new Date(order.createdAt).toLocaleString()}
                            </p>
                        </div>

                        {/* Items */}
                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                            <h4 className="font-semibold mb-2">Items</h4>
                            {order.items.map((item, i) => (
                                <p key={i} className="text-sm text-gray-700">
                                    🍕 {item.name} × {item.quantity}
                                </p>
                            ))}
                        </div>

                        {/* Status */}
                        <div className="mb-4">
                            <label className="text-sm font-semibold text-gray-600">
                                Update Status
                            </label>

                            <select
                                value={order.status}
                                onChange={(e) =>
                                    updateStatus(order._id, e.target.value)
                                }
                                className="w-full mt-2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            >
                                <option value="Pending">🕒 Pending</option>
                                <option value="Confirmed">✅ Confirmed</option>
                                <option value="Preparing">👨‍🍳 Preparing</option>
                                <option value="Out for Delivery">🚚 Out for Delivery</option>
                                <option value="Delivered">📦 Delivered</option>
                            </select>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );

}

export default AdminOrders;