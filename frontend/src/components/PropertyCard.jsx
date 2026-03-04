import "./PropertyCard.css";

export default function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <div className="property-card-body">
        <h3 className="property-title">{property.title}</h3>

        <p className="property-description">
          {property.description}
        </p>

        <div className="property-meta">
          <span className="property-price">
            ₹ {property.price.toLocaleString()}
          </span>

          <span className="property-type">
            {property.type.toUpperCase()}
          </span>
        </div>

        <div className="property-location">
          📍 {property.location?.city},{" "}
          {property.location?.state}
        </div>
      </div>
    </div>
  );
}