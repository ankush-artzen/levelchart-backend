import { logError } from "./logger"
import models from "../models";

const {ProductsSync}  = models;

// Function to save data
export async function saveProductSyncData(productData: any) {
  // Process the product variants and flatten the structure
  const processedVariants = productData.variants.edges.map((variantEdge: any) => {
    const variantNode = variantEdge.node;
    
    const processedInventoryLevels = variantNode.inventoryItem.inventoryLevels.edges.map((levelEdge: any) => {
      const levelNode = levelEdge.node;
      return {
        id: levelNode.id,
        quantities: levelNode.quantities.map((quantity: any) => ({
          id: quantity.id,
          quantity: quantity.quantity,
        })),
        location: {
          id: levelNode.location.id,
          name: levelNode.location.name,
        },
      };
    });

    return {
      id: variantNode.id,
      title: variantNode.title,
      legacyResourceId: variantNode.legacyResourceId,
      inventoryQuantity: variantNode.inventoryQuantity,
      inventoryItem: {
        id: variantNode.inventoryItem.id,
        inventoryLevels: processedInventoryLevels,
      },
    };
  });

  const processedProduct = {
    id: productData.id,
    legacyResourceId: productData.legacyResourceId,
    title: productData.title,
    handle: productData.handle,
    variants: processedVariants,
  };

  try {
    // Create a new product document and save it
    const product = new ProductsSync(processedProduct);
    await product.save();
    console.log('Product saved successfully');
  } catch (error:any) {
    logError("Product Sync Update error:", error?.message);
    console.error('Product Sync Update error:', error);
  }
}

// Function to save multiple products
export async function saveMultipleProductsSyncData(productsData: any[]) {
  const processedProducts = productsData.map((productData: any) => {
    console.log("productData",productData)
    const {variants, legacyResourceId, title, handle, id}= productData.node
    const processedVariants = variants.edges.map((variantEdge: any) => {
      const variantNode = variantEdge.node;

      const processedInventoryLevels = variantNode.inventoryItem.inventoryLevels.edges.map((levelEdge: any) => {
        const levelNode = levelEdge.node;
        return {
          id: levelNode.id,
          quantities: levelNode.quantities.map((quantity: any) => ({
            id: quantity.id,
            quantity: quantity.quantity,
          })),
          location: {
            id: levelNode.location.id,
            name: levelNode.location.name,
          },
        };
      });

      return {
        id: variantNode.id,
        title: variantNode.title,
        legacyResourceId: variantNode.legacyResourceId,
        inventoryQuantity: variantNode.inventoryQuantity,
        inventoryItem: {
          id: variantNode.inventoryItem.id,
          inventoryLevels: processedInventoryLevels,
        },
      };
    });

    return {
      id: id,
      legacyResourceId: legacyResourceId,
      title: title,
      handle: handle,
      variants: processedVariants,
    };
  });

  try {
    // Insert multiple products at once
    await ProductsSync.insertMany(processedProducts);
    console.log('Products saved successfully');
  } catch (error: any) {
    logError("Product Sync Update error:", error?.message);
    console.error('Product Sync Update error:', error);
  }
}
