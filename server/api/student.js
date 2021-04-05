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

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Student.create(req.body))
  
  } catch (err) { next(err) }
})

router.delete('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    await student.destroy();
    res.sendStatus(204);
  
  } catch (err) { next(err) }
})

router.put('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    res.send(await student.update(req.body))
  
  } catch (err) { next(err) }
})


module.exports = router