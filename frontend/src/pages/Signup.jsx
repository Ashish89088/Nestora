// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signup } from "../services/authService";

// function Signup() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "buyer", // default value
//   });

//   const handleSubmit = async () => {
//     try {
//       console.log("form is >>> ", JSON.stringify(form));
//       const res = await signup(form);

//       // Save token after signup
//       // Access token safely
//       console.log('res is ',JSON.stringify(res))
//       const token = res.data?.token || res.data?.data?.token;

//       if (!token) {
//         alert("Signup successful but token not received from backend");
//         return;
//       }
//       localStorage.setItem("token", res.data.token);

//       alert("Signup successful");

//       // Redirect to dashboard
//       navigate("/dashboard");
//     } catch (error) {
//       alert("Signup failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>

//       <input
//         placeholder="Name"
//         value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />

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

//       <select
//         value={form.role}
//         onChange={(e) => setForm({ ...form, role: e.target.value })}
//       >
//         <option value="owner">Owner</option>
//         <option value="buyer">Buyer</option>
//       </select>

//       <button onClick={handleSubmit}>Sign Up</button>

//       {/* ✅ Login Option */}
//       <p>
//         Already have an account?{" "}
//         <button onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
//           Login
//         </button>
//       </p>
//     </div>
//   );
// }

// export default Signup;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const handleSubmit = async () => {
    try {
      const res = await signup(form);

      const token = res?.token || res?.data?.token;

      if (!token) {
        alert("Signup successful but token not received");
        return;
      }

      localStorage.setItem("token", token);

      alert("Signup successful");
      navigate("/");
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

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
            placeholder="Enter password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="owner">Owner</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>

        <button className="signup-btn" onClick={handleSubmit}>
          Sign Up
        </button>

        <p className="login-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;