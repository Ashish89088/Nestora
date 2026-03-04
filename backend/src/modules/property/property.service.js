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

  // const properties = await Property.find({ isActive: true })
  //   .skip(skip)
  //   .limit(limit)
  //   .lean();

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

  // return properties;
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