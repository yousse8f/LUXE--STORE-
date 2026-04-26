export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
};

export type View = 'home' | 'about' | 'checkout' | 'journal' | 'create-account' | 'product-detail';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CheckoutStep = 'bag' | 'shipping' | 'payment' | 'success';

export type ShippingData = {
  name: string;
  address: string;
  city: string;
};

export type PaymentData = {
  number: string;
  expiry: string;
  cvv: string;
};

export type AccountData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  acceptTerms: boolean;
  subscribeNewsletter: boolean;
};
