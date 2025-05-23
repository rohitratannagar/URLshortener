# 🔗 URL Shortener

A full-stack URL shortening application that enables users to create, manage, and share compact links with built-in user roles and admin privileges.

## 🌐 Live Demo

👉 [Visit Website](https://urlshortener-7jh1.onrender.com)

## 📂 Source Code

🔗 [GitHub Repository](https://github.com/rohitratannagar/URLshortener)

## ✨ Features

- 🔐 **Authentication & Authorization**: Secure login, signup, logout, and session handling.
- 🎯 **Role-Based Access**:
  - **Users** can create, manage, and delete their URLs.
  - **Admins** can view, delete, and manage all users' URLs and handle upgrade requests.
- 🔗 **URL Shortening**: Converts long links into compact, shareable short URLs.
- 📊 **Admin Dashboard**: Admins handle 100+ user upgrade requests with ease.
- 💻 **Templating**: Built with EJS for server-side rendered, responsive frontend.
- 📈 **Database**: Stores 2,000+ URLs efficiently in MongoDB.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript)
- **Database**: MongoDB
- **Authentication**: Session-based, with role support
- **Deployment**: Render

## 🚀 Getting Started

To run the app locally:

```bash
git clone https://github.com/rohitratannagar/URLshortener.git
cd URLshortener

npm install
npm start
