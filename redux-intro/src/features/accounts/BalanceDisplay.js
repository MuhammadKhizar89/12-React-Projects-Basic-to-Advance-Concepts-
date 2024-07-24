import { connect, useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

// ModernWay
// function BalanceDisplay() {
//  const balance=useSelector((store)=>store.account.balance);
//   return <div className="balance">{formatCurrency(balance)}</div>;
// }


// Old Way
function BalanceDisplay({balance}) {
   return <div className="balance">{formatCurrency(balance)}</div>;
 }
 
function mapStateToProp(state) {
  return { balance: state.account.balance };
} 
export default connect(mapStateToProp) (BalanceDisplay);
