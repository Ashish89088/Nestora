// import { useEffect, useState } from "react";
// import { getOwnerProperties } from "../services/propertyService";

// function Dashboard() {
//   const [properties, setProperties] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(5); // Number of properties per page
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchOwnerProperties(page);
//   }, [page]);

//   const fetchOwnerProperties = async (page) => {
//     try {
//       const res = await getOwnerProperties(page, limit);

//       // Assuming backend returns { data: [...], totalPages: n }
//       setProperties(res.data || res); // adjust if your backend wraps data differently
//       if (res.totalPages) setTotalPages(res.totalPages);
//     } catch (error) {
//       console.error(error);
//       alert("Unauthorized or failed to fetch properties");
//     }
//   };

//   const handlePrev = () => {
//     if (page > 1) setPage(page - 1);
//   };

//   const handleNext = () => {
//     if (page < totalPages) setPage(page + 1);
//   };

//   return (
//     <div>
//       <h2>My Properties</h2>

//       {properties.length === 0 && <p>No properties found.</p>}

//       {properties.map((p) => (
//         <div
//           key={p._id}
//           style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
//         >
//           <h3>{p.title}</h3>
//           <p>Price: ${p.price}</p>
//         </div>
//       ))}

//       {/* Pagination Controls */}
//       <div style={{ marginTop: "20px" }}>
//         <button onClick={handlePrev} disabled={page === 1}>
//           Prev
//         </button>
//         <span style={{ margin: "0 10px" }}>
//           Page {page} of {totalPages}
//         </span>
//         <button onClick={handleNext} disabled={page === totalPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getOwnerProperties } from "../services/propertyService";

// function Dashboard() {
//   const navigate = useNavigate();

//   const [properties, setProperties] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(5);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchOwnerProperties(page);
//   }, [page]);

//   const fetchOwnerProperties = async (page) => {
//     try {
//       const res = await getOwnerProperties(page, limit);

//       setProperties(res.data || res);
//       if (res.totalPages) setTotalPages(res.totalPages);
//     } catch (error) {
//       console.error(error);
//       alert("Unauthorized or failed to fetch properties");
//     }
//   };

//   const handlePrev = () => {
//     if (page > 1) setPage(page - 1);
//   };

//   const handleNext = () => {
//     if (page < totalPages) setPage(page + 1);
//   };

//   return (
//     <div>
//       <h2>My Properties</h2>

//       {/* ✅ Add Property Button */}
//       <button onClick={() => navigate("/add-property")}>
//         Add Property
//       </button>

//       {properties.length === 0 && <p>No properties found.</p>}

//       {properties.map((p) => (
//         <div
//           key={p._id}
//           style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
//         >
//           <h3>{p.title}</h3>
//           <p>Price: ${p.price}</p>
//         </div>
//       ))}

//       {/* Pagination */}
//       <div style={{ marginTop: "20px" }}>
//         <button onClick={handlePrev} disabled={page === 1}>
//           Prev
//         </button>
//         <span style={{ margin: "0 10px" }}>
//           Page {page} of {totalPages}
//         </span>
//         <button onClick={handleNext} disabled={page === totalPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOwnerProperties } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOwnerProperties(page);
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

  return (
    <div className="dashboard-container">
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
          <PropertyCard key={property._id} property={property} />
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