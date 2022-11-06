import { useContext } from "react";
import Context from "./context/Context";
import NavBar from "./components/NavBar";
import Products from "./pages/Products";
import ProductManagement from "./pages/ProductManagement";
import ReplenishStock from "./pages/ReplenishStock";
import ChangeLog from "./pages/ChangeLog";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './styles/App.css';

function App() {
  const { screenSelector } = useContext(Context);
  const { screenNumber, hasInput } = screenSelector;

  return (
    <div className="app-container">
      <Header />
      <NavBar />
      {screenNumber === 0 && <Products />}
      {screenNumber === 1 && <ReplenishStock />}
      {screenNumber === 2 && <ChangeLog />}
      {screenNumber === 3 && <ProductManagement />}
      <Footer prodInfo={ hasInput }/>
    </div>
  );
}

export default App;
