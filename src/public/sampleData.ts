

interface InventoryQuantity {
  id: string;
  quantity: number;
}

interface InventoryLevel {
  id: string;
  quantities: InventoryQuantity[];
  location: {
    id: string;
    name: string;
  };
}

interface InventoryItem {
  id: string;
  inventoryLevels: InventoryLevel[];
}

interface ProductVariant {
  id: string;
  title: string;
  legacyResourceId: string;
  inventoryQuantity: number;
  inventoryItem: InventoryItem;
}

interface Product {
  _id: string;
  id: string;
  legacyResourceId: string;
  title: string;
  handle: string;
  variants: ProductVariant[];
}

interface TaxLine {
  price: string;
  rate: number;
  ratePercentage: number;
  title: string;
  source: null;
}

interface ShippingLine {
  code: string;
  custom: boolean;
  deliveryCategory: null;
  title: string;
  price: string;
  _id: string;
}

interface LineItemVariant {
  id: string;
  title: string;
  price: string;
}

interface LineItem {
  title: string;
  quantity: number;
  variantTitle: null;
  variant: LineItemVariant;
  _id: string;
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
}

interface Order {
  _id: string;
  id: string;
  legacyResourceId: string;
  name: string;
  customer: Customer;
  totalPrice: string;
  lineItems: LineItem[];
  shippingLine: ShippingLine;
  taxExempt: boolean;
  taxLines: TaxLine[];
  shop: string;
  __v: number;
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
}

interface PrimaryDomain {
  url: string;
  host: string;
}

interface Plan {
  displayName: string;
  partnerDevelopment: boolean;
  shopifyPlus: boolean;
}

interface BillingAddress {
  address1: null;
  address2: null;
  city: null;
  province: null;
  provinceCode: null;
  country: string;
  countryCode: string;
  zip: null;
}

interface Shop {
  id: string;
  name: string;
  email: string;
  myshopifyDomain: string;
  primaryDomain: PrimaryDomain;
  plan: Plan;
  billingAddress: BillingAddress;
  currencyCode: string;
  weightUnit: string;
  customerAccounts: string;
  shopOwnerName: string;
  ianaTimezone: string;
  timezoneAbbreviation: string;
  timezoneOffset: string;
  enabledPresentmentCurrencies: string[];
  checkoutApiSupported: boolean;
  taxesIncluded: boolean;
  taxShipping: boolean;
}


const productSample: Product[] = [
  {
    _id: "67692fb6196cfda9d346fc4d",
    id: "gid://shopify/Product/6598375866445",
    legacyResourceId: "6598375866445",
    title: "White Cotton Shirt",
    handle: "white-cotton-shirt",
    variants: [
      {
        id: "gid://shopify/ProductVariant/39356008529997",
        title: "Default Title",
        legacyResourceId: "39356008529997",
        inventoryQuantity: 3,
        inventoryItem: {
          id: "gid://shopify/InventoryItem/41451386077261",
          inventoryLevels: [
            {
              id: "gid://shopify/InventoryLevel/14751760461?inventory_item_id=41451386077261",
              quantities: [
                {
                  id: "gid://shopify/InventoryQuantity/14751760461?inventory_item_id=41451386077261&name=available",
                  quantity: 1,
                },
              ],
              location: {
                id: "gid://shopify/Location/15122169933",
                name: "Warehouse",
              },
            },
            {
              id: "gid://shopify/InventoryLevel/100570497101?inventory_item_id=41451386077261",
              quantities: [
                {
                  id: "gid://shopify/InventoryQuantity/100570497101?inventory_item_id=41451386077261&name=available",
                  quantity: 1,
                },
              ],
              location: {
                id: "gid://shopify/Location/66242216013",
                name: "Warehouse 1 pickup",
              },
            },
            {
              id: "gid://shopify/InventoryLevel/100570398797?inventory_item_id=41451386077261",
              quantities: [
                {
                  id: "gid://shopify/InventoryQuantity/100570398797?inventory_item_id=41451386077261&name=available",
                  quantity: 1,
                },
              ],
              location: {
                id: "gid://shopify/Location/66242117709",
                name: "Warehouse 2 Pickups",
              },
            },
          ],
        },
      },
    ],
  },
];

const orderSample: Order[] = [{
  _id: "6834540f5bc6888357663079",
  id: "gid://shopify/Order/6150148587714",
  legacyResourceId: "6150148587714",
  name: "#1001",
  customer: {
    id: "gid://shopify/Customer/7964149153986",
    firstName: "Hollee",
    lastName: "Stark",
    email: "qenodivoz@mailinator.com",
    _id: "6834540f5bc688835766307a",
  },
  totalPrice: "928.42",
  lineItems: [
    {
      title: "The Compare at Price Snowboard",
      quantity: 1,
      variantTitle: null,
      variant: {
        id: "gid://shopify/ProductVariant/45092131307714",
        title: "Default Title",
        price: "785.95",
      },
      _id: "6834540f5bc688835766307b",
    },
  ],
  shippingLine: {
    code: "Standard",
    custom: false,
    deliveryCategory: null,
    title: "Standard",
    price: "1.00",
    _id: "6834540f5bc688835766307c",
  },
  taxExempt: false,
  taxLines: [
    {
      price: "141.47",
      rate: 0.18,
      ratePercentage: 18,
      title: "IGST",
      source: null,
    },
  ],
  shop: "navjot-work.myshopify.com",
  __v: 0,
  createdAt: {
    $date: "2025-05-26T11:44:15.874Z",
  },
  updatedAt: {
    $date: "2025-05-26T11:44:15.874Z",
  },
}];

const shopSample:Shop = {
  "id": "gid://shopify/Shop/67021930690",
  "name": "navjot-work",
  "email": "chandanjoshi002@gmail.com",
  "myshopifyDomain": "navjot-work.myshopify.com",
  "primaryDomain": {
    "url": "https://navjot-work.myshopify.com",
    "host": "navjot-work.myshopify.com"
  },
  "plan": {
    "displayName": "Developer Preview",
    "partnerDevelopment": true,
    "shopifyPlus": false
  },
  "billingAddress": {
    "address1": null,
    "address2": null,
    "city": null,
    "province": null,
    "provinceCode": null,
    "country": "India",
    "countryCode": "IN",
    "zip": null
  },
  "currencyCode": "INR",
  "weightUnit": "KILOGRAMS",
  "customerAccounts": "OPTIONAL",
  "shopOwnerName": "chandan joshi",
  "ianaTimezone": "America/New_York",
  "timezoneAbbreviation": "EDT",
  "timezoneOffset": "-0400",
  "enabledPresentmentCurrencies": [
    "CAD",
    "INR",
    "USD"
  ],
  "checkoutApiSupported": true,
  "taxesIncluded": false,
  "taxShipping": false
}