import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import ItemsPage from "./pages/ItemsPage";
import { CartProvider } from "./context/CartContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CategoriesPage />} />
          <Route path="/items/:categoryId" element={<ItemsPage />} />
        </Routes>
      </Router>
    </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
