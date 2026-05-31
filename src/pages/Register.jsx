import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Register(){
    const [user,setuser]=useState({name:"",email:"",password:""})
    const navigate = useNavigate();
    function handlechange(e){
        setuser({...user,
            [e.target.name]: e.target.value}
        )
    }
    async function handlesubmit(e) {
        e.preventDefault()
        try{
            const response=await axios.post("http://localhost:5000/api/auth/register",
                user)
            alert(response.data.message)
            navigate("/login")
        }catch(err){
            console.log(err)
            alert("registration failed")
        }
        
    }
    return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100">

    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">

      <div className="bg-orange-600 text-white text-center py-6">
        <h1 className="text-3xl font-bold">🍕 Pizza Palace</h1>
      </div>

      <div className="p-8">

        <h2 className="text-2xl font-semibold text-center mb-8">
          Create Account 🚀
        </h2>

        <form onSubmit={handlesubmit} className="space-y-5">

          <input
            onChange={handlechange}
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-lg p-3"
          />

          <input
            onChange={handlechange}
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-lg p-3"
          />

          <input
            onChange={handlechange}
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg p-3"
          />

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-orange-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>

    </div>

  </div>
);
}
export default Register;