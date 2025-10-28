import models from "../models";
import { StoreAccessProps } from "../types/shopify";
import { getOrderCount, getProductCount } from "../services/shopify"
import { getProduct, getOrders } from "../shopify/queries"
import { fetchLimit, maxFetchOrderLimit, maxFetchProductLimit } from "../config/constant";
import { saveMultipleProductsSyncData } from "./productSyncDataService";

import { logInfo } from "./logger";
import { saveMultipleOrdersSyncData } from "./orderDataSyncServices";
const { OrderUpdate, ProductUpdate } = models;

export async function orderSync({ shop, accessToken }: StoreAccessProps) {
  try {
    const orderUpdate = await OrderUpdate.findOne({ store: shop })

    if (orderUpdate && !orderUpdate?.hasNextPage) {
      logInfo("Order Sync", `Completed ${shop}`)
      return
    }

    const orderCount = orderUpdate?.orderCount || 0;
    logInfo("Order Sync Started", `Completed ${orderCount} for ${shop}`)
    const totalCount = await getOrderCount({ shopName: shop, accessToken });
    console.log("totalCount", totalCount)

    const maxFetchLimit = totalCount > maxFetchOrderLimit ? maxFetchOrderLimit : totalCount

    if (orderCount >= maxFetchLimit) {
      console.log("Store Order sync already complete")
      return
    }

    let after = orderUpdate?.hasNextPage ? orderUpdate?.nextPageToken : null;
    const limit = fetchLimit;
    const ordersResponse = await getOrders({ shopName: shop, accessToken, first: limit, after });
    const { edges, pageInfo } = ordersResponse;
    console.log("response order", pageInfo, edges)
    await saveMultipleOrdersSyncData(edges, shop)
    after = pageInfo.hasNextPage ? pageInfo.endCursor : null;
    const orderSync = await OrderUpdate.findOneAndUpdate(
      { store: shop },
      {
        store: shop,
        nextPageToken: after,
        hasNextPage: pageInfo.hasNextPage,
        orderCount: orderCount + edges?.length,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    );
    console.log(orderSync, "orderSync")
  } catch (error: any) {
    console.log("cron error", error);
    return error?.message || "Something went wrong";
  }
}

export async function productSync({ shop, accessToken }: StoreAccessProps) {
  try {
    const productUpdate = await ProductUpdate.findOne({ store: shop })

    if (productUpdate && !productUpdate?.hasNextPage) {
      logInfo("Product Sync", `Completed ${shop}`)
      return
    }

    logInfo("Product Sync Started", `Completed ${productUpdate?.productCount} for ${shop}`)
    const totalCount = await getProductCount({ shopName: shop, accessToken });
    console.log("totalCount", totalCount)
    const productCount = productUpdate?.productCount || 0;
    const maxFetchLimit = totalCount > maxFetchProductLimit ? maxFetchProductLimit : totalCount

    if (productCount >= maxFetchLimit) {
      console.log("Store Product sync already complete")
      return
    }

    let after = productUpdate?.hasNextPage ? productUpdate?.nextPageToken : null;
    const limit = fetchLimit;
    const response = await getProduct({ shopName: shop, accessToken, first: limit, after });

    const { edges, pageInfo } = response;
    after = pageInfo.hasNextPage ? pageInfo.endCursor : null;
    // pass data to integration
    // code
    console.log("response product", pageInfo, edges)
    await saveMultipleProductsSyncData(edges)
    const productSync = await ProductUpdate.findOneAndUpdate(
      { store: shop },
      {
        store: shop,
        nextPageToken: after,
        hasNextPage: pageInfo.hasNextPage,
        productCount: productCount + edges?.length,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    );

    console.log('Product Sync:', productSync);
  } catch (error: any) {
    console.log("cron error", error);
    return error?.message || "Something went wrong";
  }
}