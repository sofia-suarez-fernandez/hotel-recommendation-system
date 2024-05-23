export interface Hotel {
  id: string;
  hotel_name: string;
  hotel_description?: string;
  hotel_url?: string;
  hotel_image?: string;
  price_range?: string;
  rating_value?: number;
  review_count?: number;
  street_address?: string;
  locality?: string;
  country?: string;
  // country: string;
  // city?: string;
  // address?: string;
  // latitude?: number;
  // longitude?: number;
  // price?: number;
  // facilities?: string;
  // images?: string;
  // rating?: {
  //   rating__avg: number;
  // };
  // num_reviews: number;
}

// export interface CountryCity {
export interface City {
  country?: string;
  // city: string;
  locality?: string;
}
