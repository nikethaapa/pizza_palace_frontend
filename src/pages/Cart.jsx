import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setcart] = useState([]);
  const [address, setaddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setcart(JSON.parse(savedCart));
    }
  }, []);

  function removeItem(id) {
    const updatecart = cart.filter((item) => item._id !== id);
    setcart(updatecart);
    localStorage.setItem("cart", JSON.stringify(updatecart));
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setcart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setcart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  async function placeOrder() {
    try {
      const token = localStorage.getItem("token");

      const totalAmount = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const response = await axios.post(
        "https://pizza-palace-backend-qi5u.onrender.com/api/order/place",
        {
          items: cart,
          totalAmount,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      localStorage.removeItem("cart");
      setcart([]);
      setaddress("");

      navigate("/orders");
    } catch (err) {
      console.log(err);
      alert("Order failed");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-orange-50">

      {/* HEADER */}
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
            onClick={() => navigate("/profile")}
            className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold"
          >
            Profile
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold"
          >
            Orders
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* BODY */}
      <div className="p-6">

        <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">
          🛒 My Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <div className="text-xl text-gray-600 mb-4">
              Your cart is empty 🍕
            </div>

            <button
              onClick={() => navigate("/home")}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg"
            >
              Back to Home 🍕
            </button>
          </div>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="grid gap-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-lg p-5 flex flex-col md:flex-row justify-between items-center"
                >
                  <div>
                    <h2 className="text-2xl font-bold">{item.name}</h2>
                    <h3 className="text-orange-600 font-semibold">
                      ₹ {item.price}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      −
                    </button>

                    <span className="text-xl font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-4 md:mt-0"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
              <h2 className="text-2xl font-bold text-orange-600 mb-4">
                Order Summary
              </h2>

              <h3 className="text-xl mb-4">
                Total Amount:
                <span className="font-bold"> ₹ {totalAmount}</span>
              </h3>

              <input
                type="text"
                placeholder="Enter Delivery Address"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                className="w-full border p-3 rounded-lg mb-4"
              />

              <button
                onClick={placeOrder}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg text-lg font-semibold"
              >
                Place Order 🍕
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;