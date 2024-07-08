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
}
export interface CountryCity {
  country?: string;
  locality?: string;
}
