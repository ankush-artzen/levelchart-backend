import axios from "axios";
import { Shopify_App_Version } from "../../config/constant";
const SHOPIFY_APP_VERSION_2024_10 = Shopify_App_Version

export const getVariantQuantity = async (data:any) => {
  try {
    const { shopName, accessToken, inventoryItemId } = data;
    const shopifyGraphqlEndpoint = `https://${shopName}/admin/api/${SHOPIFY_APP_VERSION_2024_10}/graphql.json`;

    // GraphQL Query to fetch inventory item quantities and locations
    const query = `
      query GetInventoryItem($inventoryItemId: ID!) {
        inventoryItem(id: $inventoryItemId) {
          id
          inventoryLevels(first: 10) {
            edges {
              node {
                id
                quantities(names:"available"){
                  id
                  quantity
                }
                location {
                  id
                  name
                }
              }
            }
          }
        }
      }
    `;

    // Query Variables
    const variables = {
      inventoryItemId: inventoryItemId.startsWith(
        "gid://shopify/InventoryItem/"
      )
        ? inventoryItemId
        : `gid://shopify/InventoryItem/${inventoryItemId}`,
    };

    // Headers for Shopify GraphQL API
    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };

    // API Request using axios
    const response = await axios.post(
      shopifyGraphqlEndpoint,
      { query, variables },
      { headers }
    );

    console.log(response.data, "response.data");

    // Extract and return data
    const inventoryItem = response.data?.data?.inventoryItem;
    if (!inventoryItem) {
      throw new Error("Inventory item not found or API returned an error.");
    }
    return inventoryItem;
  } catch (error:any) {
    console.error(
      "Error fetching inventory item:",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : error.message;
  }
};

export const getLocation = async (data:any) => {
  const { shopName, accessToken } = data;
  try {
    const shopifyGraphqlEndpoint = `https://${shopName}/admin/api/${SHOPIFY_APP_VERSION_2024_10}/graphql.json`;

    // GraphQL Query to fetch locations and their inventory levels
    const query = `
      query GetLocations {
        locations(first: 10) {
          edges {
            node {
              id
              name
              address {
                address1
                city
                country
              }
              inventoryLevels(first: 5) {
                edges {
                  node {
                    id
                    quantities(names:"available"){
                      id
                      quantity
                  }
                  }
                }
              }
            }
          }
        }
      }
    `;

    // Headers for Shopify GraphQL API
    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };

    // API Request using axios
    const response = await axios.post(
      shopifyGraphqlEndpoint,
      { query },
      { headers }
    );

    // Extract location data
    const locations = response.data?.data?.locations?.edges?.map(
      (edge:any) => edge.node
    );

    if (!locations) {
      throw new Error("No locations found or API returned an error.");
    }

    return locations;
  } catch (error:any) {
    console.log(
      "Error fetching locations:",
      shopName,
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : error.message;
  }
};

export const getLocationById = async (data:any) => {
  try {
    const { shopName, accessToken, locationId } = data;

    // Shopify GraphQL endpoint with latest API version
    const shopifyGraphqlEndpoint = `https://${shopName}/admin/api/${SHOPIFY_APP_VERSION_2024_10}/graphql.json`;

    // GraphQL Query to fetch location details by ID
    const query = `
      query GetLocation($locationId: ID!) {
        location(id: $locationId) {
          id
          name
          address {
            address1
            address2
            city
            province
            country
            zip
          }
        }
      }
    `;

    // Query Variables
    const variables = {
      locationId: `gid://shopify/Location/${locationId}`,
    };

    // Headers for Shopify GraphQL API
    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };

    // API Request using axios
    const response = await axios.post(
      shopifyGraphqlEndpoint,
      { query, variables },
      { headers }
    );

    // Extract location data
    const location = response.data?.data?.location;
    if (!location) {
      throw new Error("Location not found or API returned an error.");
    }

    return location;
  } catch (error:any) {
    console.error(
      "Error fetching location by ID:",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : error.message;
  }
};

export const getVariant = async (data:any) => {
  try {
    const { shopName, accessToken, variant } = data;
    console.log(shopName, accessToken, variant);
    // Shopify GraphQL endpoint with the latest API version
    const shopifyGraphqlEndpoint = `https://${shopName}/admin/api/${SHOPIFY_APP_VERSION_2024_10}/graphql.json`;

    // GraphQL query to fetch product variant details
    const query = `
      query GetProductVariant($variantId: ID!) {
        productVariant(id: $variantId) {
          id
          title
          displayName
          createdAt
          price
          compareAtPrice
          inventoryQuantity
          availableForSale
          inventoryItem {
            id
          }
          product {
            id
            title
          }
        }
      }
    `;

    // Query variables for dynamic input
    const variables = {
      variantId: `gid://shopify/ProductVariant/${variant}`,
    };

    // Headers for the Shopify GraphQL API
    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };

    // API request using axios
    const response = await axios.post(
      shopifyGraphqlEndpoint,
      { query, variables },
      { headers }
    );
    console.log(response.data);
    if (response.data?.error) {
      throw new Error(response.data.error || "API returned an error");
    }
    // Extract product variant details
    const productVariant = response.data?.data?.productVariant;
    if (!productVariant) {
      throw new Error("Product variant not found or API returned an error.");
    }

    return productVariant;
  } catch (error:any) {
    console.error(
      "Error fetching product variant:",
      error,
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : error.message;
  }
};

export const getProduct = async (data:any) => {
  try {
    const { shopName, accessToken, first = 10, after = null } = data;

    // Shopify GraphQL endpoint with the latest API version
    const shopifyGraphqlEndpoint = `https://${shopName}/admin/api/${SHOPIFY_APP_VERSION_2024_10}/graphql.json`;

    // GraphQL query with variables
    const query = `
      query GetProducts($first: Int!, $after: String) {
        products(first: $first, after: $after) {
          edges {
            node {
              id
              legacyResourceId
              title
              handle
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    legacyResourceId
                    inventoryQuantity
                    inventoryItem {
                      id
                      inventoryLevels(first: 10) {
                        edges {
                          node {
                            id
                            quantities(names:"available"){
                              id
                              quantity
                            }
                            location {
                              id
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    // Variables for dynamic input
    const variables = {
      first,
      after,
    };

    // Headers for the Shopify GraphQL API
    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };

    // API request using axios
    const response = await axios.post(
      shopifyGraphqlEndpoint,
      { query, variables },
      { headers }
    );
console.log("response******",response.data)
    // Extract products data
    const products = response.data?.data?.products;
    if (!products) {
      throw new Error("No products found or API returned an error.");
    }

    return products;
  } catch (error:any) {
    console.error(
      "Error fetching products:",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : error.message;
  }
};

export const getProductByTitleRegex = async (data:any) => {
  try {
    const { shopName, accessToken, title } = data;

    // Shopify GraphQL endpoint with the latest API version
    const shopifyGraphqlEndpoint = `https://${shopName}/admin/api/${SHOPIFY_APP_VERSION_2024_10}/graphql.json`;

    // GraphQL query with a search query for product titles
    const graphqlQuery = `
      query GetProductsByTitle($query: String!) {
        products(first: 100, query: $query) {
          edges {
            node {
              id
              title
              legacyResourceId
              featuredImage {
                id
                url
              }
              variants(first: 100) {
                edges {
                  node {
                    id
                    legacyResourceId
                    title
                  }
                }
              }
            }
          }
        }
      }
    `;

    // Variables for dynamic input
    const variables = {
      query: `title:*${title}*`, // Match title using wildcard search
    };

    // Headers for the Shopify GraphQL API
    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };

    // Make the API request using axios
    const response = await axios.post(
      shopifyGraphqlEndpoint,
      { query: graphqlQuery, variables },
      { headers }
    );

    // Extract product edges
    const productEdges = response?.data?.data?.products?.edges;
    if (!productEdges) {
      throw new Error("No products found matching the title query.");
    }

    return productEdges;
  } catch (error:any) {
    console.error(
      "Error fetching products by title:",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : error.message;
  }
};

export const getInventory = async (data:any) => {
  try {
    const { shopName, accessToken, inventoryItemId } = data;
    const shopifyGraphqlEndpoint = `https://${shopName}/admin/api/${SHOPIFY_APP_VERSION_2024_10}/graphql.json`;
    const graphqlQuery = `
        {
          inventoryItem(id: "gid://shopify/InventoryItem/${inventoryItemId}") {
          id
          inventoryLevels(first: 10) {
            edges {
              node {
                id
                quantities(names: ["available", "incoming", "committed", "damaged", "on_hand", "quality_control", "reserved", "safety_stock"]) {
                  name
                  quantity
                  }
                location {
                  id
                  name
                }
              }
            }
          }
        }
        }
      `;

    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };
    // console.log("shopifyGraphqlEndpoint", shopifyGraphqlEndpoint);
    // console.log("query", JSON.stringify(graphqlQuery));

    try {
      const response = await axios
        .post(shopifyGraphqlEndpoint, { query: graphqlQuery }, { headers });
      // console.log("inventoryLevels:", response.data);
      const { inventoryLevels } = response.data.data.inventoryItem;
      return inventoryLevels;
    } catch (error:any) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      throw error.response ? error.response.data : error.message;
    }
  } catch (error:any) {
    console.error(
      "Error inventoryLevels:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getCustomerById = async (data:any) => {
  try {
    const { shopName, accessToken, customerID } = data;

    // Shopify GraphQL endpoint
    const shopifyGraphqlEndpoint = `https://${shopName}/admin/api/${SHOPIFY_APP_VERSION_2024_10}/graphql.json`;

    // GraphQL query for customer details
    const graphqlQuery = `
      query GetCustomer($customerID: ID!) {
        customer(id: $customerID) {
          id
          displayName
          tags
          subscriptionContracts(first: 10) {
            edges {
              node {
                id
                status
                lastPaymentStatus
                customerPaymentMethod {
                  id
                }
                lines(first: 250) {
                  edges {
                    node {
                      title
                      productId
                      variantId
                    }
                  }
                }
              }
            }
          }
          productSubscriberStatus
          paymentMethods(first: 10) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `;

    // GraphQL variables
    const variables = {
      customerID: `gid://shopify/Customer/${customerID}`,
    };

    // Request headers
    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };

    // Make the GraphQL request
    const response = await axios.post(
      shopifyGraphqlEndpoint,
      { query: graphqlQuery, variables },
      { headers }
    );

    // Extracting customer data from response
    const customer = response?.data?.data?.customer;

    if (!customer) {
      throw new Error("Customer not found or invalid customer ID.");
    }

    return customer;
  } catch (error:any) {
    console.error(
      "Error fetching customer by ID:",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : error.message;
  }
};

export const getOrders = async (data: any) => {
  try {
    const { shopName, accessToken, first = 10, after = null } = data;

    // Shopify GraphQL endpoint with the latest API version
    const shopifyGraphqlEndpoint = `https://${shopName}/admin/api/${SHOPIFY_APP_VERSION_2024_10}/graphql.json`;

    // GraphQL query to fetch orders
    const query = `
      query GetOrders($first: Int!, $after: String) {
        orders(first: $first, after: $after) {
          edges {
            node {
              id
              legacyResourceId
              name
              customer {
                id
                firstName
                lastName
                email
              }
              totalPrice
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    variantTitle
                    variant {
                      id
                      title
                      price
                    }
                  }
                }
              }
              shippingLine{
                code
                custom
                deliveryCategory
                title
                price
              }
              taxExempt
              taxLines{
                price
                rate
                ratePercentage
                title
                source
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    // Variables for dynamic input
    const variables = {
      first,
      after,
    };

    // Headers for the Shopify GraphQL API
    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };

    // API request using axios
    const response = await axios.post(
      shopifyGraphqlEndpoint,
      { query, variables },
      { headers }
    );

    // Log the response to inspect the data
    console.log("response******", JSON.stringify(response.data));

    // Extract orders data
    const orders = response.data?.data?.orders;
    if (!orders) {
      throw new Error("No orders found or API returned an error.");
    }

    return orders;
  } catch (error: any) {
    console.error(
      "Error fetching orders:",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : error.message;
  }
};


