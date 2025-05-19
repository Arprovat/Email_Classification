# 📧 Email Spam Classification System

![Python](https://img.shields.io/badge/Python-3.10%2B-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.78-green)
![React](https://img.shields.io/badge/React-18.2-lightblue)
![License](https://img.shields.io/badge/License-MIT-yellow)

A powerful machine learning system that classifies emails as **spam** or **ham** with 95% accuracy, featuring a modern web interface and REST API.

<div align="center">
  <img src="assets/demo.gif" alt="Demo" width="800">
</div>

## 🌟 Features

- 🚀 **Real-time predictions** via web interface or API
- 🔍 **Dual analysis** of email subject + body
- 🤖 **Ensemble model** (Logistic Regression + SVM + Random Forest)
- 🧹 Advanced text preprocessing pipeline
- 🔒 Secure FastAPI backend

## 📦 Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/email-spam-classifier.git
cd email-spam-classifier

# Install dependencies
pip install -r requirements.txt

# Launch system
uvicorn backend.app.main:app --reload
cd frontend && npm start
```
🧠 Model Details

🔧 Preprocessing Pipeline

- Lowercasing ➡️

- Tokenization ✂️

- Stopword Removal 🚫

- Lemmatization  🌿

📈 Performance Metrics

Metric	Score
- Accuracy	95.2%
- Spam Recall	90.5%
- Ham Precision	100%

🖥️ Demo Interface

<div display='flex'>
  <img src="https://i.ibb.co/v8tQ1FN/screencapture-localhost-5173-2025-05-19-20-28-40.png" alt="screencapture-localhost-5173-2025-05-19-20-28-40" width='330' hight='500' border="0">
  <img src="https://i.ibb.co/Kp46Xwxm/screencapture-localhost-5173-2025-05-19-20-33-04-1.png" alt="screencapture-localhost-5173-2025-05-19-20-33-04-1" width='330' hight='500' border="0">
  <img src="https://i.ibb.co/s92t5bBS/image.png" alt="image"  width='330' hight='500' border="0">
</div>

Made with ❤️ by Md. Abdur Rahman |
