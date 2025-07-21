# 📦 Inventory Management System

<p align="center">
  <img src="pic.jpg" alt="Inventory Logo" width="120" style="border-radius:50%">
</p>

<p align="center">
  <b>A modern, browser-based solution for tracking inventory, sales, and purchases.</b><br>
  <i>Simple. Fast. No backend required.</i>
</p>

<p align="center">
  <a href="#features"><img src="https://img.shields.io/badge/Features-8+-blueviolet" alt="Features"></a>
  <a href="#technologies-used"><img src="https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-orange" alt="Tech"></a>
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-green" alt="License"></a>
</p>

---

## ✨ Demo


<img width="1919" height="942" alt="image" src="https://github.com/user-attachments/assets/cac87e51-973c-4c64-b9ee-b7e406a3449a" />


---

## 🚀 Features

- 🔐 **User Authentication** — Simple login system (default: `admin`/`admin`)
- 🏠 **Dashboard** — Overview section *(pending implementation)*
- 📦 **Inventory Management**
  - Add, edit, and delete items
  - Search by manufacturer
  - Sort by name
  - Paginated table
- 💸 **Sales Tracking** — Add/view sales, sort by availability
- 🛒 **Purchases Tracking** — Add/view purchases, sort by availability
- 📁 **Data Import/Export** — Save/load inventory, sales, and purchases as Excel files (`.xlsx`)
- 🔒 **Logout** — Securely log out and optionally save data

---

## 🗂️ File Structure

```
├── inventory.html           # Main inventory interface
├── inventory-script.js      # Inventory, sales, and purchases logic
├── inventory-styles.css     # Inventory UI styles
├── login.html               # Login page
├── login-script.js          # Login/auth logic
├── login-styles.css         # Login page styles
├── pic.jpg                  # Logo (sidebar & demo)
```

---

## 🛠️ Technologies Used

- **HTML5** & **CSS3** — Modern, responsive UI
- **JavaScript** — Vanilla, no frameworks
- **[SheetJS](https://sheetjs.com/)** — Excel file import/export

---

## 🏁 Getting Started

1. **Clone or Download** this repository.
2. **Open `login.html` in your browser** to start the application.
3. **Login** with:
   - Username: `admin`
   - Password: `admin`
4. **Navigate** using the sidebar: Dashboard, Storage, Sales, Purchases, Import/Export.

> ⚡ **Tip:** All data is stored in memory. Use the Save/Load buttons to persist your data via Excel files.

---

## 💡 Customization

- 🖼️ **Change the Logo:** Replace `pic.jpg` with your own (square recommended; shown as a circle).
- 👤 **Add More Users:** Edit the `users` array in `login-script.js`.

---

## 📋 Usage Notes

- Data is **not** persistent unless saved manually (Excel file).
- Uses `localStorage` for authentication state.
- Only the default admin user is supported by default. *(Extendable!)*

---

## 📄 License

This project is open source and free to use for any purpose. Contributions welcome!

---

<p align="center">
  <b>Made with ❤️ for simple inventory management</b>
</p> 
