# Recipe Book (CRUD in JavaScript)

![Badge JS](https://img.shields.io/badge/Language-JavaScript-yellow)
![Badge Bootstrap](https://img.shields.io/badge/Style-Bootstrap-purple)
![Badge Status](https://img.shields.io/badge/Status-Finished-green)

> Final project for the **Front-End Development II** course.

An interactive web application for managing culinary recipes. The system allows creating, viewing, editing, deleting (CRUD), and favoring recipes, consuming a simulated REST API.

## 🚀 Features

- **Complete CRUD**: Create, Read, Update, and Delete recipes.
- **Real-time Search**: Filter recipes by title or type as you type.
- **Favorites System**: Mark your favorite recipes for quick access.
- **Dynamic Interface**: DOM manipulation via JavaScript.
- **Data Persistence**: Uses JSON Server to simulate a real database.

## 🛠️ Built With

- **HTML5** & **CSS3**: Semantic structure and responsive styling.
- **Bootstrap 5**: Framework for responsive layout and UI components.
- **JavaScript (ES6+)**: Application logic using `async/await`.
- **Axios**: Library for optimized HTTP requests.
- **JSON Server**: RESTful API simulation for the backend.
- **Git**: Version control.

## 📂 Project Structure

The code was organized following the separation of concerns principle:

- `js/api.js`: Service layer (backend communication).
- `js/ui.js`: View layer (DOM and HTML manipulation).
- `js/main.js`: Controller (event management and initialization).

## 📦 Getting Started

### Prerequisites
You need [Node.js](https://nodejs.org/) installed to run the simulated server.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AlanAmaral4/CookBook.git
   cd CookBook
   ```

2. **Start the Backend (API)**
   The project uses `json-server` to simulate the database.

   ```bash
   cd backend
   npx json-server --watch db.json --port 3000
   ```
   *Keep this terminal open.*

3. **Start the Frontend**
   Open the `index.html` file directly in your browser or use the VSCode "Live Server" extension.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
## 👨‍💻 Author

**Alan Carlos do Amaral Costa** | Internet Systems Technology

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alan-carlos-amaral-costa-b189873a0/)