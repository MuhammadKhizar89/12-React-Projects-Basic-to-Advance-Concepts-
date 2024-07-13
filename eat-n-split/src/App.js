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
const [friends,setFriends]=useState(initialFriends);  
const [showAddFriend,setShowAddFriend]=useState(false);
const [selectedfiend,setSelectedFriend]=useState(null);
function handleSplitBill(value){
  console.log(value)
setFriends(friends.map((f)=>(
  f.id===selectedfiend.id?{...f,balance:f.balance+value}:f
))
)

}

function handleSetSelected(f){
  setSelectedFriend(f);
  setShowAddFriend(false);

 } 
 function setFriendsValue(f)
  {
    setFriends([...friends,f]);
    setShowAddFriend(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
      <FreindList selectedfiend={selectedfiend} handleSetSelected={handleSetSelected} friends={friends} />
      {showAddFriend && <FormAddFriend setFriendsValue={setFriendsValue}/>}
      <Button onClick={()=>{setShowAddFriend(!showAddFriend);setSelectedFriend(null); }}>{!showAddFriend?"Add Freind":"Close"}</Button>
      </div>
      {selectedfiend && <FormSplitBill handleSplitBill={handleSplitBill} friend={selectedfiend}/>}
    </div>
    )
}
function FreindList({selectedfiend,handleSetSelected,friends})
{
  return( 
     <ul>
      {
      friends.map((friend)=>(
          <Freind key={friend.id} selectedfiend={selectedfiend}handleSetSelected={handleSetSelected} friend={friend}/>
        ))
      }
      </ul>
  )
}
function Freind({friend,handleSetSelected,selectedfiend})
{
  return(
    <li className={`${selectedfiend?.id===friend.id?"selected":""}`}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance<0 && (<p className="red"> You owe {friend.name} {Math.abs(friend.balance)}</p>)}
      {friend.balance>0 && (<p className="green">  {friend.name} owes you {Math.abs(friend.balance)}</p>)}
      {friend.balance===0 && (<p > You and  {friend.name} are Even</p>)}
    {selectedfiend?.id!==friend.id ?( <Button onClick={()=>handleSetSelected(friend)}>Select</Button>):(<Button onClick={()=>handleSetSelected(null)}>Close</Button>)}
    </li>
  )
}

function FormAddFriend({setFriendsValue})
{
  const [name,setName]=useState("");
  const [image,setImage]=useState("https://i.pravatar.cc/48");
  function handleSubmit(e)
  {
    e.preventDefault();
    if(!name||!image)return;
    const id=crypto.randomUUID();
   const newFriend={
    id,
    name,
    image:`${image}?=${id}`,
    balance:0
   };
   setFriendsValue(newFriend);
   setImage("https://i.pravatar.cc/48?u=49")
   setName("");
  }

  return(
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="">👦Friend name</label>
      <input value={name} onChange={(e)=>setName(e.target.value)} type="text" />

      <label htmlFor="">📷Image URL</label>
      <input value={image} onChange={(e)=>setImage(e.target.value)} type="text" />
      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill({friend,handleSplitBill})
{
const [amount,setAmount]=useState(0);
const [myexpense,setMyExpense]=useState(0);
const [whispaying,setWhispaying]=useState("user");
const freindexpense=amount ? amount-myexpense:0;

function handleSubmit(e)
{
  e.preventDefault();
  if(!amount||!myexpense)return;
  handleSplitBill(whispaying===`user`?freindexpense:-myexpense);
  setAmount(0);
  setMyExpense(0);
  setWhispaying("user");
}
return(
    <form  className="form-split-bill">
      <h2>Split a bill with {friend.name}</h2>
      <label htmlFor="">💵Bill Value</label>
      <input value={amount} onChange={(e)=>setAmount(e.target.value)} type="Number" />
      
      <label htmlFor="">💵Your Expense</label>
      <input  value={myexpense} onChange={(e)=>setMyExpense(Number(e.target.value)>amount?myexpense:Number(e.target.value))} type="Number" />
      
      <label htmlFor="">💵{friend.name}'s Expense</label>
      <input value={freindexpense} type="Number" disabled />
      
      <label htmlFor="">😁 Who is paying the bill</label>
      <select value={whispaying} onChange={(e)=>setWhispaying((e.target.value))} name="" id="">
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>

      </select>
      <Button onClick={handleSubmit}>Add</Button>
    </form>
  )
}