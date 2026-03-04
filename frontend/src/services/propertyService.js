import api from "./api"; 

export const getAllProperties = async (page = 1, limit = 10) => {
  const response = await api.get("/properties", {
    params: { page, limit },
  });

  return response.data; 
}


export const getOwnerProperties = async (page = 1, limit = 5) => {
  const token = localStorage.getItem("token"); // Get JWT

  const response = await api.get("/properties/owner/my", {
    params: { page, limit },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data; // returns the backend response
};

// export const createProperty = async (propertyData) => {
//   const response = await api.post("/properties", propertyData);
//   return response.data;
// };

export const deleteProperty = async (propertyId) => {
  const response = await api.delete(`/properties/${propertyId}`);
  return response.data;
};


export const createProperty = async (data) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/properties", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};