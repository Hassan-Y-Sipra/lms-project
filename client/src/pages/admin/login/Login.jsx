import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 new state
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const adminLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:7000/login", {
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("isLogin", "true");
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        console.log(err);
        alert("failed");
      });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-black/70">
        <div className="bg-black/50 p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-cyan-500 mb-4">
          LMS PROJECT
          </h1>
          <p className="text-amber-300 text-center mb-6">
            Please enter your username and password
          </p>

          <form className="space-y-4" onSubmit={adminLogin}>
            {/* Username */}
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={username}
                required
                autoComplete="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#e0e5ec]"
                style={{
                  boxShadow:
                    "inset 8px 8px 16px #a3b1c6, inset -8px -8px 16px #ffffff",
                }}
              />
            </div>

            {/* Password with show/hide */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // 👈 toggle here
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={password}
                required
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#e0e5ec]"
                style={{
                  boxShadow:
                    "inset 8px 8px 16px #a3b1c6, inset -8px -8px 16px #ffffff",
                }}
              />

              {/* Show/Hide Toggle */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash"></i> // hide
                ) : (
                  <i className="fa-solid fa-eye"></i> // show
                )}{" "}
              </span>
            </div>

            {/* Submit button */}
            <div>

            <button
              type="submit"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#e0e5ec]"
              style={{
                boxShadow:
                  "inset 4px 4px 8px #a3b1c6, inset -4px -4px -8px #ffffff",
              }}
            >
              Login
            </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
