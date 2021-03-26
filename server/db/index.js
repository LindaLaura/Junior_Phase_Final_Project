//import your db
//import your models
const db = require('./db')
const Campus = require('./campus');
const Student = require('./student');


//state your model associations (hasOne etc)
Student.belongsTo(Campus);
Campus.hasMany(Student);

//export your db and Models (so they all can be imported from a single central location)

module.exports = {
    db,
    Campus,
    Student
}