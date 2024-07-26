import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  return (
    <li className="py-3  sm:flex sm:items-center
    sm:justify-between
    ">
      <p className="mb-1 min-w-40 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <UpdateItemQuantity quantity={quantity} pizzaID={pizzaId}/>
      <DeleteItem pizzaID={pizzaId}/>
    </li>
  );
}

export default CartItem;
