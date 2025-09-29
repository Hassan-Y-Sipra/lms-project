const db=require("../../config/Dbconnection")

const getbrandslider=(req,res)=>{
    const sql='SELECT * FROM brand_slider'
  db.query(sql,(err,result)=>{
    if(err){
        res.status(500)
        console.log(err,"error in getting brandslider data")
    }res.send(result)
  })

};
module.exports={
    getbrandslider
}