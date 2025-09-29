const  db = require ("../../config/Dbconnection")


const getMoodule=(req,res)=>{
    const id=req.params.id;
    const sql="SELECT * FROM modules WHERE course_id=?"
    db.query(sql,[id],(err,result)=>{
        if(err){
            res.status(500)
            console.log(err,"error in fetching courses data")
        }res.send(result)
    })
};

const deleteModule=(req,res)=>{
    const id=req.params.id;
    const sql="DELETE FROM modules WHERE ID=?"
    db.query(sql,[id],(err,result)=>{
        if(err){
            res.status(500)
            console.log(err,"error in delete module data")
        }res.send(result)
    })
};

const addnewModule=(req,res)=>{
    const {course_id,title}=req.body;
    const sql="INSERT INTO modules (course_id,title) VALUES(?,?)"
    db.query(sql,[course_id,title],(err,result)=>{
        if(err){
            res.status(500)
            console.log(err,"error in addnewmodule data")
        }res.send(result)
    })
}

 const updateModule=(req,res)=>{
    const id=req.params.id;
    const {course_id,title}=req.body;
    const sql="UPDATE modules SET course_id=?,title=? WHERE ID=?"
    db.query(sql,[course_id,title,id],(err,result)=>{
        if(err){
            res.status(500)
        }res.send(result)
    })
 };

 const updateStatus=(req,res)=>{
    const id=req.params.id;
    const{status}=req.body;
    const sql="UPDATE modules SET status=? WHERE id=?"
    db.query(sql,[status,id],(err,result)=>{
        if(err){
            res.status(500)
             console.error("Error updating status:", err);

        }
        res.send(result)
    })
 }


module.exports={
    getMoodule,
    deleteModule,
    addnewModule,
    updateModule,
    updateStatus
}