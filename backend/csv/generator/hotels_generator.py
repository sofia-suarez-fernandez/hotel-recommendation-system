import pandas as pd

df = pd.read_csv('hotel_reviews_all_destinations.csv')

hotels_data = df.drop(columns=['review_title', 'review_text', 'rate', 'tripdate'])
hotels_data = hotels_data.drop_duplicates(subset=['hotel_name'])

hotels_data['id'] = hotels_data.index
hotels_data.to_csv('hotels_data_index.csv', index=False)
