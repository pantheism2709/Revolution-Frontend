# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Revolution Frontend

The Revolution frontend is built using the following technologies:

- **React.js**:
  - A JavaScript library for building user interfaces.
  - Used for creating dynamic components and managing the UI.
  
- **Tailwind CSS**:
  - A utility-first CSS framework.
  - Used for styling components and ensuring responsiveness.
  
- **Redux Toolkit**:
  - A state management library.
  - Used for managing global application state, including authentication and cart data.

## Features

- **Authentication**:
  - JWT-based authentication ensures secure user sessions.
  - Users receive a token upon successful login, which they include in subsequent requests to access protected routes.
  
- **Product Management**:
  - Admins can add products and edit the roles of user.
  - Users can view and filter available products.
  
- **Cart Functionality**:
  - Users can add items to their cart.
  - Cart allows adjusting item quantities.
  
- **Payment**:
  - Stripe integration for secure online transactions.

## Getting Started

1. **Clone the repository:**
 git clone https://github.com/your-username/revolution-frontend.git


2. **Set environment variables:**
- Create a `.env` file in the frontend directory.
- Add the following variables:
  ```
  VITE_API_URL=""  ( endpoint on which your backend is running )
  
  ```

3. **Install dependencies and start the development server:**
   npm install
   npm start


4. **Access the app:**
- Open [http://localhost:5173](http://localhost:5173) in your browser.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.


