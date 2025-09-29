const db =require("../../config/Dbconnection")

const getBrandModel=(req,res)=>{
    const {category_id}=req.params
const sql ="SELECT * FROM brand_model WHERE category_id =?"
db.query(sql,[category_id],(err,result)=>{
    if(err){
        res.status(500)
        console.log(err,"error in gettting brand-model data")
    }res.send(result)
})
};



module.exports={
    getBrandModel,
}