import joblib
import os
from pathlib import Path
from sklearn.compose import ColumnTransformer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import VotingClassifier,RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.pipeline import Pipeline
import pandas as pd

from backend.app.preprocessing import combined_tokenized
df = pd.read_csv(r'Train_model\email_spam (1).csv') 
df['type'] = df['type'].map({'spam': 1, 'not spam': 0})


PreProcessor = ColumnTransformer(transformers=[
    ('title_tfdif', TfidfVectorizer(
        tokenizer=combined_tokenized,
        token_pattern=None  
    ), 'title'),
    ('text_tfdif', TfidfVectorizer(
        tokenizer=combined_tokenized,
        token_pattern=None  
    ), 'text')
])

models = [
    ('rf',RandomForestClassifier(n_estimators=50, random_state=2)),
    ('lr',LogisticRegression(max_iter=1000,solver='liblinear', penalty='l1')),
    ('svm',SVC(probability=True))]

voting_clf = VotingClassifier(estimators=models, voting='soft')
pipeline = Pipeline([
    ('preprocessor', PreProcessor),
    ('classifier', voting_clf)
])
x=df[['title','text']]
y=df['type']

x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.2,random_state=42)

pipeline.fit(x_train,y_train)

model_path = Path('backend/app/model/spam_classifier.pkl')
print(f"\nSaving to: {model_path.absolute()}")
model_path.parent.mkdir(parents=True, exist_ok=True)
joblib.dump(pipeline, model_path)
print(f"Directory exists: {model_path.parent.exists()}")
print(f"File created: {model_path.exists()}")