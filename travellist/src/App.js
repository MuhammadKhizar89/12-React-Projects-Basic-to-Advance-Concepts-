import { useState } from "react";
export default function App() {
  const [items, setItems] = useState([]);
 function  handleClearAll(){
const confirmed =window.confirm("Are you sure you want to delete all items?");
if(!confirmed) return
  setItems([]);
 }
  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }
  function handledeleteItems(id) {
    setItems(items.filter((item) => item.id !== id))
  }
  function handleupdateItems(id) {
    setItems(items.map((item) => item.id === id ? { ...item, packed: !item.packed } : item))
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList handleClearAll={handleClearAll} handleupdateItems={handleupdateItems} items={items} handledeleteItems={handledeleteItems} />
      <Stats  items={items}/>
    </div>
  )
}

function Logo() {
  return (
    <h1>🌴 Far Away 💼</h1>
  )
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [items, setItems] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();
    console.log(items, description);
    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity: items,
      packed: false
    }
    onAddItems(newItem);
    setDescription("");
    setItems(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={items} onChange={(e) => setItems(Number(e.target.value))} >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>{num}</option>
        )
        )}
      </select>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Item..." />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, handledeleteItems, handleupdateItems ,handleClearAll }) {
 const [sortBy, setSortBy] = useState("input");
 let sortedItems;
if(sortBy==="input"){
  sortedItems=items;
}
else if(sortBy==="description"){
sortedItems=items.slice().sort((a,b)=>a.description.localeCompare(b.description));
}
else if(sortBy==="packed"){
  sortedItems=items.slice().sort((a,b)=>a.packed-b.packed);
}
  return (
    <div className="list">
      <ul >
        {sortedItems.map((item) => (
          <Item item={item} key={item.id} handledeleteItems={handledeleteItems} handleupdateItems={handleupdateItems} />
        ))}
      </ul>
<div className="actions">
<select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} name="" id="">
  <option value="input">Sort by Input Order</option>
  <option value="description">Sort By Description</option>
  <option value="packed">Sort by  packed Status</option>      
</select>
</div>
<button onClick={handleClearAll}>Clear List</button>
    </div>
  );
}
function Item({ item, handledeleteItems ,handleupdateItems}) {
  return (
    <li>
      <input type="checkbox"  value={item.packed} onChange={() => handleupdateItems(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}  {item.description}
      </span>
      <button onClick={() => handledeleteItems(item.id)}>❌</button>
    </li>
  );
}
function Stats({items}) {
  if(items.length===0) return ( <footer className="stats"><em>Start Adding Some Items to your packing List</em></footer>);
  const numItems=items.length;
const numPacked=items.filter((item)=>item.packed).length;

  return (
    <footer className="stats">
      {numPacked/numItems*100===100?(<em>All items have been packed!🎉🎉🎉</em>):(
      <em>{`You have ${numItems} items on your List and you already placed ${numPacked}(${numPacked/numItems*100})%`}</em>
    )}
    </footer>
  )
}
