const db=require("../../config/Dbconnection")

const getPartDetail=(req,res)=>{
    const id=req.params.id
    const sql="SELECT * FROM parts WHERE id=?"
    db.query(sql,[id],(err,result)=>{
        if(err){
            res.status(500)
            console.log(errr,"error in getting partdetail data")
        }res.send(result)
    })
};

module.exports={
    getPartDetail,
}