
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: string[];
  category: string;
  material: string;
  size: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}
