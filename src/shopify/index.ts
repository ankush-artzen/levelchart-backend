import {
  getProduct,
  getLocation,
  getLocationById,
  getInventory,
  getVariant,
  getCustomerById,
  getVariantQuantity,
  getProductByTitleRegex
} from "./queries";
import {
  addInventoryQuantity,
  updateQuantity,
  updateCustomer,
  createProduct,
} from "./mutation";

export default {
  // queries
  getProduct,
  getLocation,
  getLocationById,
  getInventory,
  getVariant,
  getCustomerById,
  getVariantQuantity,
  getProductByTitleRegex,
  // mutation
  addInventoryQuantity,
  updateQuantity,
  updateCustomer,
  createProduct,
};
