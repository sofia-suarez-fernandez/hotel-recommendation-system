export interface Review {
  id: string;
  hotel: number;
  user_account: number;
  user_twitter: number;
  rating: number;
  sentiment: number;
  review: string;
  created_at: any;
  updated_at: any;
  included: boolean;
}
