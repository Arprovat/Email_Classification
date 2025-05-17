import pandas as pd
import numpy as np
import nltk
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')
nltk.download('punkt_tab')
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import string
import re


stop_word = set(stopwords.words('english'))
stemmer = PorterStemmer()
def text_processing(text):
  text = text.lower()
  text = re.sub(r'[0-9@?*:-]', '', text)
  text = re.sub('https?://\S+|www\.\S+','',text)
  token = word_tokenize(text)
  token = [ word for word in token if word not in stop_word]
  stem =[stemmer.stem(word) for word in token ]
  return ' '.join(stem)
def combined_tokenized(text):
  return text_processing(text).split()