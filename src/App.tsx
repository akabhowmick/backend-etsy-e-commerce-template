import "./App.css";
import { RouterProvider } from "react-router-dom";

// Context Providers
import { CartProvider } from "./providers/CartProvider";
import { UserProvider } from "./providers/UserProvider";

// sections or components
import { Footer } from "./Components/Footer/Footer";
// import { Cart } from "./Pages/Cart/Cart";
import { Routes } from "./Components/Layouts/Router";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <RouterProvider router={Routes()} />
            <Footer />
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export default App;
