import pandas as pd

df = pd.read_csv('hotel_reviews_all_destinations.csv')

city_data = df.drop(columns=['review_title', 'review_text', 'rate', 'tripdate', 'hotel_description', 'hotel_url', 'hotel_image', 'price_range', 'rating_value', 'review_count', 'street_address', 'hotel_name'])
city_data = city_data.drop_duplicates(subset=['locality'])

city_data.to_csv('city_data_index.csv')