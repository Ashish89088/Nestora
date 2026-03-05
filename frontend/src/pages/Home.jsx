import { useEffect, useState } from "react";
import { getAllProperties } from "../services/propertyService";
import { getCurrentUser } from "../services/authService";
import PropertyCard from "../components/PropertyCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const limit = 10;

  useEffect(() => {
    fetchProperties();
    fetchUser();
  }, [page]);

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

  const fetchProperties = async () => {
    try {
      const res = await getAllProperties(page, limit);
      setProperties(res?.data || []);
      setTotalPages(res?.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      {/* Show Username */}
      {user && (
        <h2 style={{ marginBottom: "10px" }}>
          Welcome, {user.name}
        </h2>
      )}

      <h1>All Properties</h1>

      {properties.length === 0 && <p>No properties found.</p>}

      {/* Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: 30 }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}