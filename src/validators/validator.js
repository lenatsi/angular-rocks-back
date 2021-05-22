const Joi = require('joi')
const schema = Joi.object({
    name:Joi.string().required(),
    sings:Joi.string(),
    foundationDate:Joi.date().required(),
    description:Joi.string().required(),
    photo: Joi.string(),
    gender:Joi.string().required(),

})

function validate(body){
    return schema.validate({
        name:body.name,
        foundationDate:body.foundationDate,
        description:body.description,
        photo:body.photo,
        gender:body.gender
    },
    {abortEarly:false},)
}

module.exports = {validate}