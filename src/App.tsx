import { Header } from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import { CartProvider } from "./context/CartContext";
import { useEffect, useState } from "react";
import type { EstablishmentData } from "./types/establishment";
import type { ThemeData } from "./types/theme";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const [establishmentData, setEstablishmentData] =
    useState<EstablishmentData | null>(null);
  const [theme, setTheme] = useState<ThemeData | null>(null);

  useEffect(() => {
    async function getEstablishmentData() {
      try {
        const res = await fetch(
          "https://demoburger.stbl.com.br/core/v2/app/store/config/?format=json&app_variant=mobile"
        );
        const data: EstablishmentData = await res.json();

        if (!data.success) throw new Error("Could not fetch company data");

        setEstablishmentData(data);
        setTheme({
          primary: data.data.primary_color,
          secondary: data.data.secondary_color,
          background: data.data.background_color,
        });
      } catch (err: any) {
        console.error(err);
        throw new Error("Could not fetch company data");
      }
    }

    getEstablishmentData();
  }, []);

  return (
    <>
      <ThemeProvider
        theme={
          theme ?? {
            primary: "#FFF",
            secondary: "#000",
            background: "#000",
          }
        }
      >
        <CartProvider>
          {establishmentData && (
            <Header establishmentData={establishmentData.data} />
          )}
          <Menu />
          <Footer />
        </CartProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
