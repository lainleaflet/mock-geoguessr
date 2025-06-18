from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/random-location")
def random_location():
    return jsonify({
        "lat": 39.482231,  #coordinates of breckenridge, colorado for now
        "lng": -106.046181   
    })

if __name__ == "__main__":
    app.run(debug=True)