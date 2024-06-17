import pandas as pd


#  amenities
amenities_data = pd.read_csv('amenities_data.csv')
amenities_data['id'] = amenities_data.index
amenities_data.to_csv('amenities_data_index.csv', index=False)

# hotels
hotels_data = pd.read_csv('hotels_data.csv')
hotels_data['id'] = hotels_data.index
hotels_data.to_csv('hotels_data_index.csv', index=False)

# reviews
reviews_data = pd.read_csv('reviews_data.csv')
reviews_data['id'] = reviews_data.index
reviews_data.to_csv('reviews_data_index.csv', index=False)
