import Property from "./property.model.js";

export const createPropertyService = async (data, ownerId) => {
  const property = await Property.create({
    ...data,
    ownerId,
  });

  return property;
};

export const getAllPropertiesService = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [properties, total] = await Promise.all([
    Property.find({ isActive: true })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean(),
    Property.countDocuments({ isActive: true }),
  ]);

  return {
    data: properties,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getOwnerPropertiesService = async (
  ownerId,
  page = 1,
  limit = 10
) => {
  const skip = (page - 1) * limit;

  const [properties, total] = await Promise.all([
    Property.find({ ownerId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean(),
    Property.countDocuments({ ownerId }),
  ]);

  return {
    data: properties,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// UPDATE
export const updatePropertyService = async (id, data, ownerId) => {
  const property = await Property.findOneAndUpdate(
    { _id: id, ownerId }, // ensures only owner can update
    data,
    { new: true }
  );

  return property;
};

// DELETE
export const deletePropertyService = async (id, ownerId) => {
  const property = await Property.findOneAndDelete({
    _id: id,
    ownerId, // ensures only owner can delete
  });

  return property;
};