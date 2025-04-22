const Joi = require('joi');

module.exports.listingschema = Joi.object({
    listing:Joi.object({
    title: Joi.string().min(3).max(30).required(),

    description: Joi.string().min(3).required().max(70),
    image:Joi.string().allow("",null),
    price:Joi.number().required().min(0),
    location:Joi.string().required(),
    country:Joi.string().required(),
   

}).required(),
})
module.exports.reviewSchema= Joi.object({
    review:Joi.object({
 rating:Joi.number().min(1).required().max(5),
 comment:Joi.string().required(),

    }).required(),
});


