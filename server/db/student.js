const { STRING, TEXT, DECIMAL} = require('sequelize');
//import your db
const db = require('./db');

//define your model

const Student = db.define('student',{
    firstName:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    lastName:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    email:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    imageUrl:{
        type: STRING,
        defaultValue:'student-default.jpeg'
    },
    gpa:{
        type: DECIMAL,
        validate:{
            len: [0.4 , 4.0]
        }
    }
});


//define any class or instance methods

//export your model
module.exports = Student
