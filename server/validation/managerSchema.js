import Joi from "joi";

export default Joi.object().keys({
  firstName: Joi.string()
    .alphanum()
    .min(2)
    .max(50)
    .required()
    .label("First Name"),
  lastName: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .required()
    .label("Last Name"),
  username: Joi.string().alphanum().min(3).max(50).required().label("Username"),
  // isManager: Joi.boolean().
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{6,}$"))
    .label("Password"),
  email: Joi.string()
    .string()
    .email({ minDomainSegments: 2 })
    .required()
    .label("Email"), //Must have minimum 2 domain parts, ex: @domain.com
  profilePhoto: Joi.string().pattern(new RegExp(".(jpeg|jpg|gif|png)$")),
});
