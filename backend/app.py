from flask import Flask, jsonify, request
from fetchOdds import fetch_odds
from calculateEV import process_data_to_sql
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to the Betting Odds API!"

@app.route('/get-odds', methods=['POST'])
def fetch_and_process():
    data = request.get_json()
    sports = data.get("sports", [])
    markets = data.get("markets", [])
    odds = fetch_odds(sports, markets)
    if odds:
        positive_ev_bets = process_data_to_sql(odds)
        return jsonify(positive_ev_bets)
    else:
        return jsonify({"error": "Failed to fetch data"}), 500

if __name__ == '__main__':
    app.run(debug=True)