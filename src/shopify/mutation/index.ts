import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
import { Shopify_App_Version } from "../../config/constant";
const SHOPIFY_APP_VERSION_2024_10 = Shopify_App_Version

export const updateQuantity = async(data:any) => {
  try {
    const {
      shopName,
      accessToken,
      locationId,
      adjustQuantity,
      inventoryItemId,
    } = data;

    console.log(data, "***********update qunatity payload***********");
    const shopifyGraphqlEndpoint = `https://${shopName}/admin/api/${SHOPIFY_APP_VERSION_2024_10}/graphql.json`;

    const mutation = `
      mutation inventoryAdjustQuantities($input: InventoryAdjustQuantitiesInput!) {
        inventoryAdjustQuantities(input: $input) {
          userErrors {
            field
            message
          }
          inventoryAdjustmentGroup {
            createdAt
            reason
            referenceDocumentUri
            changes {
              name
              delta
            }
          }
        }
      }
          `;
    const variables = {
      input: {
        reason: "correction",
        name: "available",
        changes: [
          {
            delta: adjustQuantity,
            inventoryItemId: inventoryItemId,
            locationId,
          },
        ],
      },
    };

    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };
    // console.log("shopifyGraphqlEndpoint", shopifyGraphqlEndpoint);
    console.log("query", JSON.stringify(mutation), variables);

    return axios
      .post(shopifyGraphqlEndpoint, { query: mutation, variables }, { headers })
      .then((response) => {
        const responseData = response.data;
        console.log("Updated Quantity:", JSON.stringify(responseData));
        return responseData;
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        throw error.response ? error.response.data : error.message;
      });
  } catch (error:any) {
    console.error(
      "Error 132:",error.message
    );
    throw error;
  }
};

export const updateCustomer = async(data:any) => {
  try {
    const { shopName, accessToken, customerId, TAGS } = data;
    const shopifyGraphqlEndpoint = `https://${shopName}/admin/api/${SHOPIFY_APP_VERSION_2024_10}/graphql.json`;
    const mutation = `
      mutation customerUpdate($input: CustomerInput!) {
        customerUpdate(input: $input) {
            customer {
            id
            displayName
            tags
            productSubscriberStatus
            paymentMethods(first:10){
                edges{
                    node{
                        id
                    }
                }
            }
            }
            userErrors {
            field
            message
            }
        }
        }
          `;
    const variables = {
      input: {
        id: customerId,
        tags: TAGS,
      },
    };

    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };
    // console.log("shopifyGraphqlEndpoint", shopifyGraphqlEndpoint);
    // console.log("query", JSON.stringify(mutation), variables);

    return axios
      .post(shopifyGraphqlEndpoint, { query: mutation, variables }, { headers })
      .then((response) => {
        const responseData = response.data;
        console.log(
          "Updated customer******8888:",
          JSON.stringify(responseData)
        );
        return responseData;
      })
      .catch((error:any) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        throw error.response ? error.response.data : error.message;
      });
  } catch (error:any) {
    console.error(
      "Error 132:", error.message
    );
    throw error;
  }
};

export const addInventoryQuantity = async (data:any) => {
  try {
    const {
      shopName,
      accessToken,
      inventoryItemId,
      adjustQuantity,
      locationId,
    } = data;

    const shopifyGraphqlEndpoint = `https://${shopName}/admin/api/${SHOPIFY_APP_VERSION_2024_10}/graphql.json`;

    const mutation = `
      mutation ActivateInventoryItem($inventoryItemId: ID!, $locationId: ID!, $available: Int) {
        inventoryActivate(inventoryItemId: $inventoryItemId, locationId: $locationId, available: $available) {
          inventoryLevel {
            id
            quantities(names: ["available"]) {
              name
              quantity
            }
            item {
              id
            }
            location {
              id
              name
            }
          }
        }
      }
    `;

    const variables = {
      inventoryItemId,
      locationId,
      available: adjustQuantity,
    };

    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };

    try {
      const response = await axios
        .post(shopifyGraphqlEndpoint, { query: mutation, variables }, { headers });
      const responseData = response.data;
      if (responseData.errors) {
        throw new Error(responseData.errors.map((e:any) => e.message).join(", "));
      }
      return responseData.data;
    } catch (error:any) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      throw error.response ? error.response.data : error.message;
    }
  } catch (error:any) {
    console.error(
      "Error 132:",error.message
    );
    throw error;
  }
};

export const createProduct = async (data:any) => {
  try {
    const {
      shopName,
      accessToken,
      productTitle,
      productType,
      price,
      sku,
      vendor,
    } = data;
    const shopifyGraphqlEndpoint = `https://${shopName}/admin/api/${SHOPIFY_APP_VERSION_2024_10}/graphql.json`;
    const mutation = `
      mutation productCreate($input: SellingPlanGroupInput!) {
        productCreate(input: $input) {
          product {
            id
            title
          }
          userErrors {
            code
            field
            message
          }
        }
      }
      `;

    const variables = {
      input: {
        title: productTitle,
        productType: productType,
        vendor: vendor,
        variants: [
          {
            price: price,
            sku: sku,
          },
        ],
      },
    };
    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };
    // console.log("shopifyGraphqlEndpoint", shopifyGraphqlEndpoint);
    // console.log("query", JSON.stringify(mutation), variables);

    try {
      const response = await axios
        .post(shopifyGraphqlEndpoint, { query: mutation, variables }, { headers });
      const responseData = response.data;
      return responseData;
    } catch (error:any) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      throw error.response ? error.response.data : error.message;
    }
  } catch (error:any) {
    console.error(
      "Error createProduct:",error.message
    );
    throw error;
  }
};

export const segmentCreate = async (data:any) => {
  try {
    const { shopName, accessToken, segmentName, tags } = data;
    const shopifyGraphqlEndpoint = `https://${shopName}/admin/api/${SHOPIFY_APP_VERSION_2024_10}/graphql.json`;
    const mutation = `
      mutation segmentCreate($name: String!, $query: String!) {
        segmentCreate(name: $name, query: $query) {
          segment {
            id
            name
            query
          }
          userErrors {
            field
            message
          }
        }
      } 
          `;

    const variables = {
      name: segmentName,
      query: `customer_tags CONTAINS '${tags}' `,
    };

    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };
    console.log("shopifyGraphqlEndpoint", shopifyGraphqlEndpoint);
    console.log("query", JSON.stringify({ query: mutation, variables }));

    try {
      const response = await axios
        .post(shopifyGraphqlEndpoint, { query: mutation, variables }, { headers });
      console.log("response?.data", response?.data);
      const responseData = response?.data?.data?.segmentCreate.segment;
      return responseData;
    } catch (error:any) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      throw error.response ? error.response.data : error.message;
    }
  } catch (error:any) {
    console.error(
      "Error 132:", error.message
    );
    throw error;
  }
};

export const segmentUpdate = async (data:any) => {
  try {
    const { shopName, accessToken, segmentName, tags, segmentId } = data;
    const shopifyGraphqlEndpoint = `https://${shopName}/admin/api/${SHOPIFY_APP_VERSION_2024_10}/graphql.json`;
    const mutation = `
      mutation segmentUpdate($id: ID!, $name: String!, $query: String!) {
        segmentUpdate(id: $id, name: $name, query: $query) {
          segment {
            id
            name
            query
          }
          userErrors {
            field
            message
          }
        }
      }
          `;

    const variables = {
      id: segmentId,
      name: segmentName,
      query: `customer_tags CONTAINS '${tags}' `,
    };

    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };
    console.log("shopifyGraphqlEndpoint", shopifyGraphqlEndpoint);
    console.log("query", JSON.stringify({ query: mutation, variables }));

    try {
      const response = await axios
        .post(shopifyGraphqlEndpoint, { query: mutation, variables }, { headers });
      const responseData = response?.data?.data?.segmentUpdate.segment;
      return responseData;
    } catch (error:any) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      throw error.response ? error.response.data : error.message;
    }
  } catch (error:any) {
    console.error(
      "Error 132:", error.message
    );
    throw error;
  }
};
