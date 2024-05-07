import pandas as pd
import numpy as np

df = pd.read_csv('hotels_data.csv')


# df['parking'] = 0
prob_bajo_parking = 0.7
prob_medio_parking = 0.8
prob_alto_parking = 0.9

df['aux'] = np.random.random(len(df))
df['parking'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_parking)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_parking)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_parking))

# df['wifi']=0
prob_bajo_wifi = 0.9
prob_medio_wifi = 0.8
prob_alto_wifi = 0.7
df['aux'] = np.random.random(len(df))
df['wifi'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_wifi)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_wifi)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_wifi))

# df['pool']=0
prob_bajo_pool = 0.5
prob_medio_pool = 0.75
prob_alto_pool = 0.9
df['aux'] = np.random.random(len(df))
df['pool'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_pool)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_pool)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_pool))

# df['gym']=0
prob_bajo_gym = 0.3
prob_medio_gym = 0.65
prob_alto_gym = 0.9
df['aux'] = np.random.random(len(df))
df['gym'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_gym)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_gym)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_gym))


# df['bar']=0
prob_bajo_bar = 0.5
prob_medio_bar = 0.75
prob_alto_bar = 0.95
df['aux'] = np.random.random(len(df))
df['bar'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_bar)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_bar)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_bar))

# df['evening_entertainment']=0
prob_bajo_evening_entertainment = 0.2
prob_medio_evening_entertainment = 0.55
prob_alto_evening_entertainment = 0.9
df['aux'] = np.random.random(len(df))
df['parking'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_evening_entertainment)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_evening_entertainment)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_evening_entertainment))


# df['pets_allowed']=0
prob_bajo_pets_allowed = 0.2
prob_medio_pets_allowed = 0.2
prob_alto_pets_allowed = 0.2
df['aux'] = np.random.random(len(df))
df['pets_allowed'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_pets_allowed)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_pets_allowed)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_pets_allowed))

# df['pool_towels']=0
prob_bajo_pool_towels = 0.5
prob_medio_pool_towels = 0.75
prob_alto_pool_towels = 0.9
df['aux'] = np.random.random(len(df))
df['pool_towels'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_pool_towels)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_pool_towels)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_pool_towels))


# df['coffee_shop']=0
prob_bajo_coffee_shop = 0.4
prob_medio_coffee_shop = 0.6
prob_alto_coffee_shop = 0.95
df['aux'] = np.random.random(len(df))
df['coffee_shop'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_coffee_shop)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_coffee_shop)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_coffee_shop))

# df['restaurant']=0
prob_bajo_restaurant = 0.2
prob_medio_restaurant = 0.5
prob_alto_restaurant = 0.85
df['aux'] = np.random.random(len(df))
df['restaurant'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_restaurant)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_restaurant)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_restaurant))

# df['breakfast']=0
prob_bajo_breakfast = 0.7
prob_medio_breakfast = 0.8
prob_alto_breakfast = 0.9
df['aux'] = np.random.random(len(df))
df['breakfast'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_breakfast)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_breakfast)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_breakfast))

# df['welcome_drink']=0
prob_bajo_welcome_drink = 0.2
prob_medio_welcome_drink = 0.6
prob_alto_welcome_drink = 0.9
df['aux'] = np.random.random(len(df))
df['welcome_drink'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_welcome_drink)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_welcome_drink)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_welcome_drink))

# df['happy_hour']=0
prob_bajo_happy_hour = 0.15
prob_medio_happy_hour = 0.5
prob_alto_happy_hour = 0.75
df['aux'] = np.random.random(len(df))
df['happy_hour'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_happy_hour)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_happy_hour)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_happy_hour))

# df['airport_transportation']=0
prob_bajo_airport_transportation = 0.4
prob_medio_airport_transportation = 0.6
prob_alto_airport_transportation = 0.9
df['aux'] = np.random.random(len(df))
df['airport_transportation'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_airport_transportation)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_airport_transportation)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_airport_transportation))


# df['car_hire']=0
prob_bajo_car_hire = 0.2
prob_medio_car_hire = 0.5
prob_alto_car_hire = 0.8
df['aux'] = np.random.random(len(df))
df['car_hire'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_car_hire)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_car_hire)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_car_hire))

# df['taxi_service']=0
prob_bajo_taxi_service = 0.5
prob_medio_taxi_service = 0.7
prob_alto_taxi_service = 0.9
df['aux'] = np.random.random(len(df))
df['taxi_service'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_taxi_service)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_taxi_service)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_taxi_service))


# df['business_center']=0
prob_bajo_business_center = 0.1
prob_medio_business_center = 0.5
prob_alto_business_center = 0.85
df['aux'] = np.random.random(len(df))
df['business_center'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_business_center)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_business_center)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_business_center))


# df['meeting_rooms']=0
prob_bajo_meeting_rooms = 0.1
prob_medio_meeting_rooms = 0.5
prob_alto_meeting_rooms = 0.9
df['aux'] = np.random.random(len(df))
df['meeting_rooms'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_meeting_rooms)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_meeting_rooms)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_meeting_rooms))


# df['security']=0
prob_bajo_security = 0.5
prob_medio_security = 0.65
prob_alto_security = 0.9
df['aux'] = np.random.random(len(df))
df['security'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_security)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_security)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_security))


# df['baggage_storage']=0
prob_bajo_baggage_storage = 0.7
prob_medio_bagagge_storage = 0.8
prob_alto_bagagge_storage = 0.9
df['aux'] = np.random.random(len(df))
df['baggage_storage'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_baggage_storage)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_bagagge_storage)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_bagagge_storage))


# df['concierge']=0
prob_bajo_concierge = 0.7
prob_medio_concierge = 0.8
prob_alto_concierge = 0.9
df['aux'] = np.random.random(len(df))
df['concierge'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_concierge)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_concierge)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_concierge))


# df['gift_shop']=0
prob_bajo_gift_shop = 0.2
prob_medio_gift_shop = 0.55
prob_alto_gift_shop = 0.8
df['aux'] = np.random.random(len(df))
df['gift_shop'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_gift_shop)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_gift_shop)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_gift_shop))


# df['non_smoking']=0
prob_bajo_non_smoking = 0.3
prob_medio_non_smoking = 0.25
prob_alto_non_smoking = 0.2
df['aux'] = np.random.random(len(df))
df['non_smoking'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_non_smoking)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_non_smoking)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_non_smoking))


# df['outdoor_fireplace']=0
prob_bajo_outdoor_fireplace = 0.1
prob_medio_outdoor_fireplace = 0.3
prob_alto_outdoor_fireplace = 0.4
df['aux'] = np.random.random(len(df))
df['outdoor_fireplace'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_outdoor_fireplace)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_outdoor_fireplace)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_outdoor_fireplace))


# df['shops']=0
prob_bajo_shops = 0.25
prob_medio_shops = 0.5
prob_alto_shops = 0.85
df['aux'] = np.random.random(len(df))
df['shops'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_shops)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_shops)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_shops))


# df['sun_loungers']=0
prob_bajo_sun_loungers = 0.5
prob_medio_sun_loungers = 0.75
prob_alto_sun_loungers = 0.9
df['aux'] = np.random.random(len(df))
df['sun_loungers'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_sun_loungers)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_sun_loungers)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_sun_loungers))


# df['ATM']=0
prob_bajo_atm = 0.45
prob_medio_atm = 0.6
prob_alto_atm = 0.9
df['aux'] = np.random.random(len(df))
df['ATM'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_atm)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_atm)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_atm))


# df['doorperson']=0
prob_bajo_doorperson = 0.6
prob_medio_doorperson = 0.7
prob_alto_doorperson = 0.9
df['aux'] = np.random.random(len(df))
df['doorperson'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_doorperson)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_doorperson)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_doorperson))


# df['first_aid_kit']=0
prob_bajo_first_aid_kit = 0.6
prob_medio_first_aid_kit = 0.75
prob_alto_first_aid_kit = 0.9
df['aux'] = np.random.random(len(df))
df['first_aid_kit'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_first_aid_kit)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_first_aid_kit)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_first_aid_kit))


# df['umbrella']=0
prob_bajo_umbrella = 0.65
prob_medio_umbrella = 0.8
prob_alto_umbrella = 0.9
df['aux'] = np.random.random(len(df))
df['umbrella'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_umbrella)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_umbrella)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_umbrella))


# df['24h_check_in']=0
prob_bajo_24h_check_in = 0.8
prob_medio_24h_check_in = 0.9
prob_alto_24h_check_in = 0.95
df['aux'] = np.random.random(len(df))
df['check_in_24h'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_24h_check_in)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_24h_check_in)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_24h_check_in))


# df['24h_front_desk']=0
prob_bajo_24h_front_desk = 0.8
prob_medio_24h_front_desk = 0.9
prob_alto_24h_front_desk = 0.95
df['aux'] = np.random.random(len(df))
df['front_desk_24h'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_24h_front_desk)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_24h_front_desk)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_24h_front_desk))


# df['private_check_in_out']=0
prob_bajo_private_check_in_out = 0.5
prob_medio_private_check_in_out = 0.7
prob_alto_private_check_in_out = 0.9
df['aux'] = np.random.random(len(df))
df['private_check_in_out'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_private_check_in_out)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_private_check_in_out)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_private_check_in_out))


# df['dry_cleaning']=0
prob_bajo_dry_cleaning = 0.5
prob_medio_dry_cleaning = 0.75
prob_alto_dry_cleaning = 0.9
df['aux'] = np.random.random(len(df))
df['dry_cleaning'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_dry_cleaning)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_dry_cleaning
)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_dry_cleaning))


# df['laundry_service']=0
prob_bajo_laundry_service = 0.5
prob_medio_laundry_service = 0.75
prob_alto_laundry_service = 0.9
df['aux'] = np.random.random(len(df))
df['laundry_service'] = ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo_laundry_service)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio_laundry_service
)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto_laundry_service))


# ((df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_bajo)) | ((df['price_range'] == '$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_medio)) | ((df['price_range'] == '$$$ (Based on Average Nightly Rates for a Standard Room from our Partners)') & (df['aux'] < prob_alto))

# df.loc[df['<columna_precio>'] == '<valor_a_comparar>', '<columna_a_cambiar>'] = '<valor_para_la_columna>' 
# df.loc[df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)', '<columna_a_cambiar>'] = '<valor_para_la_columna>'

# df.to_csv('hotel_amenities_all_destinations.csv')
# df.to_csv('hotels_data_with_amenities.csv', index=False)
df['id'] = df.index
df.to_csv('hotels_data_with_amenities_index_2.csv', index=False)
