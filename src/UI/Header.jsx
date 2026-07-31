import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

function Header() {
  return (
    <header>
      <SearchOrder />
      <Link to="/">fast react pizza Co.</Link>
    </header>
  );
}

export default Header;
