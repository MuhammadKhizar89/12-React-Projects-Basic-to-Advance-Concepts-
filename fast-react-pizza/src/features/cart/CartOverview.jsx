import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utilities/helpers";
function CartOverview() {
  const cartquantity = useSelector(state =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
  );
  const getTotalPrice=useSelector(state=>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0) );

  if (cartquantity === 0) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 uppercase text-stone-200 px-4 py-4 sm:px-6 text-sm md:text-base">
      <p className="space-x-4 sm:space-x-6 font-semibold text-stone-300">
        <span>{cartquantity} pizzas</span>
        <span>{formatCurrency(getTotalPrice)}</span> {/* Placeholder for total price */}
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
