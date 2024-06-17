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

        #  get predicted sentiment
        prediction = outputs.logits.softmax(dim=-1)
        # IN ANALYZER MODEL
        # Label 0 = Negative
        # Label 1 = Positive
        # Label 2 = Neutral
        sentiment = "Positive" if torch.argmax(prediction) == 1 else ("Neutral" if torch.argmax(prediction) == 2 else "Negative")
        # our system:
        # positive = 3
        # neutral = 2
        # negative = 1
        if sentiment == "Positive":
            return 3
        elif sentiment == "Neutral":
            return 2
        else:
            return 1

        # return sentiment