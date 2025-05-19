
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: "wrap-001",
    name: "Serenity Garden Wrap",
    description: "A breathable cotton wrap with a serene botanical pattern. Perfect for all seasons, this wrap provides comfort for both you and your baby.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800",
    ],
    colors: ["Sage Green", "Dusty Rose", "Cream"],
    category: "cotton",
    material: "100% Organic Cotton",
    size: "4.6m",
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: "wrap-002",
    name: "Twilight Linen Blend",
    description: "A luxurious blend of linen and cotton that becomes increasingly soft with each use. Cooler than pure cotton, ideal for warmer weather.",
    price: 159.99,
    originalPrice: 179.99,
    images: [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=800",
    ],
    colors: ["Navy", "Terracotta", "Natural"],
    category: "linen",
    material: "70% Linen, 30% Cotton",
    size: "4.6m",
    inStock: true,
    isFeatured: true
  },
  {
    id: "wrap-003",
    name: "Highland Silk Fusion",
    description: "Our premium wrap with a touch of silk for unmatched comfort and a subtle shimmer. Supportive yet lightweight for extended carrying sessions.",
    price: 189.99,
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=800",
    ],
    colors: ["Burgundy", "Forest Green", "Charcoal"],
    category: "silk",
    material: "80% Cotton, 20% Silk",
    size: "4.6m",
    inStock: true,
    isFeatured: true
  },
  {
    id: "wrap-004",
    name: "Coastal Breeze Cotton",
    description: "A lightweight cotton wrap featuring an elegant wave pattern. Designed for beginners and experienced babywearers alike.",
    price: 119.99,
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800",
    ],
    colors: ["Ocean Blue", "Sandy Beige", "Coral"],
    category: "cotton",
    material: "100% Organic Cotton",
    size: "4.2m",
    inStock: true,
    isFeatured: true
  },
  {
    id: "wrap-005",
    name: "Mountain Meadow Wrap",
    description: "A medium-weight cotton wrap with intricate floral patterns inspired by alpine meadows. Comfortable and supportive.",
    price: 139.99,
    images: [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=800",
    ],
    colors: ["Wildflower Purple", "Alpine Green", "Golden Sunrise"],
    category: "cotton",
    material: "100% Organic Cotton",
    size: "4.6m",
    inStock: true
  },
  {
    id: "wrap-006",
    name: "Celestial Dreams Merino",
    description: "A luxurious blend featuring merino wool for cooler weather. Incredibly soft with a beautiful drape and star pattern design.",
    price: 199.99,
    originalPrice: 229.99,
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=800",
    ],
    colors: ["Midnight Blue", "Slate Gray", "Plum"],
    category: "wool",
    material: "70% Cotton, 30% Merino Wool",
    size: "4.6m",
    inStock: true,
    isNew: true
  },
  {
    id: "wrap-007",
    name: "Heritage Herringbone",
    description: "A classic design with a modern twist. The herringbone weave provides excellent support while remaining flexible and comfortable.",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800",
    ],
    colors: ["Rust", "Olive", "Stone"],
    category: "cotton",
    material: "100% Organic Cotton",
    size: "4.6m",
    inStock: false
  },
  {
    id: "wrap-008",
    name: "Urban Explorer Hemp",
    description: "A durable hemp blend that's perfect for active parents. Supportive, breathable, and naturally resistant to bacteria.",
    price: 169.99,
    images: [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=800",
    ],
    colors: ["Charcoal", "Moss", "Sandstone"],
    category: "hemp",
    material: "55% Hemp, 45% Cotton",
    size: "4.6m",
    inStock: true
  }
];
