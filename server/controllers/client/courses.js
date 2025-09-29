const db=require("../../config/Dbconnection")


const getCourse=(req,res)=>{
  const sql="SELECT * FROM courses WHERE  status = 1"
  db.query(sql,(err,result)=>{
    if(err){
      res.status(500)
    }res.send(result)
  })

};

const getModules=(req,res)=>{
  const id=req.params.id
  const sql="SELECT * FROM modules WHERE course_id=? AND status=1"
  db.query(sql,[id],(err,result)=>{
    if(err){
      res.status(500)
    }res.send(result)
  })
};

const getLessons=(req,res)=>{
    const id=req.params.id;
    const sql="SELECT * FROM lesson WHERE module_id=?"
    db.query(sql,[id],(err,result)=>{
        if(err){
            res.status(500)
            console.log(err,"error in fetch lesson data")
        }res.send(result)
    })
};

// *************for checkout page ***********
const Course=(req,res)=>{
  const id=req.params.id
  const sql="SELECT * FROM courses WHERE id=? "
  db.query(sql,[id],(err,result)=>{
    if(err){
      res.status(500)
    }res.send(result)
  })

};


// const payment=(req,res)=>{
//     const { name, email, phone, zipcode, state } = req.body;
//     const sql = "INSERT INTO orders (name, email, phone, zipcode, state) VALUES (?, ?, ?, ?, ?)";
//     db.query(sql, [name, email, phone, zipcode, state || "Gujarat"], (err, result) => {
//         if (err) return res.status(500).json({ message: "Database error", error: err });
//         res.json({ message: "Order saved successfully", orderId: result.insertId });
//     });
// }

module.exports={
  getCourse,
  getModules,
  getLessons,
  Course,
  // payment
}