// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../services/authService";

// function Login() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async () => {
//     try {
//       const res = await login(form);

//       // Save token
//       localStorage.setItem("token", res.data.token);

//       alert("Login successful");

//       // Redirect to dashboard
//       navigate("/dashboard");
//     } catch (error) {
//       alert("Login failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>

//       <input
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//       />

//       <button onClick={handleSubmit}>Login</button>

//       {/* ✅ Signup Button */}
//       <p>
//         Don't have an account?{" "}
//         <button
//           onClick={() => navigate("/signup")}
//           style={{ cursor: "pointer" }}
//         >
//           Sign Up
//         </button>
//       </p>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await login(form);

      const token = res?.data?.token;
      if (!token) {
        alert("Login successful but token missing");
        return;
      }

      localStorage.setItem("token", token);

      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <button className="login-btn" onClick={handleSubmit}>
          Login
        </button>

        <p className="signup-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;