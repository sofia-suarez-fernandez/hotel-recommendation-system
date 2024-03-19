import scrapy as sp
from pathlib import Path


class QuotesSpider(sp.Spider):
    # datos = pd.read_csv('hotel_reviews_all_destinations.csv')
    # unique_hotels = datos['hotel_name'].unique()

    name = "amenities_tripadvisor"
    start_urls = [
        "https://www.tripadvisor.com/Hotel_Review-g60763-d23462501-Reviews-Margaritaville_Resort_Times_Square-New_York_City_New_York.html",
    ]

    def parse(self, response):
        for link in response.xpath(
            '//a[@data-test-target="amenity_text"]/text()'
        ).getall():
            print(link)
