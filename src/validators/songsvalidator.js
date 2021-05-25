const Joi = require('joi')
const schema = Joi.object({
    name:Joi.string().required(),
    artist:Joi.string().required(),
    link:Joi.string().required(),
})

function validate(body){
    return schema.validate({
        name:body.name,
        artist:body.artist,
        link:body.link,
    },
    {abortEarly:false},)
}

module.exports = {validate}