import {
  createPropertyService,
  getAllPropertiesService,
  getOwnerPropertiesService,
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