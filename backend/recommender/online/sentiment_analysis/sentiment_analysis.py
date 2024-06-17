# Load model directly
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

tokenizer = AutoTokenizer.from_pretrained("Dmyadav2001/Sentimental-Analysis")
model = AutoModelForSequenceClassification.from_pretrained(
    "Dmyadav2001/Sentimental-Analysis"
)


def analyze_sentiment(review_text: str) -> str:
    #  tokenize review text
    inputs = tokenizer(
        review_text, return_tensors="pt", padding=True, truncation=True, max_length=4000
    )

    with torch.no_grad():
        #  get model output
        outputs = model(**inputs)

    #  get predicted sentiment
    prediction = outputs.logits.softmax(dim=-1)
    sentiment = "Positive" if torch.argmax(prediction) == 1 else ("Neutral" if torch.argmax(prediction) == 2 else "Negative")

    return sentiment


# import torch

# # def analyze_sentiment(text):
# #   """Analyzes the sentiment of a text using a pre-trained sentiment analysis model.

# #   Args:
# #       text (str): The text to analyze.

# #   Returns:
# #       dict: A dictionary containing the predicted sentiment and its probability.
# #   """

# #   # Preprocess the text
# #   encoded_text = tokenizer(text, return_tensors="pt")

# #   # Get predictions from the model
# #   with torch.no_grad():
# #     outputs = model(**encoded_text)
# #     logits = outputs.logits.squeeze(0)  # Remove batch dimension if present

# #   # Get the predicted class (positive, neutral, negative)
# #   predicted_class = torch.argmax(logits).item()
# #   class_labels = ["positive", "neutral", "negative"]  # Assuming these labels

# #   # Get the probability of the predicted class
# #   predicted_prob = torch.softmax(logits, dim=0)[predicted_class].item()

# #   # Return the sentiment analysis result
# #   return {
# #       "sentiment": class_labels[predicted_class],
# #       "probability": predicted_prob
# #   }

# # # Example usage
# # text = "This movie was absolutely fantastic!"
# # sentiment_analysis = analyze_sentiment(text)
# # print(f"Sentiment: {sentiment_analysis['sentiment']}, Probability: {sentiment_analysis['probability']:.2f}")

