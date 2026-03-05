import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOwnerProperties, deleteProperty } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";
import "./Dashboard.css";
import { getCurrentUser } from "../services/authService";

function Dashboard() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchOwnerProperties(page);
    fetchUser();
  }, [page]);

  const fetchOwnerProperties = async (page) => {
    try {
      const res = await getOwnerProperties(page, limit);

      setProperties(res?.data?.data || res?.data || []);
      setTotalPages(res?.data?.pagination?.totalPages || 1);
    } catch (error) {
      console.error(error);
      alert("Unauthorized or failed to fetch properties");
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await getCurrentUser();

      console.log('current user is '+JSON.stringify(res));
      setUser(res.data.data);
      if(res.data.data.role == "owner") {
        navigate("/dashboard");
      }
      
    } catch (error) {
      console.log("Not logged in");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProperty(id);
      fetchOwnerProperties(page);
    } catch (error) {
      alert("Failed to delete property");
    }
  };

  const handleEdit = (property) => {
    navigate(`/edit-property/${property._id}`, {
      state: property,
    });
  };

  return (

    <div className="dashboard-container">
      {/* Show Username */}
      {user && (
        <h2 style={{ marginBottom: "10px" }}>
          Welcome, {user.name}
        </h2>
      )}
      <div className="dashboard-header">
        <h2>My Properties</h2>

        <button
          className="add-property-btn"
          onClick={() => navigate("/add-property")}
        >
          + Add Property
        </button>
      </div>

      {properties.length === 0 && (
        <p className="no-properties">No properties found.</p>
      )}

      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            isOwnerView={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Dashboard;