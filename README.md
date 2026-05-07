# HavticHQ 🚀
### Premium SaaS Platform for Invoicing & Project Management

HavticHQ is a modern, high-performance SaaS solution designed for small to medium-sized businesses and freelancers. It streamlines business operations by providing a unified interface for professional invoicing, client relationship management, and agile project tracking via an interactive Kanban board.

---

## ✨ Key Features

- **📊 Advanced Invoicing**: Create, manage, and track professional invoices with automated tax calculations and multi-currency support.
- **👥 Client Management**: Centralized hub to manage all your business relationships and view transaction history.
- **📋 Interactive Kanban Board**: Efficiently manage tasks and projects with a drag-and-drop Kanban interface and real-time persistence.
- **📈 Analytics & Reports**: Gain insights into your business with dynamic charts showing revenue trends and invoice status distributions.
- **🌍 Multi-Language Support**: Fully translated in 4 languages: **English, Bengali, Spanish, and French**.
- **🎨 Branding & Customization**: Customize your invoice theme, logo, and company details with a real-time live preview.
- **🛡️ Security & Privacy**: Built with modern security standards, including encrypted data and PCI-DSS compliant payment gateway connectors.
- **🌓 Dark Mode & Ultra-Responsive**: A premium UI/UX experience that works seamlessly on any device.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Framer Motion (Animations)
- Recharts (Data Visualization)
- Lucide React (Icons)
- Tailwind CSS

**Backend:**
- NestJS (Framework)
- MongoDB (Database)
- Axios (API Communication)
- jsPDF (Document Generation)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/havticstudio/HavticHQ.git
   cd HavticHQ
   ```

2. **Setup the Server:**
   ```bash
   cd server
   npm install
   ```
   - Create a `.env` file in the `server` directory and add:
     ```env
     PORT=3000
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_secret_key
     ```
   - Start the server:
     ```bash
     npm run start:dev
     ```

3. **Setup the Client:**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```
   - The app will be available at `http://localhost:5173`.

---

## 📂 Project Structure

```text
HavticHQ/
├── client/             # React Frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Application screens
│   │   ├── context/    # State management (Language/Theme)
│   │   └── api.js      # Axios configuration
├── server/             # NestJS Backend
│   ├── src/
│   │   ├── invoices/   # Invoicing logic
│   │   ├── clients/    # Client management
│   │   └── users/      # Authentication & User details
```

---

## 📄 License

This project is licensed under the MIT License.

---

**Developed with ❤️ by HavticHQ Team.**
