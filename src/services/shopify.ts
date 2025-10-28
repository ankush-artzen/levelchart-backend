import Shopify from "shopify-api-node";


// Function to get Product
export const getProductList = async (shopData: Shopify.IPublicShopifyConfig | Shopify.IPrivateShopifyConfig) => {
  try {
    const shopify = new Shopify(shopData);
    const response = await shopify.product.list();
    // console.log("Product response", response);
    return response;
  } catch (error: any) {
    console.error(`Error get Products list for ${shopData?.shopName}:`, error?.message || error);
    throw error;
  }
};

export const getProductCount = async (shopData: Shopify.IPublicShopifyConfig | Shopify.IPrivateShopifyConfig) => {
  try {
    const shopify = new Shopify(shopData);
    const response = await shopify.product.count();
    // console.log("Product response", response);
    return response;
  } catch (error: any) {
    console.error(`Error get Product count for ${shopData?.shopName}:`, error?.message || error);
    throw error;
  }
};

export const getOrderList = async (shopData: Shopify.IPublicShopifyConfig | Shopify.IPrivateShopifyConfig) => {
  try {
    const shopify = new Shopify(shopData);
    const response = await shopify.order.list();
    // console.log("Product response", response);
    return response;
  } catch (error: any) {
    console.error(`Error get orders for ${shopData?.shopName}:`, error?.message || error);
    throw error;
  }
};

export const getOrderCount = async (shopData: Shopify.IPublicShopifyConfig | Shopify.IPrivateShopifyConfig) => {
  try {
    const shopify = new Shopify(shopData);
    const response = await shopify.order.count();
    // console.log("Product response", response);
    return response;
  } catch (error: any) {
    console.error(`Error get order count for shop ${shopData?.shopName}:`, error?.message || error);
    throw error;
  }
};
