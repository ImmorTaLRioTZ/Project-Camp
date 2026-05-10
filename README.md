# Project Camp 🏕️

Project Camp is a full-stack, comprehensive Project Management Dashboard designed to streamline team collaboration, task tracking, and role-based access. Built on the modern MERN stack, it features a unique zero-trust security architecture, AWS S3 integrations, and a striking terminal-inspired dark-mode aesthetic.

---

## 🚀 Features

### Frontend (React + Vite)
- **Zero-Trust Security UI**: An unbypassable `<VerificationWall>` that completely restricts application access until users verify their email address.
- **Dynamic Dashboard**: Responsive, highly-interactive UI built using **React 19** and **Tailwind CSS v4**.
- **Role-Based UI Rendering**: The UI dynamically adapts based on the user's role (Admin, Project Admin, Member). For example, `Members` are restricted from seeing delete or create buttons for tasks and subtasks.
- **State Management**: Handled via **Redux Toolkit** for predictable and scalable authentication state.
- **Advanced Networking**: Configured with a custom **Axios** instance utilizing interceptors and automated `withCredentials: true` for secure, HTTP-only cookie transmission.

### Backend (Node.js + Express)
- **Robust Authentication**: Fully secure JWT authentication system utilizing HTTP-only cookies to prevent XSS attacks.
- **AWS S3 File Storage**: Integrated with `@aws-sdk/client-s3` and `multer.memoryStorage()` for seamless, memory-efficient direct-to-cloud file uploads for task attachments.
- **Role-Based Access Control (RBAC)**: Deeply integrated authorization middleware preventing users from accessing unauthorized projects or performing destructive actions unless they possess the required database-level roles.
- **Email Services**: Automated email dispatching via **Nodemailer** and beautifully crafted templates using **Mailgen** for email verification and password resets.
- **Data Integrity**: Strict input validation using `express-validator` preventing malformed requests from ever reaching the controllers.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React (v19), Vite, Tailwind CSS, React Router DOM, Redux Toolkit, Lucide React, Axios |
| **Backend** | Node.js, Express.js (v5), Mongoose, JWT, bcrypt, express-validator |
| **Database** | MongoDB |
| **Cloud & Storage** | AWS S3 (SDK v3), Multer |
| **Mailing** | Nodemailer, Mailgen, Mailtrap (Dev) |

---

## 📂 Directory Structure

The repository is structured as a monorepo containing both the frontend and backend architectures:

- `/project_camp_backend` - Express REST API, MongoDB Models, Middleware, and AWS configurations.
- `/project_camp_frontend` - Vite-powered React application containing components, routing, and state slices.

---

## ⚙️ Environment Configuration

To run this project locally, you must provide the following environment variables.

### Backend (`/project_camp_backend/.env`)
```env
PORT=4000
CORS_ORIGIN=http://localhost:5173

# MongoDB configuration
MONGO_DB_CONNECTION_STRING="your_mongodb_connection_string"

# JWT configuration
ACCESS_TOKEN_SECRET="your_access_secret"
ACCESS_TOKEN_EXPIRY="1d"
REFRESH_TOKEN_SECRET="your_refresh_secret"
REFRESH_TOKEN_EXPIRY="10d"

# AWS S3 (For Attachments)
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your_access_key"
AWS_SECRET_ACCESS_KEY="your_secret_key"
AWS_BUCKET_NAME="your_bucket_name"

# SMTP / Mailing (e.g. Mailtrap)
MAILTRAP_SMTP_HOST="sandbox.smtp.mailtrap.io"
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER="your_user"
MAILTRAP_SMTP_PASS="your_pass"

FORGOT_PASSWORD_REDIRECT_URL="http://localhost:5173/forgot-password"
```

---

## 🚦 Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/ImmorTaLRioTZ/Backend_tryouts.git
cd Project_Camp
```

**2. Start the Backend**
```bash
cd project_camp_backend
npm install
npm run dev
```

**3. Start the Frontend**
```bash
cd project_camp_frontend/frontend
npm install
npm run dev
```

Your frontend should now be running on `http://localhost:5173` and the backend on `http://localhost:4000`!

---

## 🛡️ Security Highlights
- **HTTP-Only Cookies**: JWT tokens are never accessible via JavaScript (`document.cookie`), mitigating XSS vector attacks.
- **Middleware Validation**: `express-validator` combined with a specialized `validate` error-handling middleware ensures 422 Unprocessable Entity responses instead of server crashes.
- **Orphan Protection**: Backend logic prevents the deletion of Admin users from projects, avoiding orphaned resources.

## 📝 License
ISC License
