
const initiaStateCustomer = {
    fullName: "",
    nationaLID: "",
    createdAt:"",
}


export default function customerReducer(state = initiaStateCustomer, action) {
    switch (action.type) {
        case "customer/create":
            return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt }
        case "customer/updateName":
            return { ...state, fullName: action.payload }
        default:
            return state
    }
}


export function createCustomer(fullName,nationalID,createdAt){
    return ({type:"customer/create",payload:{fullName,nationalID,createdAt:new Date().toISOString()}})
}
export function updateName(name){
    return ({type:"customer/updateName",payload:name})
}
export function updateNationalID(nationalID){
    return ({type:"customer/updateNationalID",payload:nationalID})
}