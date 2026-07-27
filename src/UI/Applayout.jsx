import { Outlet } from "react-router-dom";
import CartOverview from "../features/card/CartOverview";
import Header from "./Header";

function Applayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default Applayout;
