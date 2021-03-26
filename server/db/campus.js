const { STRING, TEXT } = require('sequelize');
//import your db
const db = require('./db');

//define your model
const Campus = db.define('campus',{
    name:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    imageUrl:{
        type: STRING, 
        defaultValue:'campus-default.jpeg'
    },
    address:{
        type: STRING,
        validate:{
            notEmpty:true
        }
    },
    description:{
        type:TEXT
    }
});

//define any class or instance methods

//export your model
module.exports = Campus
