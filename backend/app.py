from flask import Flask, jsonify
from fetchsports import fetch_data
from calculateEV import process_data_to_sql
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to the Betting Odds API!"

@app.route('/get-odds', methods=['GET', 'POST'])
def fetch_and_process():
    data = fetch_data()
    if data:
        positive_ev_bets = process_data_to_sql(data)
        return jsonify(positive_ev_bets)
    else:
        return jsonify({"error": "Failed to fetch data"}), 500

if __name__ == '__main__':
    app.run(debug=True)