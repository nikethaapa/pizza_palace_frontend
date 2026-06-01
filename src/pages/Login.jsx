import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [role, setRole] = useState("user");

    const [user, setuser] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    function handlechange(e) {
        setuser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }

    async function handlesubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://pizza-palace-backend-qi5u.onrender.com/api/auth/login",
                user
            );

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);

            alert("Login Successful ✅");

            if (response.data.role === "admin") {
                navigate("/admin/orders");
            } else {
                navigate("/home");
            }
        } catch (err) {
            console.log("ERROR:", err);
            console.log("RESPONSE:", err.response);
            console.log("DATA:", err.response?.data);
            console.log("STATUS:", err.response?.status);

            alert(err.response?.data?.message || "Login Failed ❌");
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-500 via-yellow-100 to-gray-500">

            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">

                <div className="bg-orange-600 text-white text-center py-5">
                    <h1 className="text-3xl font-bold">
                        The Pizza Palace
                    </h1>
                </div>

                <div className="p-10">

                    <h2 className="text-center text-3xl font-semibold mb-10">
                        Welcome Back 👋
                    </h2>

                    {/* Tabs */}
                    <div className="flex justify-center gap-20 mb-12">

                        <button
                            onClick={() => setRole("user")}
                            className={`text-2xl font-semibold pb-2 border-b-4 ${role === "user"
                                ? "text-orange-600 border-orange-600"
                                : "text-gray-500 border-transparent"
                                }`}
                        >
                            User
                        </button>

                        <button
                            onClick={() => setRole("admin")}
                            className={`text-2xl font-semibold pb-2 border-b-4 ${role === "admin"
                                ? "text-orange-600 border-orange-600"
                                : "text-gray-500 border-transparent"
                                }`}
                        >
                            Admin
                        </button>

                    </div>

                    <form
                        onSubmit={handlesubmit}
                        className="space-y-6"
                    >

                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handlechange}
                            placeholder={
                                role === "admin"
                                    ? "Admin Email"
                                    : "Email Address"
                            }
                            className="w-full border border-gray-400 rounded p-4 text-lg"
                        />

                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handlechange}
                            placeholder="Password"
                            className="w-full border border-gray-400 rounded p-4 text-lg"
                        />

                        <button
                            type="submit"
                            className="w-full bg-orange-600 text-white py-4 rounded text-xl font-semibold hover:bg-orange-700"
                        >
                            Login
                        </button>

                    </form>

                    {role === "admin" && (
                        <p className="text-center mt-8 text-xl text-gray-600">
                            email: admin@gmail.com | Password: 123
                        </p>
                    )}

                    <p className="text-center mt-6 text-gray-600">
                        Don't have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-orange-600 font-semibold cursor-pointer hover:underline"
                        >
                            Register
                        </span>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;