// import { useEffect, useState } from "react";
// import { getAllProperties } from "../services/propertyService";

// export default function Home() {
//   const [properties, setProperties] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const limit = 7;

//   const fetchProperties = async () => {
//     try {
//       const res = await getAllProperties(page, limit);
//       console.log('properties are '+JSON.stringify(res));
//       setProperties(res?.data || []);
//       setTotalPages(res?.pagination?.totalPages || 1);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchProperties();
//   }, [page]);

//   return (
//     <div>
//       <h1>All Properties</h1>

//       {properties.length === 0 && <p>No properties found.</p>}
//       {properties.map((property) => (
//         <div key={property._id}>
//           <h3>{property.title}</h3>
//           <p>{property.description}</p>
//           <p>₹ {property.price}</p>
//         </div>
//       ))}

//       <div style={{ marginTop: 20 }}>
//         <button
//           disabled={page === 1}
//           onClick={() => setPage(page - 1)}
//         >
//           Prev
//         </button>

//         <span style={{ margin: "0 10px" }}>
//           Page {page} of {totalPages}
//         </span>

//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getAllProperties } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const fetchProperties = async () => {
    try {
      const res = await getAllProperties(page, limit);
      setProperties(res?.data || []);
      setTotalPages(res?.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [page]);

  return (
    <div style={{ padding: "30px" }}>
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