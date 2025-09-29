const db=require("../../config/Dbconnection")

const getParts=(req,res)=>{
    const {model_id}=req.params;
    const sql="SELECT * FROM parts WHERE model_id=?"
    db.query(sql,[model_id],(err,result)=>{
        if(err){
            res.status(500)
            console.log(err,"error in gettting parts data")
        }res.send(result)
    })
};

module.exports={
    getParts
}