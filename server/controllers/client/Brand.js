const db=require("../../config/Dbconnection")


const getBrand=(req,res)=>{
    const sql="SELECT * FROM brand  WHERE category_id=1"
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500)
            console.log(err,"error in getting brands")
        }res.send(result)
    })
};
const getTruckBrand=(req,res)=>{
const sql="SELECT * FROM brand WHERE category_id=2"
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500)
            console.log(err,"error in getting brands")
        }res.send(result)
    })
}
module.exports={
    getBrand,
    getTruckBrand
}