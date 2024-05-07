import pandas as pd

df = pd.read_csv('hotel_reviews_all_destinations.csv')

reviews_data = df.drop(columns=['hotel_description', 'hotel_url', 'hotel_image', 'price_range', 'rating_value', 'review_count', 'street_address', 'locality', 'country'])

reviews_data['id'] = reviews_data.index
reviews_data.to_csv('reviews_data_index.csv', index=False)
