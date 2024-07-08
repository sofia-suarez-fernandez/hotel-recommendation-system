# Load model directly
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

tokenizer = AutoTokenizer.from_pretrained("Dmyadav2001/Sentimental-Analysis")
model = AutoModelForSequenceClassification.from_pretrained(
    "Dmyadav2001/Sentimental-Analysis"
)


class SentimentAnalysis:
    """Sentiment analysis class"""

    def analyze_sentiment(self, review_text: str) -> str:
        """Analyze sentiment of review text"""

        #  tokenize review text
        inputs = tokenizer(
            review_text, return_tensors="pt", padding=True, truncation=True, max_length=4000
        )

        with torch.no_grad():
            #  get model output
            outputs = model(**inputs)
            prediction = outputs.logits.softmax(dim=-1)
            sentiment_scores = {
                "Positive": prediction[:, 1].item(),
                "Neutral": prediction[:, 2].item(),
                "Negative": prediction[:, 0].item(),
            }
            
            dominant_sentiment = max(sentiment_scores, key=sentiment_scores.get)
            sentiment_value = {
                "Positive": 3,
                "Neutral": 2,
                "Negative": 1,
            }[dominant_sentiment]

        return sentiment_value