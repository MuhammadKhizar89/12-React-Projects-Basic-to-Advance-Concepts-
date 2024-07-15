import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import StarRating from './StarRating';
// function Test(){
//   const [avgImdbRating, setavgImdbRating] = useState(0);
//   return(
//   <div>
// <StarRating maxStar={5} messages={['😭','😢','😓','😊','😁'] }
//   setrating={setavgImdbRating}
// />
// <p>Rating   {avgImdbRating}</p>
//     </div>
//   )
// }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
{/* <Test/> */}
  </React.StrictMode>
);
