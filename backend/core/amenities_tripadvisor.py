import pandas as pd

df = pd.read_csv('hotel_reviews_all_destinations.csv')

df['parking'] = 0
df['wifi']=0
df['pool']=0
df['gym']=0
df['bar']=0
df['evening_entertainment']=0
df['pets_allowed']=0
df['pool_towels']=0
df['coffee_shop']=0
df['restaurant']=0
df['breakfast']=0
df['welcome_drink']=0
df['Happy_hour']=0
df['airport_transportation']=0
df['car_hire']=0
df['taxi_service']=0
df['business_center']=0
df['meeting_rooms']=0
df['security']=0
df['baggage_storage']=0
df['concierge']=0
df['gift_shop']=0
df['non_smoking']=0
df['outdoor_fireplace']=0
df['shops']=0
df['sun_loungers']=0
df['ATM']=0
df['doorperson']=0
df['first_aid_kit']=0
df['umbrella']=0
df['24h_check_in']=0
df['24h_front_desk']=0
df['private_check_in_out']=0
df['dry_cleaning']=0
df['laundry_service']=0

# df.loc[df['<columna_precio>'] == '<valor_a_comparar>', '<columna_a_cambiar>'] = '<valor_para_la_columna>' 
df.loc[df['price_range'] == '$ (Based on Average Nightly Rates for a Standard Room from our Partners)', '<columna_a_cambiar>'] = '<valor_para_la_columna>'

df.to_csv('hotel_amenities_all_destinations.csv')
