# Foodie React Native App

## 📌 Project Overview
Foodie is a **MERN stack** (MongoDB, Express, React Native, Node.js) mobile application for food ordering. It allows users to browse menus, place orders, and manage their accounts.

## 🛠 Tech Stack
- **Frontend:** React Native, Expo
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JWT, Twilio (for OTP verification)
- **Networking:** Axios

---

#Project preview

#Screenshots

SignUp page
![SignU page](https://github.com/user-attachments/assets/6824d543-eff9-48ad-9a6c-f53e089eeca3)

![Admin logged in page](https://github.com/user-attachments/assets/4e468e98-e135-4eca-93a9-bb7e4e3698ce)
![Add Tag page](https://github.com/user-attachments/assets/f75c6b59-db08-4d69-8505-ce1711a0568e)
![Add food page](https://github.com/user-attachments/assets/ad6ea992-748a-4a00-96aa-76eff58d724d)
![Add new food](https://github.com/user-attachments/assets/51fd0bac-d357-4e74-a26d-ab977b3c5679)
![Add Sides & Drinks](https://github.com/user-attachments/assets/4f57c252-9b85-4e23-8dd0-78150c2cc415)
![Front page](https://github.com/user-attachments/assets/1be2d4d9-5e69-4b00-9fb3-353661bbfdb1)
![Food Desc page](https://github.com/user-attachments/assets/4d0593f6-14ad-4683-8e7e-1ec269d147fa)
![Update Food page](https://github.com/user-attachments/assets/6d199fb4-ccce-47e6-9396-3bd1dea8f034)
![Add Sides & Drinks](https://github.com/user-attachments/assets/b3e39f26-79bf-46f9-b0c6-2cb52b498d39)
![Choose category](https://github.com/user-attachments/assets/a0c06656-f506-42e8-b328-06163cde7f68)
![Checkout page](https://github.com/user-attachments/assets/ce95088e-94b0-48b3-a417-9db51a6aded7)
![OTP Sent to User](https://github.com/user-attachments/assets/f3361a27-8939-4a0b-83f8-64cce0013f29)
![User got OTP SMS](https://github.com/user-attachments/assets/fa356fb3-d501-469c-b99d-dba1e7ca70b4)
![User enters OTP](https://github.com/user-attachments/assets/a6bfbdd9-cff9-4e0e-8e05-8c4e2f8a1fa7)
![User OTP Verified](https://github.com/user-attachments/assets/da201964-579e-4eae-8577-f4ca19359f70)







## 🚀 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/foodie-react-native.git
cd foodie-react-native-main
```

### **2️⃣ Backend Setup**
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure `.env` file (create one if missing):
   ```ini
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   ```
4. Start the backend server:
   ```sh
   node index.js
   ```

### **3️⃣ Frontend Setup**
1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Update `BASE_URL` in API service files to point to your backend (Cloudflare Tunnel recommended).
4. Start the app:
   ```sh
   npx expo start
   ```

---

## 🛠 Troubleshooting
- **Cannot connect to backend?** Run `cloudflared tunnel --url http://localhost:5000` and use the provided URL in your frontend.
- **Expo font errors?** Ensure fonts are loaded before usage.
- **Headers already sent error?** Check if multiple responses are being sent in Express routes.

---

## 📌 Features
✅ User Authentication (JWT + OTP)  
✅ Food Ordering System  
✅ Secure API Communication  
✅ Responsive UI & Smooth Navigation  

---

## 📜 License
This project is **open-source** and available under the MIT License.

---

## 🤝 Contributing
Feel free to fork, submit issues, or create pull requests! 🎉

