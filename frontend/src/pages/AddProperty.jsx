// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { createProperty } from "../services/propertyService";

// function AddProperty() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: "",
//     type: "sale",
//     location: {
//       city: "",
//       state: "",
//       pincode: "",
//     },
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLocationChange = (e) => {
//     setForm({
//       ...form,
//       location: {
//         ...form.location,
//         [e.target.name]: e.target.value,
//       },
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       await createProperty(form);

//       alert("Property added successfully");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to add property");
//     }
//   };

//   return (
//     <div>
//       <h2>Add Property</h2>

//       {/* Title */}
//       <input
//         name="title"
//         placeholder="Title"
//         value={form.title}
//         onChange={handleChange}
//       />

//       {/* Description */}
//       <input
//         name="description"
//         placeholder="Description"
//         value={form.description}
//         onChange={handleChange}
//       />

//       {/* Price */}
//       <input
//         type="number"
//         name="price"
//         placeholder="Price"
//         value={form.price}
//         onChange={handleChange}
//       />

//       {/* Type Dropdown */}
//       <select name="type" value={form.type} onChange={handleChange}>
//         <option value="sale">Sale</option>
//         <option value="rent">Rent</option>
//       </select>

//       <h4>Location</h4>

//       {/* City */}
//       <input
//         name="city"
//         placeholder="City"
//         value={form.location.city}
//         onChange={handleLocationChange}
//       />

//       {/* State */}
//       <input
//         name="state"
//         placeholder="State"
//         value={form.location.state}
//         onChange={handleLocationChange}
//       />

//       {/* Pincode */}
//       <input
//         name="pincode"
//         placeholder="Pincode"
//         value={form.location.pincode}
//         onChange={handleLocationChange}
//       />

//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }

// export default AddProperty;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProperty } from "../services/propertyService";
import "./AddProperty.css";

function AddProperty() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    type: "sale",
    location: {
      city: "",
      state: "",
      pincode: "",
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (e) => {
    setForm({
      ...form,
      location: {
        ...form.location,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async () => {
    try {
      await createProperty(form);
      alert("Property added successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to add property");
    }
  };

  return (
    <div className="add-property-container">
      <div className="add-property-card">
        <h2>Add Property</h2>

        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            placeholder="Enter property title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            name="description"
            placeholder="Enter description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <h4>Location</h4>

        <div className="form-group">
          <label>City</label>
          <input
            name="city"
            placeholder="City"
            value={form.location.city}
            onChange={handleLocationChange}
          />
        </div>

        <div className="form-group">
          <label>State</label>
          <input
            name="state"
            placeholder="State"
            value={form.location.state}
            onChange={handleLocationChange}
          />
        </div>

        <div className="form-group">
          <label>Pincode</label>
          <input
            name="pincode"
            placeholder="Pincode"
            value={form.location.pincode}
            onChange={handleLocationChange}
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit Property
        </button>
      </div>
    </div>
  );
}

export default AddProperty;