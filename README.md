# Shuvidha Counter 🧾 – Business Management & Billing System

Shuvidha Counter is a full-stack business management tool designed to streamline inventory, billing, transaction tracking, and ledger management for small to medium-sized businesses. It offers a customizable, secure, and GST-compliant solution tailored for specific industries like UPVC, retail, and wholesale.

## 🚀 Features

- 🔐 **Secure Login** with Google OAuth & JWT-based session handling  
- 📦 **Inventory Management** with support for custom templates per industry  
- 💸 **Billing System** with GST-ready multi-page invoices, totals in words, and PDF export  
- 🧾 **Invoice Settings** including custom invoice titles, party details, signatures, and auto-filled fields  
- 📊 **Transaction Ledger** tracking both buy and sell operations  
- 🧾 **Invoice Generator** with clean UI, professional layout, and multi-page PDF output  
- 📥 **Excel Upload** support for bulk item management  
- 🎨 **Clean UI** built with Tailwind CSS and responsive layouts  
- ⚙️ **Backend APIs** with RESTful structure and MongoDB for storage  


## 🛠️ Tech Stack

**Frontend:**  
- React.js  
- Tailwind CSS  
- Axios  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB  
- JWT, Google OAuth  
- PDFKit (for invoice generation)

**Deployment & DevOps:**  
- Render (Frontend + Backend)
- GitHub Actions (CI/CD)
- Docker (Dev Environment)


## 📦 Installation & setup (locally)

### 1. Clone the repository
```bash
git clone https://github.com/errorthejod/ShuvidhaCounter.git
cd ShuvidhaCounter
```

### Prerequisites
- Node.js
- MongoDB
- Google OAuth credentials (Client ID and Secret)

### 2.Setup Backend

```bash
cd server
npm install
```

### 3.Create a .env file inside /server and add:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

### 4.Then start the backend:
```bash
npm run start
```

### 5. Setup Frontend
```bash
cd client
npm install
```

### 6. Create a `.env` file inside the `client` directory with the following content:
```bash
VITE_API_BASE_URL=http://localhost:5000/api
VITE_BASE_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 7. Start the frontend development server:
```bash
npm run dev
```






