
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
from pathlib import Path

app = FastAPI()

class EmailRequest(BaseModel):
    title: str
    message: str

# Load model

model_path = Path(__file__).parent / 'model' / 'spam_classifier.pkl'
model = joblib.load(model_path)
@app.post("/predict")
async def predict(email: EmailRequest):
    data = pd.DataFrame([[email.title, email.message]], 
                       columns=['title', 'message'])
    prediction = model.predict(data)[0]
    return {"result": "spam" if prediction == 1 else "ham"}