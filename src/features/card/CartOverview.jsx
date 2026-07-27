import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div>
      <p>
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      {/* <a href="#">Open cart &rarr;</a> */}
      <Link to="/cart">open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
