import pandas as pd
import numpy as np

datos = pd.read_csv('hotel_reviews_paris.csv')

unique_hotels = datos['hotel_name'].unique()

amenities = ['restaurant', 'room_service', 'wifi', 'tv', 'kitchen', 'breakfast', 'parking', 'essentials', 'smoke_detector', 'hangers', 'hair_dryer', 'iron', 'hot_water', 'bed_linens', 'refrigerator', 'garden', 'luggage_dropoff', 'cleaning', 'air_conditioning', 'pool', 'gym', 'elevator', 'heating', 'pet_friendly']

# iterate through each unique hotel
for hotel in unique_hotels:
    selected_amenities = np.random.choice(amenities, size=12, replace=False)

    # assign True to selected amenities
    for am in selected_amenities:
        mask = (datos['hotel_name'] == hotel)
        datos.loc[mask, am] = 1
    
    # assign 0 or 1 to not selected amenities
    not_selected_amenities = [am for am in amenities if am not in selected_amenities]
    for amenity in not_selected_amenities:
        mask = (datos['hotel_name'] == hotel)
        datos.loc[mask, amenity] = np.random.choice([0, 1], size=datos[mask].shape[0], replace=True)

datos.to_csv('hotel_reviews_paris_amenities.csv', index=False)