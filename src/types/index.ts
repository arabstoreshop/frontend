export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn?: string;
  benefits: string[];
  benefitsEn?: string[];
  howToUse: string;
  howToUseEn?: string;
  ingredients?: string;
  image: string;
  images: string[];
  category: string;
  categoryEn?: string;
  painPoints?: string[];
  painPointsEn?: string[];
  emotionalBenefit?: string;
  emotionalBenefitEn?: string;
  scienceProof?: string;
  sfdaApproved?: boolean;
  ingredientsDetails?: { name: string; description: string; nameEn?: string; descriptionEn?: string }[];
}

export interface Offer {
  qty: 1 | 2 | 3;
  label: string;
  price: number;
  originalPrice?: number;
  badge?: string;
}

export interface CartItem {
  sku: string;
  slug: string;
  name: string;
  image: string;
  quantity: number;
  bundlePrice: number;
  isUpsell: boolean;
}

export interface OrderPayload {
  name: string;
  phone: string;
  items: {
    sku: string;
    quantity: number;
    is_upsell: boolean;
  }[];
  browser_event_id?: string;
}

export interface OrderResponse {
  order_number: string;
  name: string;
  phone_local: string;
  total_sar: number;
  status: string;
  created_at: string;
  items: {
    sku: string;
    product_name: string;
    quantity: number;
    unit_price_sar: number;
    line_total_sar: number;
    is_upsell: boolean;
  }[];
}
