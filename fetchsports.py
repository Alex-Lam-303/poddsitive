import requests
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

# Replace with your actual API key
API_KEY = os.getenv('ODDS_API_KEY')

SPORT = 'baseball_mlb'  # Use 'upcoming' to see the next 8 games across all sports
REGIONS = 'us'  # us | uk | eu | au
MARKETS = 'h2h'  # h2h for moneyline
ODDS_FORMAT = 'decimal'  # decimal | american
DATE_FORMAT = 'iso'  # iso | unix

# Get today's date in ISO format
today = datetime.now().strftime('%Y-%m-%d')

# Construct the URL for the events endpoint
url = f'https://api.the-odds-api.com/v4/sports/{SPORT}/odds'

# Make the API request
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

# Check the response status
if response.status_code != 200:
    print(f'Failed to get events: status_code {response.status_code}, response body {response.text}')
else:
    events = response.json()
    print('Events and moneyline odds:', events)