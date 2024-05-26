export interface Review {
  id: string;
  review_title: string;
  review_text: string;
  rate: number;
  sentiment: number;
  tripdate: string;
  included: boolean;
  hotel_name_id: string;
  user_account_id: string;
  // id: string;
  // hotel: number;
  // user_account: number;
  // user_twitter: number;
  // rating: number;
  // sentiment: number;
  // review: string;
  created_at: any;
  updated_at: any;
  // included: boolean;
}
