import CategoryModel from "../models/category.model.js";
import subCategoryModel from "../models/subCategoryModel.js";
import ProductModel from "../models/product.model.js";
export const AddCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        message: "Enter required fields",
        error: true,
        succuss: false,
      });
    }

    const addCategory = new CategoryModel({
      name,
      image,
    });

    const saveCategory = await addCategory.save();

    if (!saveCategory) {
      return res.status(500).json({
        message: "Not Created!",
        error: true,
        succuss: false,
      });
    }

    return res.json({
      message: "Category Added Successfully",
      data: saveCategory,
      succuss: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      succuss: false,
      error: true,
    });
  }
};

export const getCategoryController = async (req, res) => {
  try {
    const data = await CategoryModel.find().sort({ createdAt : -1})

    return res.json({
      data: data,
      error: false,
      succuss: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      succuss: false,
    });
  }
};

export const updateCategory = async (req,res)=>{
  try{
   const { _id , name, image } = req.body
   const update = await CategoryModel.updateOne({
    _id : _id
   },{
    name,
    image,
   })
   return res.json({
    message: "update Category",
    succuss: true,
    error: false,
    data: update
   })
  }
  catch(error) {
    return res.status(500).json({
      message : error.message || error,
      error : true,
      succuss: false
    })
  }
}


export const deleteCategoryController = async (req,res) =>{
  try{
   const {_id} = req.body

   const cheakSubCategory = await subCategoryModel.find({
    category : {
      "$in" : [_id]
    }
   }).countDocuments()

   const cheakProduct = await ProductModel.find({
    category : {
      "$in" : [_id] 
    }
   }).countDocuments()
  if(cheakSubCategory > 0 || cheakProduct > 0) {
    return res.status(400).json({
      message: "Category is already use can't delete",
      error: true,
      succuss: false

    })
  }

//  if(cheakSubCategory == 0 || cheakProduct == 0) {
//     return res.json({
//       message: "Category Deleted Succefully",
//       error: false,
//       succuss: true

//     })
//   }


  const deleteCategory = await CategoryModel.deleteOne({ _id: _id})

  return res.json({
    message: "Delete category successfully",
    data: deleteCategory,
    error: false,
    succuss: true
  })

  }
  catch(error){
    return  res.status(500).json({
      message: error.message || error,
      error: true,
      succuss: false
    })
  }
}