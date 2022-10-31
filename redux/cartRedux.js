import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
 name : 'cart',
 initialState:{
  products:[],
  quantity:0,
  total:0,
  wishList:[]
 },
 reducers:{
  addProduct:(state,action)=>{
   state.products = [...state.products,{...action.payload,specificId : action.payload.product._id + new Date().getSeconds()}]
   
   state.quantity += state.wishList.find((p)=>p._id==action.payload.product._id)?0: 1
   state.total+=action.payload.product.price * action.payload.quantity
   state.wishList = [...state.wishList.filter((p)=>p._id!==action.payload.product._id)]
  },
  decreaseProduct:(state,action)=>{
   state.total-= Number(action.payload.product.price)
   state.products = [action.payload,...state.products.filter((p)=>p.product.specificId!==action.payload.specificId)]
  },
  increaseProduct:(state,action)=>{
   state.total+= Number(action.payload.product.price)
   state.products = [action.payload,...state.products.filter((p)=>p.product.specificId!==action.payload.product.specificId)]
  },
  removeProduct:(state,action)=>{
   state.products=[...state.products.filter((p)=>p.product._id!==action.payload.product._id)]
   state.quantity -=1
   state.total-= action.payload.product.price * action.payload.quantity
  },
  addToWishList:(state,action)=>{
   state.wishList = [...state.wishList,action.payload]
   state.quantity += 1
  },
  removeFromWishList:(state,action)=>{
   state.wishList=[...state.wishList.filter((p)=>p._id!==action.payload._id)]
   state.quantity -=1
  },
  orderTheCart : (state)=>{
   state.total=0,
   state.quantity-=state.products.length,
   state.products=[]
  }
 }
})

export const {addProduct,decreaseProduct,increaseProduct,removeProduct,addToWishList,removeFromWishList,orderTheCart} = cartSlice.actions
export default cartSlice.reducer