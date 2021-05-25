const controller = {}
const Sing = require('../models/sing')
const Group = require('../models/groups')
const validator = require('../validators/songsvalidator')

controller.saveSing = async (req, res) => {
  const name = req.body.name
  const artist = req.body.artist
  const link = req.body.link
  
  const validation = validator.validate(req.body)

  if (validation.error) {
    const error = validation.error.details[0].message
    console.log(error)
    res.status(400).send(error)
    return
  }else{
    if (name && artist && link) {
      try {
        const sing = new Sing({
          name: name,
          artist: artist,
          link: link
        })
        await sing.save()
        res.status(204).send()
      } catch (err) {
        res.status(500).send(err)
      }
    } else {
      res.status(400).send()
    }
  }
  
}
controller.getSing = async (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      const Sing = await Sing.findById(id)
      res.json(Sing)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}
controller.getGroupSongs = async (req, res) => {
const _id = req.params.id

try{
  const song = await Sing.find({'artist': _id}).populate('artist') 
  res.json(song)
}catch(error){
  res.status(500).send(error)
}

}
controller.getSings = async (req, res) => {
  const filter = req.query.filter
  
  if (filter){
    try {
      const songs = await Sing.find({name:new RegExp(filter, 'i')}).populate('artist')
      res.json(songs)
  } catch (err) {
      console.log(err)
      res.status(500).send(err)
  }
  }else {
    const songs = await Sing.find()
    res.status(200).send(songs)
  }
  
}
controller.updateSing = async (req, res) => {
  const name = req.body.name
  const artist = req.body.artist
  const link = req.body.link
  const singId = req.params.id

  const validation = validator.validate(req.body)

  if(validation.error) {
    const error = validation.error.details[0].message
    console.log(error)
    res.status(400).send(error)
    return
  }else{
    if (singId) {
      try {
        await Sings.findByIdAndUpdate( singId,{
          name: name,
          artist: artist,
          link: link,
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
controller.deleteSing = async (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      await Sing.findByIdAndDelete(id)
      res.status(204).send()
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}

module.exports = controller
