const db=require("../../config/Dbconnection")

const Login=(req,res)=>{
  const {username,password}=req.body;
  const sql= "SELECT *FROM user WHERE username=? and password=?"
  db.query(sql,[username,password],(err,result)=>{
    if(result.length > 0){
      res.status(200).send({message:"Succsessful"})
    }else{
      res.status(401).send({message:"Inavilid usarname and password"})
    }
  })

};

module.exports={
  Login
}