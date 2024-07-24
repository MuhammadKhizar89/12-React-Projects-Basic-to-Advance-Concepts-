import { combineReducers, createStore } from "redux";
const initiaStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}
const initiaStateCustomer = {
    fullName: "",
    nationaLID: "",
    createdAt:"",
}

function accountReducer(state = initiaStateAccount, action) {//usereducer may yh farq hy kay is may stae kay sath hi initialState likhty hn
    switch (action.type) {
        case "account/deposit": //first is domain and second is action in redux
            return { ...state, balance: state.balance + action.payload }
        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload }
        case "account/requestLoan":
            if (state.loan > 0) return state;
            return { ...state, loan: action.payload.amount,loanPurpose:action.payload.purpose 
                ,balance: state.balance + action.payload.amount
            }
        case "account/payLoan":
            return {
                ...state, loan: 0, loanPurpose: "",
                balance: state.balance - state.loan
            }
        default:
            return state
    }
}

function customerReducer(state = initiaStateCustomer, action) {
    switch (action.type) {
        case "customer/create":
            return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt }
        case "customer/updateName":
            return { ...state, fullName: action.payload }
        default:
            return state
    }
}
const rootreducer=combineReducers({
    account:accountReducer,
    customer:customerReducer,
})

const store = createStore(rootreducer);
// store.dispatch({ type: "account/deposit", payload: 100 })
// console.log(store.getState())
// store.dispatch({
//     type: "account/requestLoan",
//     payload: {
//         amount: 1000, purpose: "Buy a Car"
//     }
// })
// console.log(store.getState())



// Redux ActionsCreators
//   Redux can work with Action Creators but this is conventional

// react developer puts these actions in seperate files
function deposit(amount){
    return ({type:"account/deposit",payload:amount})
}
function withdraw(amount){
    return ({type:"account/withdraw",payload:amount})
}
function requestLoan(amount,purpose){
    return ({type:"account/requestLoan",payload:{amount,purpose}})
}
function payLoan(){
    return ({type:"account/payLoan"})
}
store.dispatch(deposit(100))
store.dispatch(withdraw(100))
store.dispatch(requestLoan(1000,"Buy a Car"))
console.log(store.getState())

// store.dispatch(payLoan())
console.log(store.getState())

function createCustomer(fullName,nationalID,createdAt){
    return ({type:"customer/create",payload:{fullName,nationalID,createdAt:new Date().toISOString()}})
}
function updateName(name){
    return ({type:"customer/updateName",payload:name})
}
function updateNationalID(nationalID){
    return ({type:"customer/updateNationalID",payload:nationalID})
}
store.dispatch(createCustomer("John Doe","1234567890","2022-01-01"))

console.log(store.getState());
