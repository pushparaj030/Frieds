export const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919003650415";
export const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME || "Fried Chickens";
export const domain = process.env.NEXT_PUBLIC_DOMAIN || "friedchickens.in";

export const deliveryFeeEnabled = process.env.NEXT_PUBLIC_DELIVERY_FEE_ENABLED === "true";
export const deliveryFee = parseInt(process.env.NEXT_PUBLIC_DELIVERY_FEE_PRICE || "0", 10);
