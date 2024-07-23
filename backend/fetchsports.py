import requests
from datetime import datetime
from dotenv import load_dotenv
import os
import json

load_dotenv()

API_KEY = os.getenv('ODDS_API_KEY')
SPORT = 'baseball_mlb'
REGIONS = 'us'
MARKETS = 'h2h,spreads,totals'
ODDS_FORMAT = 'decimal'
DATE_FORMAT = 'iso'

def fetch_data():
   """  url = f'https://api.the-odds-api.com/v4/sports/{SPORT}/odds'
    response = requests.get(
        url,
        params={
            'apiKey': API_KEY,
            'regions': REGIONS,
            'markets': MARKETS,
            'oddsFormat': ODDS_FORMAT,
            'dateFormat': DATE_FORMAT
        }
    )

    if response.status_code != 200:
        print(f'Failed to get events: status_code {response.status_code}, response body {response.text}')
        return []
    else:
        return response.json() """
   return json.load(open('rawData.json'))