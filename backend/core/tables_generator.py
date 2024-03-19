import pandas as pd

df = pd.read_csv('hotel_reviews_paris_amenities.csv')

df_hotels = df[['hotel_name', 'hotel_description', 'hotel_url', 'hotel_image', 'price_range', 'street_address', 'locality', 'country', 'review_count', 'rating_value']]

df_reviews = df[['hotel_name', 'user_id', 'review_title', 'review_text', 'rate', 'tripdate']]

df_users = df[['user_id', 'username', 'first_name']]

df_hotels.to_csv('hotels.csv', index=False)
df_reviews.to_csv('reviews.csv', index=False)
df_users.to_csv('users.csv', index=False)