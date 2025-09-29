const db = require("../../config/Dbconnection");

const getCourses = (req, res) => {
  const sql = "SELECT * FROM courses";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500);
      console.log(err, "error in fetching courses data");
    }
    res.send(result);
  });
};

const deleteCourse = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM courses WHERE ID=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500);
      console.log(err, "error in delete courses data");
    }
    res.send(result);
  });
};

const addnewcourse = (req, res) => {
  const { title, description, author, price } = req.body;
  const sql =
    "INSERT INTO courses (title,description,author,price)VALUES(?,?,?,?)";
  db.query(sql, [title, description, author, price], (err, result) => {
    if (err) {
      res.status(500);
      console.log(err, "error in add new course data");
    }
    res.send(result);
  });
};

const updateCourse = (req, res) => {
  const id = req.params.id;
  const { title, description, author, price } = req.body;
  const sql =
    "UPDATE courses SET title=?,description=?,author=?,price=? WHERE ID=?";
  db.query(sql, [title, description, author, price, id], (err, result) => {
    if (err) {
      res.status(500);
      console.log(err, "error in update course data");
    }
    res.send(result);
  });
};


const updateCourseStatus=(req,res)=>{
    const id=req.params.id;
    const {status}=req.body;
    const sql="UPDATE courses SET status=? WHERE id=?"
    db.query(sql,[status,id],(err,result)=>{
        if(err){
            res.status(500)
            console.log(err,"error in update status")
        }res.send(result)
    })
}

module.exports = {
  getCourses,
  deleteCourse,
  addnewcourse,
  updateCourse,
  updateCourseStatus,
};
