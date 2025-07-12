# 🌍 WanderLust – Fullstack Booking App 

WandeLust is a modern fullstack travel booking platform inspired by Airbnb. Users can explore listings, book stays, leave reviews, and manage trips — all with authentication, validation, and responsive design.

> 🚧 Razorpay/Stripe payment is not yet integrated — bookings are processed without payment.

---

## 🚀 Features

### 🔐 Authentication & Security
- User signup, login, logout
- Protected routes using Express middleware
- Role-based access (user vs guest)

### 🏡 Listings
- Create, update, delete listings
- Image upload & location search
- Filter by categories (Rooms, Castles, Pool, etc.)

### 📅 Bookings
- Book listings with check-in/check-out
- “My Trips” page showing booking history
- Cancel bookings (removes booking + updates listing)
- Backend logic handles booking-to-listing sync

### 💬 Reviews
- Users can review listings
- Reviews can be edited or deleted
- Star-based ratings (1–5)
- Average rating display

### 📦 Validation
- ✅ **Frontend**: Bootstrap form validation with feedback
- ✅ **Backend**: Joi validation schemas for listings, reviews, and bookings

### 🧰 Utilities & Middleware
- `utils/catchAsync.js` – DRY wrapper for async controllers
- `middleware.js` – Auth protection, role checks, and validation
- Flash messages for user feedback
- Method override for PUT/DELETE in forms

### 🛡️ Route Protection
- Listing creation and booking routes protected using middleware
- Cannot review without logging in
- Cannot delete others' reviews/bookings

### 📱 Responsive Design
- Mobile-first design using Bootstrap
- Hamburger menu on mobile
- Scrollable filters with sticky toggle
- Login/Signup popup UI for mobile

---

## 🧠 Tech Stack

| Layer       | Tech                    |
|-------------|-------------------------|
| Frontend    | HTML, EJS, Bootstrap    |
| Backend     | Node.js, Express        |
| Database    | MongoDB, Mongoose       |
| Auth        | Passport.js, Cookies    |
| Validation  | Joi (backend), Bootstrap (frontend) |

---

## 📂 Folder Structure
wanderLust/
│
├── models/ # Mongoose schemas (User, Listing, Booking, Review)
├── routes/ # Express route files
│ ├── listings.js
│ ├── bookings.js
| ├── User.js
│ └── reviews.js
├── controllers/ # Logic for each route
├── views/ # EJS templates (layout, partials, forms)
├── public/ # Static files (CSS, JS)
├── middleware.js # Auth, validation, error handling
├── utils/ # catchAsync, ExpressError, Joi schemas
├── app.js # Main Express app
└── .env # Environment variables





---

## 🛠️ Installation & Setup

### 1. Clone the Repo
```bash
git clone https://github.com/mohd-adil-2005/we_project.git
cd we_project


and after
DATABASE_URL=mongodb://localhost:27017/wanderLust
SECRET=your-secret-key





👤 Author
Mohd Adil
📎 GitHub
📎 LinkedIn


