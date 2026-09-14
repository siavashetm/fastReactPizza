import Home from "./UI/Home";
import Error from "./UI/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu"; // as esm ro taqir mide
import Cart from "./features/card/Cart";
import CreateOrder, {
  action as creatOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Applayout from "./UI/Applayout";
import { action as updateOrderAction } from "./features/order/UpdateOrder";
const router = createBrowserRouter([
  {
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: creatOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
