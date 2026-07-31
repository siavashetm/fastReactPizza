import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/card/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function Applayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  console.log(navigation);

  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default Applayout;
