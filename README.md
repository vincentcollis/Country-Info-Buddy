# 🌍 Country Info Buddy

A modern **Full-Stack Application** built with **FastAPI** and **React** to fetch and display country information dynamically using a **GraphQL API**.

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Tech Stack](#-tech-stack)
3. [Features](#-features)
4. [Setup Instructions](#-setup-instructions)
5. [Backend API Documentation](#-backend-api-documentation)
6. [Testing](#-testing)
7. [Improvements](#-improvements)
8. [Screenshots](#-screenshots)

---

## 🌟 Overview

**Country Info Buddy** allows users to input a country code and fetch detailed information about that country, such as:

- Name, Native Name, and Emoji Flag
- Currency
- Languages Spoken

The app integrates:

- A **FastAPI backend** to dynamically query the [Countries GraphQL API](https://countries.trevorblades.com/).
- A **React frontend** with form validation, debounced inputs, and clean UI components.

This project demonstrates advanced engineering concepts such as:

- GraphQL integration
- Caching with Redis for performance optimization
- Asynchronous API handling with FastAPI
- Form validation using Zod and React Hook Form
- Testing for both frontend and backend

---

## 🛠️ Tech Stack

### **Frontend**

- React with TypeScript
- React Hook Form + Zod (form validation)
- ShShadcn ui(styling)

### **Backend**

- FastAPI (Python)
- Redis (for caching)
- GraphQL Client (using `requests`)
- CORS Middleware for cross-origin support

### **Tools**

- Pytest (backend testing)
- React Testing Library (frontend testing)

---

## 🚀 Features

1. **Dynamic GraphQL Queries**  
   Query the `countries.trevorblades.com` API dynamically based on user input.

2. **Fast and Efficient Backend**

   - Built with **FastAPI** for high performance and clean code.
   - Caches results using **Redis** to reduce redundant GraphQL requests.

3. **Real-Time User Feedback**

   - Debounced form input ensures queries only run after typing stops.
   - Immediate UI updates with fetched country information.

4. **Form Validation**  
   Input validation ensures the country code is in the correct format (letters only, max 3 characters).

5. **Error Handling**

   - Graceful handling of API failures.
   - User-friendly error messages displayed in the UI.

6. **Testing**
   - Backend routes are tested with **Pytest**.
   - Frontend components tested using **React Testing Library**.

---

## ⚙️ Setup Instructions

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/country-info-buddy.git
cd country-info-buddy
```

2. Backend Setup (FastAPI)

a. Install Dependencies

```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
b. Start Redis (Required for Caching)
	•	macOS/Linux:

```bash
brew install redis
brew services start redis
```

•	Windows: Install Redis via MS Open Tech.

c. Run the Backend

```bash
uvicorn main:app --reload
```

The backend runs at: http://127.0.0.1:8000

3. Frontend Setup (React)

a. Install Dependencies

```bash
cd client
npm install

```
b. Start the Frontend

```bash
npm run dev
```
The frontend runs at: http://localhost:5173

📑 Backend API Documentation

Endpoint: /api/countryside

Method: POST
Description: Fetches country details for a given country code.

Request Body:

{
  "countryCode": "US"
}

Response:

{
  "data": {
    "country": {
      "name": "United States",
      "native": "United States",
      "emoji": "🇺🇸",
      "currency": "USD",
      "languages": [
        { "code": "en", "name": "English" }
      ]
    }
  }
}

🧪 Testing

Backend Tests

Run Pytest to validate the API routes:

```bash
cd server
pytest tests/test_routes.py
```

Frontend Tests

Run React Testing Library tests:

```bash
cd client
npm test
```

🎯 Possible Improvements
	•	Add pagination for large GraphQL responses.
	•	Integrate authentication for the API.
	•	Deploy the app to AWS Lambda and Vercel.
	•	Add a search feature to filter results dynamically.

---
```
