const router = require('express').Router()
const {Student} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (err) { next(err) }
})

router.get('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId)
    res.send(student);
  } catch (err) { next(err) }
})

module.exports = router