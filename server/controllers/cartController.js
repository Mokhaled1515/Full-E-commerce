import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.models.js";



export const addToCartItemmController = async (req,res)=>{
try{
const userId = req.userId
 const { productId } = req.body

 if(!productId){
 return res.status(402).json({
    message: "provide productId",
    error: true,
    success: false
 })
 }
 
 const cheakIttemCart = await CartProductModel.findOne({
    userId : userId,
    productId : productId
 })

 if(cheakIttemCart){
 return res.status(400).json({
    message : "Item already in cart",
    
 })
 }
  
 const cartItem = new CartProductModel({
    quantity : 1,
    userId: userId,
    productId: productId
 })
 const save = await cartItem.save()
 const updateCarttUser = await UserModel.updateOne({ _id : userId},{
    $push : {
        shopping_cart : productId

    }
 })

 return res.json({
    data : save,
    message : "Item add successffully",
    error : false,
    success : true
 })
}
catch(error){
    return res.status(500).json({
        message: error.message,
        error: true,
        success: false
    })
}
} 



export const getCartItemController = async (req,res)=>{
try{
const userId = req.userId

const cartItem = await CartProductModel.find({
   userId: userId
}).populate('productId')

return res.json({
   data : cartItem,
   error : false,
   success : true
})
}
catch(error){
return res.status(500).json({
   message : error.message || error,
   error: true,
   success: false
})
}
}


export const  updateCategoryItemQtyController = async (req,res)=>{
   try{
      const userId = req.userId
      const { _id,qty } = req.body

      if(!_id || !qty){
         return res.status(400).json({
            message: "provide _id, qty"
         })
      }
      const updateCartItem = await CartProductModel.updateOne({
         _id: _id,
         userId: userId
      },{
         quantity: qty

      })

      return res.json({
         message : "Update cart",
         success: true,
         error: false,
         data : updateCartItem
      })
   }
   catch(error){
      return res.status(500).json({
         message : error.message || error,
         error : true,
         success: false
      })
   }
}



export const deletCartItemQtyController = async (req,res)=>{
   try{
       const userId = req.userId
       const { _id } = req.body

       if(!_id){
       return res.status(400).json({
         message : "provide _id",
         error : true,
         success: false
       })
       }

       const deleteCartItem = await CartProductModel.deleteOne({_id: _id, userId : userId})

       return res.json({
         message : "Item remove",
         error : false,
         success: true,
         data : deleteCartItem
       })
   }
   catch(error){
      return res.status(500).json({
         message : error.message || error,
         error : true,
         success : false
      })
   }
}