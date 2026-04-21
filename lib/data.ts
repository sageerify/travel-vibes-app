export interface Guide {
  id: string
  name: string
  location: string
  rating: number
  reviewCount: number
  price: number
  priceUnit: string
  image: string
  bio: string
  languages: string[]
  specialties: string[]
  type: "guide"
}

export interface Photographer {
  id: string
  name: string
  location: string
  rating: number
  reviewCount: number
  price: number
  priceUnit: string
  image: string
  bio: string
  portfolio: string[]
  specialties: string[]
  type: "photographer"
}

export type ServiceProvider = Guide | Photographer

export interface Booking {
  id: string
  providerId: string
  providerName: string
  providerImage: string
  providerType: "guide" | "photographer"
  date: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  totalPrice: number
  location: string
}

export interface Review {
  id: string
  providerId: string
  userName: string
  userImage: string
  rating: number
  comment: string
  date: string
}

export const categories = [
  { id: "hunza", name: "Hunza", image: "/hunza.png" },
  { id: "skardu", name: "Skardu", image: "/skardu.jpg" },
  { id: "gilgit", name: "Gilgit", image: "/gilgit.jpg" },
  { id: "nature", name: "Nature", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
  { id: "culture", name: "Culture", image: "culture.png" },
]

export const guides: Guide[] = [
  {
    id: "guide-1",
    name: "Sageer Ahmed",
    location: "Hunza Valley",
    rating: 4.9,
    reviewCount: 127,
    price: 150,
    priceUnit: "per day",
    image: "/person1.jpeg",
    bio: "Born and raised in Hunza Valley, I have spent over 15 years guiding travelers through the majestic landscapes of Gilgit-Baltistan. My deep knowledge of local trails, hidden gems, and cultural traditions makes every journey unforgettable.",
    languages: ["English", "Urdu", "Burushaski"],
    specialties: ["Trekking", "Cultural Tours", "Photography Spots"],
    type: "guide",
  },
  {
    id: "guide-2",
    name: "Muzammil",
    location: "Skardu",
    rating: 4.8,
    reviewCount: 89,
    price: 120,
    priceUnit: "per day",
    image: "/person2.png",
    bio: "As one of the first female guides in the region, I specialize in creating safe and enriching experiences for solo travelers and groups. My tours blend adventure with authentic cultural immersion.",
    languages: ["English", "Urdu", "Balti"],
    specialties: ["Women-friendly Tours", "Lake Tours", "Village Visits"],
    type: "guide",
  },
  {
    id: "guide-3",
    name: "Ahmed Shah",
    location: "Gilgit",
    rating: 4.7,
    reviewCount: 156,
    price: 100,
    priceUnit: "per day",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "With a background in mountaineering and outdoor education, I offer expert-led expeditions to some of the most challenging and rewarding peaks in the Karakoram range.",
    languages: ["English", "Urdu", "Shina"],
    specialties: ["Mountaineering", "Base Camp Treks", "Adventure Sports"],
    type: "guide",
  },
  {
    id: "guide-4",
    name: "Zara Malik",
    location: "Hunza Valley",
    rating: 4.9,
    reviewCount: 72,
    price: 130,
    priceUnit: "per day",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "History and archaeology enthusiast offering specialized tours of ancient forts, rock carvings, and historical sites throughout Gilgit-Baltistan.",
    languages: ["English", "Urdu", "Wakhi"],
    specialties: ["Historical Tours", "Archaeological Sites", "Silk Road Heritage"],
    type: "guide",
  },
]

export const photographers: Photographer[] = [
  {
    id: "photo-1",
    name: "Sageer Ahmed",
    location: "Hunza Valley",
    rating: 5.0,
    reviewCount: 94,
    price: 250,
    priceUnit: "per shoot",
    image: "/photographer.jpeg",
    bio: "Award-winning landscape and travel photographer with work featured in National Geographic and Lonely Planet. I capture the raw beauty of Gilgit-Baltistan like no other.",
    portfolio: [
      "https://images.unsplash.com/photo-1586076545232-6c787bafc2b0?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop",
    ],
    specialties: ["Landscape", "Adventure", "Astrophotography"],
    type: "photographer",
  },
  {
    id: "photo-2",
    name: "Sana Baloch",
    location: "Skardu",
    rating: 4.9,
    reviewCount: 67,
    price: 200,
    priceUnit: "per shoot",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bio: "Specializing in portrait and documentary photography, I tell the stories of travelers against the backdrop of the world's most stunning mountains.",
    portfolio: [
      "https://images.unsplash.com/photo-1620735692151-26a7e0748f5d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&h=400&fit=crop",
    ],
    specialties: ["Portraits", "Documentary", "Cultural Stories"],
    type: "photographer",
  },
  {
    id: "photo-3",
    name: "Imran Abbasi",
    location: "Gilgit",
    rating: 4.8,
    reviewCount: 112,
    price: 180,
    priceUnit: "per shoot",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    bio: "Drone and aerial photography specialist offering unique perspectives of valleys, glaciers, and mountain peaks that you've never seen before.",
    portfolio: [
      "https://images.unsplash.com/photo-1623850804666-14b1c6e6a7ab?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=400&fit=crop",
    ],
    specialties: ["Drone Photography", "Aerial Shots", "Cinematic Videos"],
    type: "photographer",
  },
]

export const reviews: Review[] = [
  {
    id: "review-1",
    providerId: "guide-1",
    userName: "Sarah Johnson",
    userImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    rating: 5,
    comment: "Ali was an incredible guide! His knowledge of the area and passion for sharing his culture made our trip unforgettable. Highly recommend!",
    date: "2024-01-15",
  },
  {
    id: "review-2",
    providerId: "guide-1",
    userName: "Michael Chen",
    userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    comment: "Best decision we made was hiring Ali. He took us to hidden spots that weren't on any tourist map. A true local expert!",
    date: "2024-01-10",
  },
  {
    id: "review-3",
    providerId: "photo-1",
    userName: "Emma Wilson",
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    comment: "Karim captured our adventure in the most beautiful way. The photos he took are gallery-worthy. Worth every penny!",
    date: "2024-01-08",
  },
]

export const bookings: Booking[] = [
  {
    id: "booking-1",
    providerId: "guide-1",
    providerName: "Ali Hassan",
    providerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    providerType: "guide",
    date: "2024-02-15",
    status: "confirmed",
    totalPrice: 300,
    location: "Hunza Valley",
  },
  {
    id: "booking-2",
    providerId: "photo-1",
    providerName: "Karim Hussain",
    providerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    providerType: "photographer",
    date: "2024-02-18",
    status: "pending",
    totalPrice: 250,
    location: "Hunza Valley",
  },
  {
    id: "booking-3",
    providerId: "guide-2",
    providerName: "Fatima Khan",
    providerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    providerType: "guide",
    date: "2024-01-20",
    status: "completed",
    totalPrice: 240,
    location: "Skardu",
  },
]

export function getProviderById(id: string): ServiceProvider | undefined {
  return [...guides, ...photographers].find((p) => p.id === id)
}

export function getReviewsByProviderId(providerId: string): Review[] {
  return reviews.filter((r) => r.providerId === providerId)
}
