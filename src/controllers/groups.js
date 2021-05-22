const controller = {}
const Group = require('../models/groups')
const validator = require('../validators/validator')

controller.saveGroup = async (req, res) => {
  const name = req.body.name
  const foundationDate = req.body.foundationDate
  const description = req.body.description
  const gender = req.body.gender
  const photo = req.body.photo
  


  const validation = validator.validate(req.body)

  if (validation.error) {
    const error = validation.error.details[0].message
    console.log(error)
    res.status(400).send(error)
    return
  }else{
    if (name && foundationDate && description && gender && photo) {
      try {
        const group = new Group({
          name: name,
          foundationDate: foundationDate,
          description: description,
          gender: gender,
          photo: photo,
        })
        await group.save()
        res.status(204).send()
      } catch (err) {
        res.status(500).send(err)
      }
    } else {
      res.status(400).send()
    }
  }
  
}
controller.getGroup = async (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      const group = await Group.findById(id)
      res.json(group)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}
controller.getGroups = async (req, res) => {
  const filter = req.query.filter
  const startDate = req.query.startDate
  const endDate = req.query.endDate
  console.log(filter)
  console.log(startDate)
  console.log(endDate)
  const filters = []
    if (filter) {
        filters.push({ name: new RegExp(filter, 'i') })
    }
    if (startDate && endDate) {
        filters.push({
            "foundationDate": {
                $gte: new Date(startDate),
                $lt: new Date(endDate)
            }
        })
        console.log(filters)
    }
    try {
        let group = {}
        if (filters.length > 0) {
            group = await Group.aggregate([
                {
                    $match: {$and: filters }
                }
            ])
            console.log(filters)
        } else {
            group = await Group.find()
        }
        res.send(group)
    } catch (error) {
        console.log(error)
        res.status(500).send("ocurrió un error")
    } 
}
controller.updateGroup = async (req, res) => {
  const name = req.body.name
  const foundationDate = req.body.foundationDate
  const description = req.body.description
  const gender = req.body.gender
  const photo = req.body.photo
  const groupId = req.params.id

  const validation = validator.validate(req.body)

  if(validation.error) {
    const error = validation.error.details[0].message
    console.log(error)
    res.status(400).send(error)
    return
  }else{
    if (groupId) {
      try {
        await Groups.findByIdAndUpdate( groupId,{
          name: name,
          foundationDate: foundationDate,
          description: description,
          gender: gender,
          photo: photo,
          updatedAt: Date.now(),
        })
        res.status(204).send()
      } catch (err) {
        res.status(500).send(err)
      }
    } else {
      res.status(400).send()
    }
  }
  
}
controller.deleteGroup = async (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      await Group.findByIdAndDelete(id)
      res.status(204).send()
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}

module.exports = controller
