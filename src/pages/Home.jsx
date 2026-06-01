import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const [pizzas, setPizzas] = useState([]);
    const [cart, setCart] = useState([]);
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        fetchPizzas();

        const savedCart = localStorage.getItem("cart");

        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }

    }, []);

    async function fetchPizzas() {

        try {

            const response = await axios.get(
                "https://pizza-palace-backend-qi5u.onrender.com/api/pizza/all"
            );

            setPizzas(response.data);

        } catch (err) {

            console.log(err);

        }

    }

    function addToCart(pizza) {

        const existingItem = cart.find(
            (item) => item._id === pizza._id
        );

        let updatedCart;

        if (existingItem) {

            updatedCart = cart.map((item) =>
                item._id === pizza._id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            );

        } else {

            updatedCart = [
                ...cart,
                {
                    ...pizza,
                    quantity: 1
                }
            ];

        }

        setCart(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

    }

    const filteredPizzas = pizzas
        .filter((pizza) => {

            const categoryMatch =
                category === "All" ||
                pizza.category === category;

            const searchMatch =
                pizza.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            return categoryMatch && searchMatch;

        })
        .sort((a, b) => {

            if (sort === "low") {
                return a.price - b.price;
            }

            if (sort === "high") {
                return b.price - a.price;
            }

            return 0;

        });
    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-orange-50">

            {/* Header */}
            <header className="bg-orange-600 text-white p-5 shadow-md flex justify-between items-center">

                <div>
                    <h1 className="text-3xl font-bold">
                        🍕 Pizza Palace
                    </h1>
                    <p className="text-sm">
                        Fresh • Hot • Delicious
                    </p>
                </div>

                <div className="flex gap-3">

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
        onClick={() => navigate("/cart")}
        className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold"
    >
        Cart ({cart.length})
    </button>

    <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
    >
        Logout
    </button>

</div>

            </header>

            {/* Filters */}
            <div className="p-6 flex flex-col md:flex-row gap-4">

                <input
                    type="text"
                    placeholder="Search Pizza..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-3 rounded-lg flex-1"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-3 rounded-lg"
                >
                    <option value="All">All</option>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border p-3 rounded-lg"
                >
                    <option value="">Sort By Price</option>
                    <option value="low">Low → High</option>
                    <option value="high">High → Low</option>
                </select>

            </div>

            {/* Pizza Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">

                {filteredPizzas.map((pizza) => (

                    <div
                        key={pizza._id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300"
                    >

                        <img
                            src={pizza.imageUrl}
                            alt={pizza.name}
                            className="w-full h-52 object-cover"
                        />

                        <div className="p-4">

                            <h2 className="text-xl font-bold">
                                {pizza.name}
                            </h2>

                            <p className="text-gray-600 mt-2">
                                {pizza.description}
                            </p>

                            <div className="flex justify-between items-center mt-3">

                                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                                    {pizza.category}
                                </span>

                                <span className="font-bold text-lg">
                                    ₹{pizza.price}
                                </span>

                            </div>

                            <button
                                onClick={() => addToCart(pizza)}
                                className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg"
                            >
                                Add To Cart 🛒
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );

}

export default Home;