from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama

# Set up OpenAI API key from environment variable

app = Flask(__name__)
CORS(app)

chat_history = [{
            "role": "system", 
            "content": "You are a friendly and helpful assistant"
        }]
@app.route("/chat", methods=["POST"])
def chat():
    message = request.json.get("message")
    try:
        # chat_history.extend(message)
        print(message)
        response = ollama.chat(
            model="llama3.2:latest",
            messages=message
        )
        chatbot_response = response.message.content.strip()
        return jsonify({"response": chatbot_response})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)

