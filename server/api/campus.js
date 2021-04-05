const router = require('express').Router()
const {Campus} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll();
    res.send(campuses)
  
  } catch (err) { next(err) }
})

router.get('/:campusId', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.campusId)
    res.send(campus)
  } catch (err) { next(err) }
})

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Campus.create(req.body))
  
  } catch (err) { next(err) }
})

router.delete('/:campusId', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.campusId);
    await campus.destroy();
    res.sendStatus(204);
  
  } catch (err) { next(err) }
})

router.put('/:campusId', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.campusId);
    res.send(await campus.update(req.body))
  
  } catch (err) { next(err) }
})


module.exports = router