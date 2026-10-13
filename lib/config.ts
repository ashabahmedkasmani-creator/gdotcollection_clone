// Owner-configurable business rules. Verified on gdotcollection.com: free shipping on Rs. 10,000, COD + bank transfer.
export const STORE = { name: "G. Collection", url: "https://gdotcollection.com", email: "support@gdotcollection.com",
  phone: "+92 334 7779231", city: "Karachi, Pakistan", hours: "Mon-Sat 11:00 AM - 9:00 PM",
  freeShippingOver: 10000,
  flatShipping: 250, // NOT verified on the live site - owner must confirm
  payments: ["Cash on Delivery", "Bank Transfer"],
  // Logo image URLs. Empty = typographic wordmark. Candidates seen on gdotcollection.com (unverified, check contrast before use):
  //   header https://gdotcollection.com/wp-content/uploads/2026/09/G.png   footer https://gdotcollection.com/wp-content/uploads/2026/09/G-235x60.png
  // Best: download the official files into /public and point these at "/logo-dark.png" and "/logo-light.png".
  logo: { onLight: "", onDark: "" },
  // Official social profile URLs. The live store lists Facebook/Instagram/WhatsApp as text only (no links), so none are verified yet.
  social: {} as Record<string, string>,
  // Policies NOT published on the live store. Fill these in and the matching FAQ cards drop their "Store to confirm" flag.
  policy: { belowThresholdShipping: "", deliveryTime: "", deliveryAreas: "", returnWindow: "", exchangeProcess: "", orderChanges: "" } as Record<string, string> };
export const rsLong = (n: number) => "Rs. " + n.toLocaleString("en-PK");
export const rs = (n: number) => "₨" + n.toLocaleString("en-PK");
