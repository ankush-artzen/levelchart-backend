import { logError } from "./logger"
import models from "../models";

const { OrdersSync } = models;

// Function to process and save order data
export async function saveOrderData(orderData: any, shop: string) {
  try {
    // Remove `edges` and `node` keys from line items
    const processedLineItems = orderData.lineItems.edges.map((edge: any) => {
      const { title, quantity, variantTitle, variant } = edge.node;
      return { title, quantity, variantTitle, variant };
    });

    // Prepare processed order data
    const processedOrder = {
      id: orderData.id,
      name: orderData.name,
      customer: orderData.customer,
      totalPrice: orderData.totalPrice,
      lineItems: processedLineItems, // Replace edges with processed array
      shippingLine: orderData.shippingLine,
      taxExempt: orderData.taxExempt,
      taxLines: orderData.taxLines,
      shop
    };

    // Save to the database
    const newOrder = new OrdersSync(processedOrder);
    await newOrder.save();

    console.log("Order saved successfully");
  } catch (error: any) {
    logError("Order Sync Error:", error?.message);
    console.error("Order Sync Error:", error);
  }
}

// Function to save multiple products
export async function saveMultipleOrdersSyncData(orderData: any[], shop: string) {
  const processedOrders = orderData.map((orderData: any) => {
    console.log("order", orderData)
    const { name, customer, totalPrice, shippingLine, lineItems, taxExempt, taxLines, id, legacyResourceId } = orderData.node
    const processedLineItems = lineItems.edges.map((edge: any) => {
      const { title, quantity, variantTitle, variant } = edge.node;
      return { title, quantity, variantTitle, variant };
    });

    // Prepare processed order data
    return {
      id: id,
      legacyResourceId,
      name: name,
      customer: customer,
      totalPrice: totalPrice,
      lineItems: processedLineItems, // Replace edges with processed array
      shippingLine: shippingLine,
      taxExempt: taxExempt,
      taxLines: taxLines,
      shop
    };
  });

  console.log(JSON.stringify(processedOrders), "processedOrders")

  try {
    // Insert multiple orders at once
    await OrdersSync.insertMany(processedOrders);
    console.log('Orders saved successfully');
  } catch (error: any) {
    logError("Orders Sync Update error:", error?.message);
    console.error('Orders Sync Update error:', error);
    throw new Error(error?.message || `Orders Sync Update error`)
  }
}

