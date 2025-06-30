const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    minlength: 3,
    required: [true, 'A user must have firstname'],
  },
  lastname: String,
  username: {
    type: String,
    required: [true, 'A user must have usernname'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide valied email'],
  },
  photo: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    require: [true, 'Please Provide Word'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  firstLogin: {
    type: Boolean,
    default: false,
  },
  userType: {
    type: String,
    default: 'user',
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
