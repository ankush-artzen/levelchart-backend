import cron from "node-cron";
import StoreSetting from "../models/storeSetting";
import StoreSession from "../models/storeSession";
import { productSync, orderSync } from "../services/cronServices";
import { isEncryptedData, decrypt } from "../utils/encryption";

const storeDataSync = async () => {
  try {
    console.log("storeDataSync", new Date());
    const stores = await StoreSetting.find();
    if (!stores || !stores?.length) {
      console.log("No stores found");
      return;
    }
    stores.map(async (store: any) => {
      try {
        if (!store?.isActive) {
          return;
        }
        const storeDetail: any = await StoreSession.findOne({ shop: store?.shop });
        if (!storeDetail) {
          console.log("Store not found");
          return;
        }
        console.log("storeDetail", storeDetail);
        const { shop, accessToken } = storeDetail;

        // Decrypt the access token if it's encrypted
        let decryptedToken = accessToken;
        if (isEncryptedData(accessToken)) {
          try {
            decryptedToken = decrypt(accessToken);
          } catch (error) {
            console.error("Failed to decrypt token for shop:", shop);
            return;
          }
        }

       // await productSync({ shop, accessToken: decryptedToken });
        await orderSync({ shop, accessToken: decryptedToken });
      } catch (error) {
        console.error("Error processing store:", error);
      }
    });
  } catch (error) {
    console.log("Cron Data sync error", error);
  }
};

export const scheduler = () => {
  const every10sec = "*/10 * * * *"; // every 10 seconds for testing
  const everyMin = "*/1 * * * *"; // every min
  const everyday3am = "0 0 3 * * *"; // every day at 1 am
  const everyday6am = "0 0 6 * * *"; // every day at 6 am
  const everyday10am = "0 0 10 * * *"; // every day at 10 am
  const everyday12am = "0 0 0 * * *"; // every day at 12 am
  const everyHour = "0 0 */1 * * *"; // every 1 hours
  const everyDayTwice = "0 9,21 * * *"; // every day 9 am and 9 pm

  cron.schedule(everyMin, storeDataSync);
};