import {useState} from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933379",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=49",
    balance: 0,
  },
];
function Button({children,onClick})
{
  return (
    <button className="button" onClick={onClick}>{children}</button>
  );
}
export default function App()
{
  
  const [showAddFriend,setShowAddFriend]=useState(false);
  return (
    <div className="app">
      <div className="sidebar">
      <FreindList/>
      {showAddFriend && <FormAddFriend/>}
      <Button onClick={()=>setShowAddFriend(!showAddFriend)}>{!showAddFriend?"Add Freind":"Close"}</Button>
      </div>
      <FormSplitBill/>
    </div>
    )
}
function FreindList()
{
  const friends=initialFriends;
  return( 
     <ul>
      {
      friends.map((friend)=>(
          <Freind key={friend.id} friend={friend}/>
        ))
      }
      </ul>
  )
}
function Freind({friend})
{
  return(
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance<0 && (<p className="red"> You owe {friend.name} {Math.abs(friend.balance)}</p>)}
      {friend.balance>0 && (<p className="green">  {friend.name} owes you {Math.abs(friend.balance)}</p>)}
      {friend.balance===0 && (<p > You and  {friend.name} are Even</p>)}
    <Button>Send</Button>
    </li>
  )
}

function FormAddFriend()
{
  return(
    <form className="form-add-friend">
      <label htmlFor="">👦Friend name</label>
      <input type="text" />

      <label htmlFor="">📷Image URL</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill()
{
  return(
    <form  className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label htmlFor="">💵Bill Value</label>
      <input type="text" />
      
      <label htmlFor="">💵Your Expense</label>
      <input type="text" />
      
      <label htmlFor="">💵X's Expense</label>
      <input type="text" disabled />
      
      <label htmlFor="">😁 Who is paying the bill</label>
      <select name="" id="">
        <option value="user">You</option>
        <option value="friend">X</option>

      </select>
      <Button>Add</Button>
    </form>
  )
}