// import "./PropertyCard.css";

// export default function PropertyCard({ property }) {
//   return (
//     <div className="property-card">
//       <div className="property-card-body">
//         <h3 className="property-title">{property.title}</h3>

//         <p className="property-description">
//           {property.description}
//         </p>

//         <div className="property-meta">
//           <span className="property-price">
//             ₹ {property.price.toLocaleString()}
//           </span>

//           <span className="property-type">
//             {property.type.toUpperCase()}
//           </span>
//         </div>

//         <div className="property-location">
//           📍 {property.location?.city},{" "}
//           {property.location?.state}
//         </div>
//       </div>
//     </div>
//   );
// }

import "./PropertyCard.css";

function PropertyCard({ property, isOwnerView, onEdit, onDelete }) {
  return (
    <div className="property-card">
      <h3>{property.title}</h3>
      <p className="property-price">₹ {property.price}</p>
      <p className="property-description">
        {property.description}
      </p>

      <p className="property-location">
        {property.location?.city}, {property.location?.state}
      </p>

      {/* ✅ Show buttons only if owner view */}
      {isOwnerView && (
        <div className="property-actions">
          <button
            className="edit-btn"
            onClick={() => onEdit(property)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(property._id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default PropertyCard;