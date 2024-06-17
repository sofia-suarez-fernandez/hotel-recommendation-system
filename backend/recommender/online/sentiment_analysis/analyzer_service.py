from flask import Flask, request, jsonify
from flask_cors import CORS
from sentiment_analysis import analyze_sentiment

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    review_text = data['review_text']
    result = analyze_sentiment(review_text)
    return jsonify({'sentiment': result})

if __name__ == '__main__':
    app.run(debug=True)