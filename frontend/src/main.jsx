import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './context/AuthContext.jsx';
import UserContext from './context/UserContext.jsx';
import ShopContext from './context/ShopContext.jsx';
import CartContext from './context/CartContext.jsx';



createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <AuthContext>
      <UserContext>
        <ShopContext>
          <CartContext>
            <App />
          </CartContext>
        </ShopContext>
      </UserContext>
    </AuthContext>
  </BrowserRouter>
);
