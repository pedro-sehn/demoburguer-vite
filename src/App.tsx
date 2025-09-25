import { Header } from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Menu />
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
