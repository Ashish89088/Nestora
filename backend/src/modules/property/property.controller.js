import {
  createPropertyService,
  getAllPropertiesService,
  getOwnerPropertiesService,
  updatePropertyService,
  deletePropertyService
} from "./property.service.js";

export const createProperty = async (req, res, next) => {
  try {
    const property = await createPropertyService(
      req.body,
      req.user.id
    );

    res.status(201).json(property);
  } catch (err) {
    next(err);
  }
};

export const getAllProperties = async (req, res, next) => {
  try {
    
    const { page = 1, limit = 10 } = req.query;

    const properties = await getAllPropertiesService(
      Number(page),
      Number(limit)
    );

    
    res.json({
      success: true,
      ...properties,
    });
  } catch (err) {
    next(err);
  }
};

export const getOwnerProperties = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await getOwnerPropertiesService(
      req.user.id,
      Number(page),
      Number(limit)
    );

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE PROPERTY
export const updateProperty = async (req, res, next) => {
  try {
    const property = await updatePropertyService(
      req.params.id,
      req.body,
      req.user.id // comes from auth middleware
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      ...property,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE PROPERTY
export const deleteProperty = async (req, res, next) => {
  try {
    const property = await deletePropertyService(
      req.params.id,
      req.user.id
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};