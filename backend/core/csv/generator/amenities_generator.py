import pandas as pd

df = pd.read_csv('hotels_data_with_amenities.csv')

amenities_data = df.drop(columns=['hotel_description', 'hotel_url', 'hotel_image', 'price_range', 'rating_value', 'review_count', 'street_address', 'locality', 'country', 'aux'])
amenities_data = amenities_data.drop_duplicates(subset=['hotel_name'])

amenities_data['id'] = amenities_data.index
amenities_data.to_csv('amenities_data_index.csv', index=False)
