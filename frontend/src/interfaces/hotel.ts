export interface Hotel {
  id: string;
  name: string;
  country: string;
  city?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  price?: number;
  facilities?: string;
  images?: string;
  rating?: {
    rating__avg: number;
  };
  num_reviews: number;
}

export interface CountryCity {
  country: string;
  city: string;
}
