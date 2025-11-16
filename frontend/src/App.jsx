import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Collection from "./pages/Collection";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetails from "./pages/OrderDetails";
import Order from "./pages/Order";
import AboutSection from "./pages/About";
import ContactPage from "./pages/Contact";



const App = () => {
  return (
    <>
      <Toaster position="top-right" />

       {/* User Routes */}
        <Routes> 
         <Route path="/" element={<UserLayout />}>
           <Route index element={<Home />} />
           <Route path="login" element={<Login />} />
           <Route path="register" element={<Register />} />
           <Route path="profile" element={<Profile />} />
           <Route path="collection/:collection" element={<Collection />}/>
           <Route path="about" element={<AboutSection/>}/>
           <Route path="contact" element={<ContactPage/>}/>
           <Route path="product/:id" element={<ProductDetails />}/>
           <Route path="checkout" element={<Checkout />}/>
           <Route path="order-confirmation" element={<OrderConfirmation />}/>
           <Route path="order/:id" element={<OrderDetails />}/>
           <Route path="my-orders" element={<Order/>}/>
         </Route>
      </Routes>
    </>
  );
};

export default App;
