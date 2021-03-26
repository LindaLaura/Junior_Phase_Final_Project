#!/usr/bin/env node

const fs = require('fs')
const {db, Campus, Student} = require('../server/db')
const students = JSON.parse(fs.readFileSync('students.json', 'utf8'));
const campuses = JSON.parse(fs.readFileSync('campuses.json', 'utf8'));

const seed = async () => {
    await db.sync({force: true})

//campuses
await Promise.all(campuses.map(campus => Campus.create({
    name: campus.name,
    imageUrl: campus.imageUrl,
    address: campus.address,
    description: campus.description
})));


//students
await Promise.all(students.map(student => Student.create({
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    imageUrl: student.imageUrl,
    gpa: student.gpa,
    campusId: student.campusId
})))

db.close()
console.log(`
  Seeding successful!
`)

}

seed().catch(err => {
    db.close()
    console.log(`
      Error seeding:
      ${err.message}
      ${err.stack}
    `)
  })