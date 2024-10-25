import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ShopNav from "./components/Shop/ShopNav";
import Shop from "./pages/Shop";
import AuthForm from "./pages/AuthForm";
import Goodspage, { loader as goodsLoader } from "./pages/Goodspage";
import ProductManager from "./pages/ProductManager";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderFailed from "./pages/OrderFailed";
import CheckOrder from "./pages/CheckOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShopNav />,
    children: [
      { index: true, element: <Shop /> },
      { path: ":GoodsID", element: <Goodspage />, loader: goodsLoader },
      { path: "Authform", element: <AuthForm /> },
      { path: "ProductManager", element: <ProductManager /> },
      { path: "checkout", element: <Checkout /> },
      { path: "order-confirmation", element: <OrderConfirmation /> },
      { path: "order-failed", element: <OrderFailed /> },
      { path: "checkOrder", element: <CheckOrder /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
