import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { updateProperty } from "../services/propertyService";
import "./EditProperty.css"; // reuse same styling

function EditProperty() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

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

  // ✅ Pre-fill form when component loads
  useEffect(() => {
    if (location.state) {
      setForm(location.state);
    }
  }, [location.state]);

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
      await updateProperty(id, form);
      alert("Property updated successfully");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to update property");
    }
  };

  return (
    <div className="add-property-container">
      <div className="add-property-card">
        <h2>Edit Property</h2>

        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <h4>Location</h4>

        <div className="form-group">
          <label>City</label>
          <input
            name="city"
            value={form.location.city}
            onChange={handleLocationChange}
          />
        </div>

        <div className="form-group">
          <label>State</label>
          <input
            name="state"
            value={form.location.state}
            onChange={handleLocationChange}
          />
        </div>

        <div className="form-group">
          <label>Pincode</label>
          <input
            name="pincode"
            value={form.location.pincode}
            onChange={handleLocationChange}
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Update Property
        </button>
      </div>
    </div>
  );
}

export default EditProperty;