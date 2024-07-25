import requests
from datetime import datetime
from dotenv import load_dotenv
import os
import json

load_dotenv()

SPORT = 'americanfootball_nfl'
REGIONS = 'us'
ODDS_FORMAT = 'decimal'
DATE_FORMAT = 'iso'

API_KEY = os.getenv('ODDS_API_KEY')

def fetch_odds(sports, markets):
    """
    MARKETS = ",".join(markets)
    all_data = []

    for sport in sports:
        url = f'https://api.the-odds-api.com/v4/sports/{sport}/odds'
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
            print(f'Failed to get events for {sport}: status_code {response.status_code}, response body {response.text}')
        else:
            data = response.json()
            all_data.extend(data)

    with open('rawData.json', 'w') as json_file:
        json.dump(all_data, json_file)
    return all_data
    """

    """
    raw_data = json.load(open('rawData.json'))
    raw_data_other = json.load(open('rawDataOther.json'))
    
    # Combine the two lists
    combined_data = raw_data + raw_data_other  # Concatenate the lists
    return combined_data
    """

    return json.load(open('rawData.json'))