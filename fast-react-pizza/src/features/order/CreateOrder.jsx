import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";
import { formatCurrency } from "../../utilities/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );
function CreateOrder() {
const [withPriority,setWithPriority]=useState(false);
  const navigation=useNavigation();
const isLoading=navigation.state==="loading"
const getTotalPrice=useSelector(state=>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0) );
  const priorityPrice=withPriority?0.2:0;
const totalPrice=getTotalPrice+priorityPrice;
  const formErrors=useActionData();
  const cart = useSelector((store) => store.cart.cart);
  const {username,status:addressStatus,position,address,
error:errorAddress

  }=useSelector((store)=>store.user);
  const isLoadingAddress=addressStatus==="loading";
  const dispatch=useDispatch();
  if(cart.length===0)return <EmptyCart/>;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let&apos;s go!</h2>

      <Form method="POST" >
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input w-full" type="text" defaultValue={username} name="customer" required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label  className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
     {formErrors?.phone && <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{formErrors.phone}</p>}
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label  className="sm:basis-40">Address</label>
          <div className="grow">
            <input 
            className="input w-full"
            type="text" defaultValue={address} disabled={isLoadingAddress} name="address" required />
          </div>
          {addressStatus==='error' && <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{errorAddress}</p>}
          <span className="absolute right-[3px] z-50 ">
        {!errorAddress&& <Button type="small" onClick={(e) =>{ 
          e.preventDefault();
          dispatch(fetchAddress())}}>Get Position</Button>}
        </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
          className="h-6 w-6 accent-yellow-400
          focus:outline-none focus:ring
          focus:ring-yellow-300 focus:ring-offset-2
          "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" 
          value={JSON.stringify(cart)}
          />
          <input type="hidden" name="position"
          value={position.longitude&&position.latitude
?`${position.longitude},${position.latitude}`:""
          }
          
          />
          <Button type="primary" disabled={isLoading||isLoadingAddress}>{ isLoading ? "Placing Order..." : (`Order now From ${formatCurrency(totalPrice)}`)}</Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data=Object.fromEntries(formData);
  const order={
    ...data,
    cart:JSON.parse(data.cart),
    priority:data.priority==="true"
  }
  const errors={};
  if(!isValidPhone(order.phone)){
    errors.phone="Please enter a valid phone number"
  }
  if(Object.keys(errors).length>0)return errors
  console.log(order);
  const neworder=await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${neworder.id}`);
}
export default CreateOrder;