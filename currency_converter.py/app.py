from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the Currency Converter API!"

@app.route('/convert', methods=['GET'])
def convert_currency():
    amount = request.args.get('amount', type=float)
    from_currency = request.args.get('from_currency', type=str)
    to_currency = request.args.get('to_currency', type=str)
    
    # For example: You can use an API like Open Exchange Rates or similar
    api_url = f"https://api.exchangerate-api.com/v4/latest/{from_currency}"
    response = requests.get(api_url)
    data = response.json()

    if to_currency not in data['rates']:
        return jsonify({'error': 'Currency not found'}), 404

    conversion_rate = data['rates'][to_currency]
    converted_amount = amount * conversion_rate
    return jsonify({
        'amount': amount,
        'from_currency': from_currency,
        'to_currency': to_currency,
        'converted_amount': converted_amount
    })

if __name__ == '__main__':
    app.run(debug=True)