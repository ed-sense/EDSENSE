const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
mongoose.set("strictQuery", true);

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  std: { type: String, required: true },
  school: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("Registration", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    std: Joi.string().required().label("Std"),
    school: Joi.string().required().label("School"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    age: Joi.string().required().label("Age"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
