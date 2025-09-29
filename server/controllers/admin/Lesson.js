const db=require("../../config/Dbconnection")

const getLesson=(req,res)=>{
    const id=req.params.id;
    const sql="SELECT * FROM lesson WHERE module_id=?"
    db.query(sql,[id],(err,result)=>{
        if(err){
            res.status(500)
            console.log(err,"error in fetch lesson data")
        }res.send(result)
    })
};



const deleteLesson=(req,res)=>{
     const id=req.params.id;
    const sql="DELETE FROM lesson WHERE id=?"
    db.query(sql,[id],(err,result)=>{
        if(err){
            res.status(500)
            console.log(err,"error in delete lesson data")
        }res.send(result)
    })
};

const addnewLesson=(req,res)=>{
    const {module_id,name,url,description,duration}=req.body;
    const sql="INSERT INTO  lesson (module_id,name,url,description,duration)VALUES(?,?,?,?,?)"
    db.query(sql,[module_id,name,url,description,duration],(err,result)=>{
        if(err){
            res.status(500)

        }
        res.send(result)
    })
};



const updatelesson = (req, res) => {
  const id = req.params.id;
  const { module_id, name, url, description, duration } = req.body;

  const sql =
    "UPDATE lesson SET module_id=?, name=?, url=?, description=?, duration=? WHERE id=?";

  db.query(sql, [module_id, name, url, description, duration, id], (err, result) => {
    if (err) {
      console.error("Update error:", err); 
      return res.status(500).json({ error: "Database update failed", details: err });
    }
    res.status(200).json({ message: "Lesson updated successfully", result });
  });
};


// const updatelesson=(req,res)=>{
//     const id=req.params.id;
//     const{module_id,name,url,description,duration}=req.body;
//     const sql ="UPDATE lesson SET module_id=?,name=?,url=?,description=?,duration=? WHERE id=?"
//     db.query(sql,[module_id,name,url,description,duration,id],(err,result)=>{
//         if(err){
//             res.status(500)
//             console.log(err,"error in update lesson data")
//         }
//         res.send(result)
//     })
// }


module.exports={
    getLesson,
    deleteLesson,
    addnewLesson,
    updatelesson,
}