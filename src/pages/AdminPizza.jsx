import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPizza() {

    const [pizzas, setPizzas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPizzas();
    }, []);

    async function fetchPizzas() {

        const response = await axios.get(
            "http://localhost:5000/api/pizza/all"
        );

        setPizzas(response.data);
    }

    async function deletePizza(id) {

        await axios.delete(
            `http://localhost:5000/api/pizza/${id}`
        );

        fetchPizzas();
    }
    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-orange-50 to-gray-200 p-6">
           <div className="bg-orange-600 text-white px-6 py-4 shadow-md flex flex-col md:flex-row items-center justify-between gap-3">

    {/* Title */}
    <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
        🍕 The Pizza Palace
    </h1>

    {/* Buttons */}
    <div className="flex gap-3">
        <button
            onClick={() => navigate("/admin/orders")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold transition shadow"
        >
            Orders
        </button>

        <button
            onClick={handleLogout}
            className="bg-yellow-400 hover:bg-red-600 text-black px-4 py-2 rounded-lg font-semibold transition shadow"
        >
            Logout
        </button>
    </div>

</div>
           
            {/* Header */}
            <h1 className="text-5xl font-extrabold text-center text-orange-600 mb-10">
                🍕 Admin Pizza Panel
            </h1>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {pizzas.map((pizza) => (
                    <div
                        key={pizza._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100"
                    >

                        {/* Image */}
                        <img
                            src={pizza.imageUrl}
                            alt={pizza.name}
                            className="h-52 w-full object-cover hover:scale-105 transition duration-300"
                        />

                        {/* Content */}
                        <div className="p-5">

                            <h2 className="text-2xl font-bold text-gray-800">
                                {pizza.name}
                            </h2>

                            <p className="text-lg text-green-600 font-semibold mt-1">
                                ₹ {pizza.price}
                            </p>

                            {/* Delete Button */}
                            <button
                                onClick={() => deletePizza(pizza._id)}
                                className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
                            >
                                🗑 Delete Pizza
                            </button>

                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default AdminPizza;