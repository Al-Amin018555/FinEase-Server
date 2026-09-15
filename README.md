# 💰 FinEase — Server Side

This is the backend/server for **FinEase**, a personal finance management web application. It provides RESTful API endpoints to manage user transactions (income & expenses), connected to a MongoDB database.

🔗 **Client Repo:** https://github.com/Al-Amin018555/FinEase-Client

🔗 **Live Site:** https://finease-4ff64.web.app/

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Native Driver)
- CORS
- dotenv

## 📡 API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/` | Check if the server is running |
| `GET` | `/my-transactions/:email` | Get all transactions for a specific user by email |
| `GET` | `/transaction/:id` | Get a single transaction by ID |
| `POST` | `/add-transaction` | Add a new transaction |
| `PUT` | `/transaction/update/:id` | Update an existing transaction by ID |
| `DELETE` | `/transaction/delete/:id` | Delete a transaction by ID |

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following keys:

- `DB_USER` — your MongoDB username
- `DB_PASS` — your MongoDB password
- `PORT` — server port (default: 3000)

> ⚠️ Never commit your `.env` file. Make sure it's listed in `.gitignore`.

## 🚀 Getting Started (Local Setup)

1. Clone the repository
2. Run `npm install`
3. Add your `.env` file (see above)
4. Run `npm start`

Server will run on `http://localhost:3000` by default.